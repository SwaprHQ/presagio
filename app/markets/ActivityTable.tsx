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
import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  Icon,
  Tag,
  TagColorSchemeProp,
} from '@swapr/ui';
import { Outcome } from '@/entities';
import { DuneClient, LatestResultArgs, ParameterType } from '@duneanalytics/client-sdk';
import Image from 'next/image';
import { DUNE_API_KEY } from '@/constants';
import { TokenLogo } from '@/app/components';
import { ModalId, useModal } from '../../context';

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
  const { openModal, isModalOpen, closeModal } = useModal();

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

  const modalKey = ModalId.AGENT_DETAILS + creatorAddress;

  return (
    <>
      <TableRow onClick={() => openModal(modalKey)}>
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

      <Dialog open={isModalOpen(modalKey)} onOpenChange={() => closeModal(modalKey)}>
        <DialogContent>
          <DialogHeader />
          <DialogBody className="my-8 w-[496px] max-w-[496px] space-y-2 divide-y divide-outline-base-em">
            <div className="flex items-center justify-between px-4 pb-4">
              <div className="flex items-center space-x-2">
                <p className="text-xl">{shortenAddress(creatorAddress)}</p>
                <Image src="/ai.svg" alt="ai" width={18} height={18} />
              </div>
              <p>GPT-4</p>
            </div>
            <div className="flex flex-col items-center space-y-6 p-4">
              <a
                href={getGnosisAddressExplorerLink(creatorAddress)}
                className="text-text-low-em underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agent {shortenAddress(creatorAddress)} bought 100 YES shares{' '}
                <Icon name="arrow-top-right-small" className="inline text-text-med-em" />
              </a>
              <div className="flex flex-col items-center rounded-20 bg-surface-surface-1 px-6 py-5 ring-2 ring-outline-low-em">
                <p className="text-md text-text-med-em">Confidance</p>
                <p className="text-[44px] leading-[56px] text-text-primary-main">65%</p>
              </div>
            </div>
            <div className="space-y-4 p-4">
              <p className="font-semibold text-text-low-em">Research articles:</p>
              <div className="rounded-16 px-8 py-4 ring-1 ring-outline-base-em">
                <ol className="list-decimal">
                  <li className="text-text-low-em">
                    <a className="inline text-text-primary-main underline">
                      &quot;DeFi Boom Makes Uniswap Most Sought-After Crypto
                      Exchange&quot;
                    </a>{' '}
                    Bloomberg.com. 16 October 2020
                  </li>
                  <li className="text-text-low-em">
                    <a className="inline text-text-primary-main underline">
                      &quot;Stimulus Checks From A Crypto Exchange; Bitcoin Rebound&quot;
                    </a>{' '}
                    Forbes
                  </li>
                  <li className="text-text-low-em">
                    <a className="inline text-text-primary-main underline">
                      &quot;OMERS-affiliated Ethereum Capital offering pinched, but not
                      pulled, following choppy markets and cryptocrash&quot;
                    </a>{' '}
                    The Globe and Mail. 13 February 2023
                  </li>
                  <li className="text-text-low-em">
                    <a className="inline text-text-primary-main underline">
                      &quot;Crypto Cynics Stand to Profit the Most&quot;
                    </a>{' '}
                    Bloomberg.com. 8 February 2024
                  </li>
                  <li className="text-text-low-em">
                    <a className="inline text-text-primary-main underline">
                      &quot;Crypto crash: bitcoin drops to lowest point since
                      November&quot;
                    </a>{' '}
                    The Week. 2 February 2024
                  </li>
                </ol>
              </div>
            </div>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </>
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
