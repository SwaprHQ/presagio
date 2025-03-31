import { PropsWithChildren, useMemo, useState } from 'react';

import { cx } from 'class-variance-authority';
import { useQuery } from '@tanstack/react-query';

import {
  FpmmTrade,
  FpmmTrade_OrderBy,
  FpmmTransaction,
  FpmmType,
  OrderDirection,
  Scalars,
  TransactionType,
  getMarketTrades,
  getMarketTradesAndTransactions,
} from '@/queries/omen';
import { formatDateTimeWithYear, formatEtherWithFixedDecimals, timeAgo } from '@/utils';
import { Button, Icon, Tag } from '@swapr/ui';
import { Outcome } from '@/entities';

import { Skeleton, TokenLogo, UserAvatarWithLabel } from '@/app/components';
import { getAIAgents } from '@/queries/dune';
import { Address } from 'viem';
import { OUTCOME_TAG_COLORS_SCHEME } from '@/constants';

import { AiAgent } from '@/types';

const txTypeHumanWords: Record<TransactionType, string[]> = {
  [TransactionType.Add]: ['added', 'to'],
  [TransactionType.Remove]: ['removed', 'from'],
  [TransactionType.Buy]: ['bought'],
  [TransactionType.Sell]: ['sold'],
};

const ITEMS_PER_PAGE = 10;

type MergedTradeTransaction = Omit<FpmmTrade, '__typename'> &
  Partial<Omit<FpmmTransaction, '__typename'>> & {
    __typename?: 'FpmmTrade' | 'FpmmTransaction';
  };

export const MarketActivity = ({ id }: { id: string }) => {
  const [page, setPage] = useState(1);

  const { data: aiAgentsList } = useQuery({
    queryKey: ['getAIAgents'],
    queryFn: getAIAgents,
    staleTime: Infinity,
  });

  const getIsAIAgent = useMemo(() => {
    return (address: string) => {
      if (!aiAgentsList?.length) return undefined;

      return aiAgentsList.find(
        aiAgent => String(aiAgent.address).toLowerCase() === address.toLowerCase()
      );
    };
  }, [aiAgentsList]);

  const { data: marketTradesTransactions, isLoading } = useQuery({
    queryKey: ['getMarketTradesAndTransactions', id, page - 1],
    queryFn: async () =>
      getMarketTradesAndTransactions({
        first: ITEMS_PER_PAGE,
        skip: (page - 1) * ITEMS_PER_PAGE,
        fpmm: id,
        orderBy: FpmmTrade_OrderBy.CreationTimestamp,
        orderDirection: OrderDirection.Desc,
      }),
  });

  const marketTransactions = marketTradesTransactions?.fpmmTransactions || [];
  const marketTrades = marketTradesTransactions?.fpmmTrades || [];

  const { data: tradesNextPage } = useQuery({
    queryKey: ['getMarketTrades', id, page],
    queryFn: async () =>
      getMarketTrades({
        first: ITEMS_PER_PAGE,
        skip: page * ITEMS_PER_PAGE,
        fpmm: id,
        orderBy: FpmmTrade_OrderBy.CreationTimestamp,
        orderDirection: OrderDirection.Desc,
      }),
  });

  const hasMoreMarkets = tradesNextPage && tradesNextPage.fpmmTrades.length !== 0;
  const showPaginationButtons = hasMoreMarkets || page !== 1;

  return (
    <div>
      <div>
        {isLoading ? (
          <LoadingMarketActivity />
        ) : (
          <div className="w-full divide-y divide-outline-base-em overflow-x-scroll border-t border-outline-base-em text-base font-medium md:overflow-x-auto">
            {marketTransactions?.map(transaction => {
              const aiAgent = getIsAIAgent(transaction.user.id);
              const isLiquidityEvent = transaction.fpmmType === FpmmType.Liquidity;

              if (isLiquidityEvent)
                return (
                  <LiquidityEventRow
                    key={transaction.id}
                    transaction={transaction}
                    aiAgent={aiAgent}
                  />
                );

              const tradeAssociatedWithTransaction = marketTrades.find(
                trade => trade.id === transaction.id
              );

              if (tradeAssociatedWithTransaction) {
                const activity: MergedTradeTransaction = {
                  ...transaction,
                  ...tradeAssociatedWithTransaction,
                  collateralToken: transaction.fpmm?.collateralToken,
                };

                return (
                  <TradeRow key={transaction.id} activity={activity} aiAgent={aiAgent} />
                );
              }

              return null;
            })}
          </div>
        )}
      </div>
      {showPaginationButtons && (
        <div className="flex w-full items-center justify-between bg-surface-surface-1 p-4">
          <Button
            variant="secondary"
            onClick={() => setPage(page - 1)}
            className={cx('space-x-2', { invisible: page === 1 })}
          >
            <Icon name="chevron-left" />
            <p>Prev</p>
          </Button>
          <p className="text-sm font-medium text-text-med-em">Page {page}</p>
          <Button
            variant="secondary"
            onClick={() => setPage(page + 1)}
            className={cx('space-x-2', { invisible: !hasMoreMarkets })}
          >
            <p>Next</p>
            <Icon name="chevron-right" />
          </Button>
        </div>
      )}
    </div>
  );
};

