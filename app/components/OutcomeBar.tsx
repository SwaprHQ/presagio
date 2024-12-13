'use client';

import { useQuery } from '@tanstack/react-query';
import { cx } from 'class-variance-authority';
import request from 'graphql-request';

import { OMEN_SUBGRAPH_URL, XDAI_BLOCKS_SUBGRAPH_URL } from '@/constants';
import { Market, Outcome } from '@/entities';
import {
  FixedProductMarketMaker,
  FpmmTrade_OrderBy,
  getMarketTrades,
  OrderDirection,
} from '@/queries/omen';

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
  const marketModel = new Market(market);
  const winnerOutcome = marketModel.getWinnerOutcome();
  const isClosed = marketModel.isClosed;
  const isClosedAndInvalid = isClosed && !winnerOutcome;

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

  const getOutcomesPercentages = () => {
    if (isClosed && winnerOutcome) {
      return winnerOutcome.index ? ['0', '100'] : ['100', '0'];
    }

    return [outcome0?.percentage, outcome1?.percentage];
  };

  const getOutcomeSymbolAndPercentage = (outcome: Outcome, percentage: string) => {
    return `${outcome.symbol} ${percentage || '-'}%`;
  };

  const outcomesPercentages = getOutcomesPercentages();
  const outcome0percentage = outcomesPercentages[0];
  const outcome1percentage = outcomesPercentages[1];
  const hasOutcomePercentages = outcome0percentage && outcome1percentage;
  const isWinnerOutcome0 = !!Number(outcome0percentage) && isClosed && winnerOutcome;
  const isWinnerOutcome1 = !!Number(outcome1percentage) && isClosed && winnerOutcome;

  return (
    <div className="w-full space-y-1">
      <div className="flex space-x-1 transition-all">
        <div
          className={cx(
            'flex h-3 items-center rounded-s-8 px-2',
            isWinnerOutcome0 && 'rounded-e-8',
            isWinnerOutcome1 && 'hidden',
            isClosedAndInvalid ? 'bg-outline-med-em' : 'bg-surface-success-accent-2'
          )}
          style={{
            width: `${outcome0percentage ?? '50'}%`,
          }}
        />

        <div
          className={cx(
            'flex h-3 items-center rounded-e-8 px-2',
            isWinnerOutcome1 && 'rounded-s-8',
            isWinnerOutcome0 && 'hidden',
            isClosedAndInvalid ? 'bg-outline-med-em' : 'bg-surface-danger-accent-2'
          )}
          style={{
            width: `${outcome1percentage ?? 50}%`,
          }}
        />
      </div>

      <div className="flex h-4 justify-between text-sm font-semibold">
        {hasOutcomePercentages && (
          <>
            <p
              className={`w-full uppercase ${isWinnerOutcome0 || !isClosed ? 'text-text-success-main' : 'text-text-low-em'}`}
            >
              {getOutcomeSymbolAndPercentage(outcome0, outcome0percentage)}
            </p>
            <p
              className={`w-full text-right uppercase ${isWinnerOutcome1 || !isClosed ? 'text-text-danger-main' : 'text-text-low-em'}`}
            >
              {getOutcomeSymbolAndPercentage(outcome1, outcome1percentage)}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
