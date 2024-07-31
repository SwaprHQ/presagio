import { useMemo, useState } from 'react';

import { cx } from 'class-variance-authority';
import { useQuery } from '@tanstack/react-query';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/Table';
import {
  FpmmTrade,
  FpmmTrade_OrderBy,
  FpmmTransaction,
  FpmmType,
  OrderDirection,
  TransactionType,
  getMarketTrades,
  getMarketTradesAndTransactions,
} from '@/queries/omen';
import {
  formatDateTime,
  formatDateTimeWithYear,
  formatEtherWithFixedDecimals,
  getGnosisAddressExplorerLink,
  shortenAddress,
} from '@/utils';
import { Button, Icon, Tag, TagColorSchemeProp } from '@swapr/ui';
import { Outcome } from '@/entities';
import { DuneClient, LatestResultArgs, ParameterType } from '@duneanalytics/client-sdk';
import Image from 'next/image';
import { DUNE_API_KEY } from '@/constants';
import { TokenLogo } from '@/app/components';

const duneClient = new DuneClient(DUNE_API_KEY);

const TAG_COLOR_SCHEMES: { 0: TagColorSchemeProp; 1: TagColorSchemeProp } = {
  0: 'success',
  1: 'danger',
};

const ITEMS_PER_PAGE = 10;

type MergedTradeTransaction = Omit<FpmmTrade, '__typename'> &
  Partial<Omit<FpmmTransaction, '__typename'>> & {
    __typename?: 'FpmmTrade' | 'FpmmTransaction';
  };

export const ActivityTable = ({ id }: { id: string }) => {
  const [page, setPage] = useState(1);

  const { data: aiAgentsList } = useQuery({
    queryKey: ['getAIAgents'],
    queryFn: async () => {
      const DUNE_AGENTS_INFO_QUERY_ID = 3582994;

      const options: LatestResultArgs = {
        queryId: DUNE_AGENTS_INFO_QUERY_ID,
        parameters: [{ type: ParameterType.NUMBER, value: '1', name: 'limit' }],
      };

      const duneResult = await duneClient.getLatestResult(options);

      return duneResult.result?.rows;
    },
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4 text-text-low-em">User</TableHead>
            <TableHead className="text-text-low-em">Shares</TableHead>
            <TableHead className="text-text-low-em">Collateral</TableHead>
            <TableHead className="pr-4 text-right text-text-low-em">Date</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <TableBody className="text-base font-semibold">
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
          </TableBody>
        )}
      </Table>
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
    <TableRow>
      <TableCell className="flex items-center space-x-2 pl-4 text-text-high-em">
        <a
          href={getGnosisAddressExplorerLink(creatorAddress)}
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {shortenAddress(creatorAddress)}
        </a>
        {isAIAgent && <Image src="/ai.svg" alt="ai" width={18} height={18} />}
      </TableCell>

      <TableCell className="truncate text-text-high-em">
        <div className="flex items-center space-x-2">
          <p>
            {activity.transactionType === TransactionType.Sell && (
              <span className="mr-0.5 text-md font-bold">-</span>
            )}
            {activity.transactionType === TransactionType.Buy && (
              <span className="mr-0.5 text-md font-bold">+</span>
            )}
            {formatEtherWithFixedDecimals(activity.outcomeTokensTraded)}
          </p>
          <Tag
            size="xs"
            colorScheme={
              outcome ? TAG_COLOR_SCHEMES[outcome.index as 0 | 1] : 'quaternary'
            }
            className="w-fit uppercase"
          >
            {outcome ? outcome.symbol : '-'}
          </Tag>
        </div>
      </TableCell>

      <TableCell className="truncate text-text-high-em">
        <div className="flex items-center space-x-1">
          <p>
            {activity.collateralTokenAmount
              ? formatEtherWithFixedDecimals(activity.collateralTokenAmount)
              : '-'}
          </p>
          <TokenLogo address={activity.collateralToken} className="h-[14px] w-[14px]" />
        </div>
      </TableCell>
      <TableCell
        className="text-nowrap pr-4 text-right text-xs text-text-low-em"
        title={formatDateTimeWithYear(activity.creationTimestamp)}
      >
        {formatDateTime(activity.creationTimestamp)}
      </TableCell>
    </TableRow>
  );
};

interface LiquidityEventRowProps {
  transaction: FpmmTransaction;
  isAIAgent: boolean;
}
const LiquidityEventRow = ({ transaction, isAIAgent }: LiquidityEventRowProps) => {
  const creatorAddress = transaction.user.id;

  return (
    <TableRow key={transaction.transactionHash}>
      <TableCell className="flex items-center space-x-2 pl-4 text-text-high-em">
        <a
          href={getGnosisAddressExplorerLink(creatorAddress)}
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {shortenAddress(creatorAddress)}
        </a>
        {isAIAgent && <Image src="/ai.svg" alt="ai" width={18} height={18} />}
      </TableCell>

      <TableCell className="truncate text-text-high-em">
        <div className="flex items-center space-x-2">
          <p>{formatEtherWithFixedDecimals(transaction.sharesOrPoolTokenAmount)}</p>
          <Tag size="xs" colorScheme="info" className="w-fit uppercase">
            {transaction.transactionType}
          </Tag>
        </div>
      </TableCell>

      <TableCell className="truncate text-text-high-em">
        <div className="flex items-center space-x-1">
          <p>
            {transaction.collateralTokenAmount
              ? formatEtherWithFixedDecimals(transaction.collateralTokenAmount)
              : '-'}
          </p>
          <TokenLogo
            address={transaction.fpmm.collateralToken}
            className="h-[14px] w-[14px]"
          />
        </div>
      </TableCell>
      <TableCell
        className="text-nowrap pr-4 text-right text-xs text-text-low-em"
        title={formatDateTimeWithYear(transaction.creationTimestamp)}
      >
        {formatDateTime(transaction.creationTimestamp)}
      </TableCell>
    </TableRow>
  );
};

const LoadingSkeleton = () => (
  <TableBody className="text-base font-semibold">
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(fakeActivity => (
      <TableRow key={fakeActivity}>
        <TableCell className="text-text-high-em">
          <div className="h-[18px] w-[115px] animate-pulse rounded-8 bg-outline-low-em"></div>
        </TableCell>
        <TableCell>
          <div className="h-[24px] w-[40px] animate-pulse rounded-8 bg-outline-low-em"></div>
        </TableCell>
        <TableCell className="truncate text-text-high-em">
          <div className="h-[24px] w-12 animate-pulse rounded-8 bg-outline-low-em"></div>
        </TableCell>
        <TableCell className="flex justify-end text-text-low-em">
          <div className="h-[18px] w-[100px] animate-pulse rounded-8 bg-outline-low-em"></div>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
);
