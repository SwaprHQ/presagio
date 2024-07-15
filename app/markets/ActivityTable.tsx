import { useState } from 'react';

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
import { FpmmTrade_OrderBy, OrderDirection, getMarketTrades } from '@/queries/omen';
import {
  formatDateTime,
  formatEtherWithFixedDecimals,
  getGnosisAddressExplorerLink,
  shortenAddress,
} from '@/utils';
import { Button, Icon, Tag, TagColorSchemeProp } from '@swapr/ui';
import { Outcome } from '@/entities';

const TAG_COLOR_SCHEMES: { 0: TagColorSchemeProp; 1: TagColorSchemeProp } = {
  0: 'success',
  1: 'danger',
};

const ITEMS_PER_PAGE = 10;

export const ActivityTable = ({ id }: { id: string }) => {
  const [page, setPage] = useState(1);

  const { data: trades, isLoading } = useQuery({
    queryKey: ['getMarketTrades', id, page - 1],
    queryFn: async () =>
      getMarketTrades({
        first: ITEMS_PER_PAGE,
        skip: (page - 1) * ITEMS_PER_PAGE,
        fpmm: id,
        orderBy: FpmmTrade_OrderBy.CreationTimestamp,
        orderDirection: OrderDirection.Desc,
      }),
  });

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
  const activities = trades?.fpmmTrades;

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4 text-text-low-em">User</TableHead>
            <TableHead className="text-text-low-em">Action</TableHead>
            <TableHead className="text-text-low-em">Shares</TableHead>
            <TableHead className="pr-4 text-right text-text-low-em">Date</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <TableBody className="text-base font-semibold">
            {activities?.map(activity => {
              const outcomes = activity.fpmm.outcomes;

              const outcome = new Outcome(
                activity.outcomeIndex,
                outcomes?.[activity.outcomeIndex] ?? 'Option 1',
                id
              );

              if (!outcomes || !outcome.index) return null;

              return (
                <TableRow key={activity.transactionHash}>
                  <TableCell className="pl-4 text-text-high-em">
                    <a
                      href={getGnosisAddressExplorerLink(activity.creator.id)}
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {shortenAddress(activity.creator.id)}
                    </a>
                  </TableCell>
                  <TableCell>
                    <Tag
                      size="xs"
                      colorScheme={TAG_COLOR_SCHEMES[outcome.index as 0 | 1]}
                      className="w-fit uppercase"
                    >
                      {outcome.symbol}
                    </Tag>
                  </TableCell>
                  <TableCell className="truncate text-text-high-em">
                    {formatEtherWithFixedDecimals(activity.outcomeTokensTraded)}
                  </TableCell>
                  <TableCell className="text-nowrap pr-4 text-right text-text-low-em">
                    {formatDateTime(activity.creationTimestamp)}
                  </TableCell>
                </TableRow>
              );
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

const LoadingSkeleton = () => (
  <TableBody className="text-base font-semibold">
    {[1, 2, 3, 4, 5, 6, 7, 8].map(fakeActivity => (
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
