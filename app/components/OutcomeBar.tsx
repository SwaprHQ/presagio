import { cx } from 'class-variance-authority';
import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';

import { BlockDataType } from '@/queries/xdai';
import {
  FixedProductMarketMaker,
  FpmmTrade_OrderBy,
  getMarketTrades,
  OrderDirection,
} from '@/queries/omen';
import { OMEN_SUBGRAPH_URL, XDAI_BLOCKS_SUBGRAPH_URL } from '@/constants';
import { Outcome } from '@/entities';

const LAST_TRADE_AMOUNT = 1;

interface OutcomeBarProps {
  market: FixedProductMarketMaker;
}

type OutcomeTokenMarginalPricesResponse = {
  [key: string]: {
    outcomeTokenMarginalPrices: string[];
  };
};

export const OutcomeBar = ({ market }: OutcomeBarProps) => {
  const { id } = market;

  const { data: trade } = useQuery({
    queryKey: ['getLastMarketTrade', id],
    queryFn: async () =>
      getMarketTrades({
        first: LAST_TRADE_AMOUNT,
        fpmm: id,
        orderBy: FpmmTrade_OrderBy.CreationTimestamp,
        orderDirection: OrderDirection.Desc,
      }),
  });

  const { data: lastTradeMarginalPrices } = useQuery({
    queryKey: ['getLastTradeMarginalPrices', id],
    queryFn: async (): Promise<string[] | undefined> => {
      if (!trade) return;

      const lastTradeTimestamp = trade.fpmmTrades[0]?.creationTimestamp;

      const blockNumber = await request<BlockDataType>(
        XDAI_BLOCKS_SUBGRAPH_URL,
        `query blockNumberByTimestamp {
          _${lastTradeTimestamp}: blocks(where: {timestamp: ${lastTradeTimestamp}}, first: 1) {
              number
            }
        }`
      );

      const tradeBlockNumber = blockNumber[`_${lastTradeTimestamp}`][0].number;

      if (!tradeBlockNumber) return;

      const marginalPricesResponse = await request<OutcomeTokenMarginalPricesResponse>(
        OMEN_SUBGRAPH_URL,
        `query marginalPricesByBlockNumber($id: ID!) {
         _${tradeBlockNumber}: fixedProductMarketMaker(id: $id, block: { number: ${tradeBlockNumber} }) {
              outcomeTokenMarginalPrices
            }
        }`,
        {
          id,
        }
      );

      return marginalPricesResponse[`_${tradeBlockNumber}`].outcomeTokenMarginalPrices;
    },
    enabled: !!trade,
  });

  const outcome0 = new Outcome(
    0,
    market.outcomes?.[0] || 'Option 1',
    id,
    market.outcomeTokenMarginalPrices?.[0] ?? lastTradeMarginalPrices?.[0]
  );
  const outcome1 = new Outcome(
    1,
    market.outcomes?.[1] || 'Option 2',
    id,
    market.outcomeTokenMarginalPrices?.[1] ?? lastTradeMarginalPrices?.[1]
  );

  const outcomeHasPercentages = outcome0.percentage && outcome1.percentage;

  return (
    <div className="space-y-1">
      {!outcomeHasPercentages ? (
        <ShimmerBar />
      ) : (
        <div className="flex space-x-1">
          {outcome0.percentage !== '0' && (
            <div
              className={cx(
                'flex h-3 items-center rounded-s-8 px-2',
                outcome0.percentage ? 'bg-surface-success-accent-2' : 'bg-outline-low-em',
                outcome1.percentage === '0' && 'rounded-e-8'
              )}
              style={{
                width: outcome0.percentage ? `${outcome0.percentage}%` : '50%',
              }}
            />
          )}
          {outcome1.percentage !== '0' && (
            <div
              className={cx(
                'flex h-3 items-center rounded-e-8 px-2',
                outcome1.percentage ? 'bg-surface-danger-accent-2' : 'bg-outline-low-em',
                outcome0.percentage === '0' && 'rounded-s-8'
              )}
              style={{
                width: outcome1.percentage ? `${outcome1.percentage}%` : '50%',
              }}
            />
          )}
        </div>
      )}

      {outcomeHasPercentages && (
        <div className="flex justify-between text-sm font-semibold">
          <p className="w-full uppercase text-text-success-main">{`${outcome0.symbol} ${outcome0.percentage || '-'}%`}</p>
          <p className="w-full text-right uppercase text-text-danger-main">
            {`${outcome1.symbol} ${outcome1.percentage || '-'}%`}
          </p>
        </div>
      )}
    </div>
  );
};

const ShimmerBar = () => (
  <div className="h-3 animate-pulse rounded-8 bg-outline-low-em"></div>
);