interface CollateralAmountWithLogo {
  collateralTokenAmount: Scalars['BigInt']['output'];
  collateralTokenAddress: string;
}

const CollateralAmountWithLogo = ({
  collateralTokenAmount,
  collateralTokenAddress,
}: CollateralAmountWithLogo) => (
  <div className="flex items-center space-x-0.5 text-text-high-em">
    <p>
      {collateralTokenAmount ? formatEtherWithFixedDecimals(collateralTokenAmount) : '-'}
    </p>
    <TokenLogo
      address={collateralTokenAddress}
      className="h-[13px] w-[13px] opacity-60 hover:opacity-100"
    />
  </div>
);

interface TradeRowProps {
  activity: MergedTradeTransaction;
  aiAgent?: AiAgent;
}

const TradeRow = ({ activity, aiAgent }: TradeRowProps) => {
  const creatorAddress = activity?.creator?.id ?? 'unknown';
  const outcomes = activity.fpmm.outcomes;
  const outcomeIndex = activity.outcomeIndex;

  if (!outcomes || !outcomeIndex) return null;

  const hasOutcomes = outcomes && outcomeIndex;

  const outcome = hasOutcomes
    ? new Outcome(
        outcomeIndex,
        outcomes[outcomeIndex] ?? 'Option ' + outcomeIndex,
        activity.id
      )
    : null;

  return (
    <RowWrapper>
      <div className="flex items-center space-x-1.5">
        <UserAvatarWithLabel address={creatorAddress as Address} aiAgent={aiAgent} />
        {activity.transactionType && (
          <p className="text-text-low-em">
            {txTypeHumanWords[activity.transactionType][0]}
          </p>
        )}
        <Tag
          size="xs"
          colorScheme={
            outcome ? OUTCOME_TAG_COLORS_SCHEME[outcome.index as 0 | 1] : 'secondary'
          }
          className="w-fit space-x-1 text-sm uppercase"
        >
          <p>{formatEtherWithFixedDecimals(activity.outcomeTokensTraded)}</p>
          <p>{outcome ? outcome.symbol : '-'}</p>
        </Tag>

        <span className="text-text-low-em">for</span>
        <CollateralAmountWithLogo
          collateralTokenAmount={activity.collateralTokenAmount}
          collateralTokenAddress={activity.collateralToken}
        />
      </div>
      <div
        className="text-nowrap text-sm text-text-low-em"
        title={formatDateTimeWithYear(activity.creationTimestamp)}
      >
        {timeAgo(activity.creationTimestamp)}
      </div>
    </RowWrapper>
  );
};

interface LiquidityEventRowProps {
  transaction: FpmmTransaction;
  aiAgent?: AiAgent;
}

const FPMM_CONTRACT_ADDRESS = '0x9083a2b699c0a4ad06f63580bde2635d26a3eef0';

const LiquidityEventRow = ({ transaction, aiAgent }: LiquidityEventRowProps) => {
  const creatorAddress =
    transaction.user.id === FPMM_CONTRACT_ADDRESS
      ? transaction.fpmm.creator
      : transaction.user.id;

  return (
    <RowWrapper>
      <div className="flex items-center space-x-1.5">
        <UserAvatarWithLabel address={creatorAddress as Address} aiAgent={aiAgent} />
        <p className="lowercase text-text-low-em">
          {txTypeHumanWords[transaction.transactionType][0]}
        </p>
        <CollateralAmountWithLogo
          collateralTokenAmount={transaction.collateralTokenAmount}
          collateralTokenAddress={transaction.fpmm.collateralToken}
        />
        <p className="lowercase text-text-low-em">
          {txTypeHumanWords[transaction.transactionType][1]}
        </p>
        <Tag size="xs" colorScheme="info" className="w-fit space-x-1 text-sm uppercase">
          {transaction.fpmmType}
        </Tag>
      </div>
      <div
        className="text-nowrap text-sm text-text-low-em"
        title={formatDateTimeWithYear(transaction.creationTimestamp)}
      >
        {timeAgo(transaction.creationTimestamp)}
      </div>
    </RowWrapper>
  );
};

const RowWrapper = ({ children }: PropsWithChildren) => (
  <div className="flex w-full min-w-max items-center justify-between space-x-2 p-4">
    {children}
  </div>
);

const LoadingMarketActivity = () => (
  <div className="text-base font-semibold">
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(fakeActivity => (
      <RowWrapper key={fakeActivity}>
        <div className="flex items-center space-x-1.5">
          <div className="text-text-high-em">
            <Skeleton className="h-[23px] w-[120px] py-2" />
          </div>
          <div>
            <Skeleton className="h-[23px] w-[44px] py-2" />
          </div>
          <div>
            <Skeleton className="h-[25px] w-[69px] py-2" />
          </div>
          <div className="text-text-high-em">
            <Skeleton className="h-[23px] w-[42px] py-2 md:w-[59px]" />
          </div>
        </div>
        <div className="hidden justify-end text-text-low-em md:flex">
          <Skeleton className="h-[15px] w-[22px] rounded-6 py-2" />
        </div>
      </RowWrapper>
    ))}
  </div>
);
