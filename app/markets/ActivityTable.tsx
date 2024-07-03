import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/Table';
import { TransactionType, getMarketTransactions } from '@/queries/omen';
import {
  formatDateTime,
  formatEtherWithFixedDecimals,
  getGnosisAddressExplorerLink,
  shortenAddress,
} from '@/utils';
import { Button, Icon, Tag, TagColorSchemeProp } from '@swapr/ui';
import { useQuery } from '@tanstack/react-query';
import { cx } from 'class-variance-authority';
import { useState } from 'react';

const getTagColorScheme = (transactionType: TransactionType): TagColorSchemeProp => {
  switch (transactionType) {
    case TransactionType.Buy:
      return 'success';
    case TransactionType.Sell:
      return 'danger';
    case TransactionType.Add:
      return 'info';
    case TransactionType.Remove:
      return 'quaternary';
    default:
      return 'info';
  }
};

const ITEMS_PER_PAGE = 10;

export const ActivityTable = ({ id }: { id: string }) => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['getMarketTransactions', id, page - 1],
    queryFn: async () =>
      getMarketTransactions({
        first: ITEMS_PER_PAGE,
        skip: (page - 1) * ITEMS_PER_PAGE,
        id: id.toLowerCase(),
      }),
  });

  const { data: transactionsNextPage } = useQuery({
    queryKey: ['getMarketTransactions', id, page],
    queryFn: async () =>
      getMarketTransactions({
        first: ITEMS_PER_PAGE,
        skip: page * ITEMS_PER_PAGE,
        id: id.toLowerCase(),
      }),
  });

  const hasMoreMarkets =
    transactionsNextPage && transactionsNextPage.fpmmTransactions.length !== 0;

  const showPaginationButtons = hasMoreMarkets || page !== 1;

  const activities = data?.fpmmTransactions ?? [];

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4 text-text-low-em">Users</TableHead>
            <TableHead className="text-text-low-em">Action</TableHead>
            <TableHead className="text-text-low-em">Shares</TableHead>
            <TableHead className="pr-4 text-right text-text-low-em">Date</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <TableBody className="text-base font-semibold">
            {activities.map(activity => (
              <TableRow key={activity.transactionHash}>
                <TableCell className="pl-4 text-text-high-em">
                  <a
                    href={getGnosisAddressExplorerLink(activity.user.id)}
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {shortenAddress(activity.user.id)}
                  </a>
                </TableCell>
                <TableCell>
                  <Tag
                    size="xs"
                    colorScheme={getTagColorScheme(activity.transactionType)}
                    className="w-fit uppercase"
                  >
                    {activity.transactionType}
                  </Tag>
                </TableCell>
                <TableCell className="truncate text-text-high-em">
                  {formatEtherWithFixedDecimals(activity.sharesOrPoolTokenAmount)}
                </TableCell>
                <TableCell className="text-nowrap pr-4 text-right text-text-low-em">
                  {formatDateTime(activity.creationTimestamp)}
                </TableCell>
              </TableRow>
            ))}
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
