'use client';

import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';

import {
  FixedProductMarketMaker,
  FpmmTrade_OrderBy,
  getMarketTrades,
  OrderDirection,
} from '@/queries/omen';
import { OMEN_SUBGRAPH_URL, XDAI_BLOCKS_SUBGRAPH_URL } from '@/constants';
import { Outcome } from '@/entities';

const MIN_TRADES_AMOUNT = 1;
const blockNumberQuery = `
  query blockNumberByTimestamp($lastTradeTimestamp: String) {
    blocks(where: {timestamp: $lastTradeTimestamp}, first: 1) {
      number
    }
  }
`;
const marginalPriceQuery = `
  query marginalPricesByBlockNumber($id: ID!, $number: Int) {
    fixedProductMarketMaker(id: $id, block: { number: $number }) {
      outcomeTokenMarginalPrices
    }
  }
`;

interface OutcomeBarProps {
  market: FixedProductMarketMaker;
}

type BlockNumberResponse = { blocks: { number: string }[] };
type OutcomeTokenMarginalPricesResponse = {
  fixedProductMarketMaker: { outcomeTokenMarginalPrices: string[] };
};

export const OutcomeBar = ({ market }: OutcomeBarProps) => {
  const { id } = market;

  const { data: trade } = useQuery({
    queryKey: ['getLastMarketTrade', id],
    queryFn: async () =>
      getMarketTrades({
        first: MIN_TRADES_AMOUNT,
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

      const blockNumber = await request<BlockNumberResponse>(
        XDAI_BLOCKS_SUBGRAPH_URL,
        blockNumberQuery,
        { lastTradeTimestamp }
      );

      const tradeBlockNumber = blockNumber.blocks?.[0].number;

      if (!tradeBlockNumber) return;

      const marginalPricesResponse = await request<OutcomeTokenMarginalPricesResponse>(
        OMEN_SUBGRAPH_URL,
        marginalPriceQuery,
        {
          id,
          number: parseInt(tradeBlockNumber),
        }
      );

      return marginalPricesResponse.fixedProductMarketMaker.outcomeTokenMarginalPrices;
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

  const hasOutcomePercentages = outcome0.percentage && outcome1.percentage;

  return (
    <div className="w-full space-y-1">
      <div className="flex space-x-1 transition-all">
        {outcome0.percentage !== '0' && (
          <div
            className="flex h-3 items-center rounded-s-8 bg-surface-success-accent-2 px-2"
            style={{
              width: outcome0.percentage ? `${outcome0.percentage}%` : '50%',
            }}
          />
        )}
        {outcome1.percentage !== '0' && (
          <div
            className="flex h-3 items-center rounded-e-8 bg-surface-danger-accent-2 px-2"
            style={{
              width: outcome1.percentage ? `${outcome1.percentage}%` : '50%',
            }}
          />
        )}
      </div>
      {hasOutcomePercentages && (
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
