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
import {
  formatDateTimeWithYear,
  formatEtherWithFixedDecimals,
  shortenAddress,
  timeAgo,
} from '@/utils';
import { Button, Icon, Tag, TagColorSchemeProp } from '@swapr/ui';
import { Outcome } from '@/entities';
import Image from 'next/image';
import { TokenLogo } from '@/app/components';
import Link from 'next/link';
import { getAIAgents } from '@/queries/dune';

const TAG_COLOR_SCHEMES: { 0: TagColorSchemeProp; 1: TagColorSchemeProp } = {
  0: 'success',
  1: 'danger',
};

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
      if (!aiAgentsList?.length) return false;
      return aiAgentsList.some(
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
          <LoadingSkeleton />
        ) : (
          <div className="w-full divide-y divide-outline-base-em overflow-x-scroll border-t border-outline-base-em text-base font-semibold md:overflow-x-auto">
            {marketTransactions?.map(transaction => {
              const isAIAgent = getIsAIAgent(transaction.user.id);
              const isLiquidityEvent = transaction.fpmmType === FpmmType.Liquidity;

              if (isLiquidityEvent)
                return (
                  <LiquidityEventRow
                    key={transaction.id}
                    transaction={transaction}
                    isAIAgent={isAIAgent}
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
                  <TradeRow
                    key={transaction.id}
                    activity={activity}
                    isAIAgent={isAIAgent}
                  />
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
            variant="pastel"
            onClick={() => setPage(page - 1)}
            className={cx('space-x-2', { invisible: page === 1 })}
          >
            <Icon name="chevron-left" />
            <p>Prev</p>
          </Button>
          <p className="font-semibold text-text-med-em">Page {page}</p>
          <Button
            variant="pastel"
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
      className="h-[13px] w-[13px] opacity-60 hover:scale-110 hover:opacity-100"
    />
  </div>
);

interface TradeRowProps {
  activity: MergedTradeTransaction;
  isAIAgent: boolean;
}

const TradeRow = ({ activity, isAIAgent }: TradeRowProps) => {
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
        <AILink address={creatorAddress} isAIAgent={isAIAgent} />
        {activity.transactionType && (
          <p className="text-text-low-em">
            {txTypeHumanWords[activity.transactionType][0]}
          </p>
        )}
        <Tag
          size="xs"
          colorScheme={outcome ? TAG_COLOR_SCHEMES[outcome.index as 0 | 1] : 'quaternary'}
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

interface AILinkProps {
  address: string;
  isAIAgent: boolean;
}

const AILink = ({ address, isAIAgent }: AILinkProps) => (
  <div className="flex w-fit flex-shrink-0 items-center space-x-1 text-sm md:text-base">
    <Link
      href={`/profile?address=${address}`}
      className={cx(
        'hover:underline',
        isAIAgent ? 'text-text-primary-main' : 'text-text-high-em'
      )}
      target="_blank"
      rel="noopener noreferrer"
    >
      {shortenAddress(address)}
    </Link>
    {isAIAgent && <Image src="/ai.svg" alt="ai" width={16} height={16} />}
  </div>
);

interface LiquidityEventRowProps {
  transaction: FpmmTransaction;
  isAIAgent: boolean;
}

const RowWrapper = ({ children }: PropsWithChildren) => (
  <div className="flex w-full min-w-max items-center justify-between space-x-2 p-4">
    {children}
  </div>
);

const LiquidityEventRow = ({ transaction, isAIAgent }: LiquidityEventRowProps) => {
  const creatorAddress = transaction.user.id;

  return (
    <RowWrapper>
      <div className="flex items-center space-x-1.5">
        <AILink address={creatorAddress} isAIAgent={isAIAgent} />
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

const LoadingSkeleton = () => (
  <div className="text-base font-semibold">
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(fakeActivity => (
      <RowWrapper key={fakeActivity}>
        <div className="flex items-center space-x-1.5">
          <div className="text-text-high-em">
            <div className="h-[23px] w-[120px] animate-pulse rounded-8 bg-outline-low-em py-2"></div>
          </div>
          <div>
            <div className="h-[23px] w-[44px] animate-pulse rounded-8 bg-outline-low-em py-2"></div>
          </div>
          <div>
            <div className="h-[25px] w-[69px] animate-pulse rounded-8 bg-outline-low-em py-2"></div>
          </div>
          <div className="text-text-high-em">
            <div className="h-[23px] w-[42px] animate-pulse rounded-8 bg-outline-low-em py-2 md:w-[59px]"></div>
          </div>
        </div>
        <div className="hidden justify-end text-text-low-em md:flex">
          <div className="h-[15px] w-[22px] animate-pulse rounded-6 bg-outline-low-em py-2"></div>
        </div>
      </RowWrapper>
    ))}
  </div>
);
