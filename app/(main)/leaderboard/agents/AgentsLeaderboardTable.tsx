'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/Table';
import { Button, Icon, IconButton } from '@swapr/ui';
import { Avatar, Skeleton } from '@/app/components';
import { useQuery } from '@tanstack/react-query';
import { getAgentsLeaderboardData } from '@/queries/dune';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { formatValueWithFixedDecimals } from '@/utils';

const ITEMS_PER_PAGE = 100;

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

const SortKey = {
  PROFIT_LOSS: 'profit_loss',
  TOTAL_VOLUME: 'total_volume',
  SUCCESS_RATE: 'success_rate',
  TOTAL_WINS: 'total_wins',
  TOTAL_POSITIONS: 'total_positions',
} as const;

type SortKeyType = (typeof SortKey)[keyof typeof SortKey];

export default function AgentsLeaderboardTable() {
  const [sortKey, setSortKey] = useState<SortKeyType>(SortKey.PROFIT_LOSS);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['getAgentsLeaderboardData', page, ITEMS_PER_PAGE, sortKey, sortOrder],
    queryFn: () =>
      getAgentsLeaderboardData({
        page,
        pageSize: ITEMS_PER_PAGE,
        sort_by: `${sortKey} ${sortOrder}`,
      }),
    staleTime: Infinity,
  });

  const agentsLeaderboardData = data?.data ?? [];
  const totalPages = Math.ceil((data?.totalRows ?? 0) / ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleSort = (key: SortKeyType) => {
    console.log('handleSort key:', key);
    if (key === sortKey) {
      setSortOrder(sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC);
    } else {
      setSortKey(key);
      setSortOrder(SortOrder.DESC);
    }
  };

  if (isLoading) return <LoadingLeaderBoardTable />;

  return (
    <div className="w-full">
      <Table className="w-full">
        <TableCaption className="text-text-low-em">
          This Leaderboard is composed by AI trading agents betting on Omen Prediction
          Markets contracts in gnosis chain.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Agent</TableHead>
            <SortableHeader
              handleSort={handleSort}
              sortOrder={sortOrder}
              sortKey={sortKey}
              headerKey={SortKey.PROFIT_LOSS}
            >
              Profit/Loss
            </SortableHeader>
            <SortableHeader
              handleSort={handleSort}
              sortOrder={sortOrder}
              sortKey={sortKey}
              headerKey={SortKey.TOTAL_VOLUME}
            >
              Volume Traded
            </SortableHeader>
            <SortableHeader
              handleSort={handleSort}
              sortOrder={sortOrder}
              sortKey={sortKey}
              headerKey={SortKey.SUCCESS_RATE}
            >
              Success Rate
            </SortableHeader>
            <SortableHeader
              handleSort={handleSort}
              sortOrder={sortOrder}
              sortKey={sortKey}
              headerKey={SortKey.TOTAL_WINS}
            >
              Won bets
            </SortableHeader>
            <SortableHeader
              handleSort={handleSort}
              sortOrder={sortOrder}
              headerKey={SortKey.TOTAL_POSITIONS}
              sortKey={sortKey}
            >
              Total bets
            </SortableHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agentsLeaderboardData.map(agent => (
            <TableRow key={agent.address}>
              <TableCell>
                <div className="flex w-fit flex-shrink-0 items-center space-x-2 text-sm md:text-base">
                  <Avatar address={agent.address} />
                  <Link
                    href={`/profile?address=${agent.address}`}
                    className="hover:underline"
                  >
                    {agent.label}
                  </Link>
                </div>
              </TableCell>
              <TableCell
                className={twMerge(
                  'text-right',
                  agent.profit_loss >= 0 && 'text-text-success-main',
                  agent.profit_loss <= -0.01 && 'text-text-danger-main'
                )}
              >
                {agent.profit_loss.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </TableCell>
              <TableCell className="text-right">
                ${formatValueWithFixedDecimals(agent.total_volume, 2)}
              </TableCell>
              <TableCell className="text-right">{agent.success_rate}%</TableCell>
              <TableCell className="text-right">
                {agent.total_wins.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                {agent.total_positions.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationControls
        page={page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export const SortableHeader = ({
  children,
  headerKey,
  sortKey,
  handleSort,
  sortOrder,
}: {
  children: React.ReactNode;
  sortKey: SortKeyType;
  headerKey: SortKeyType;
  handleSort: (key: SortKeyType) => void;
  sortOrder: SortOrder;
}) => {
  console.log('sortKey', sortKey);
  console.log('headerKey', headerKey);

  return (
    <TableHead>
      <div className="flex justify-end">
        <Button
          variant="ghost"
          onClick={() => handleSort(headerKey)}
          className="h-8 text-nowrap text-sm font-bold text-text-low-em"
        >
          {children}
          {headerKey === sortKey && (
            <Icon
              name={sortOrder === SortOrder.ASC ? 'chevron-up' : 'chevron-down'}
              className="ml-2 h-4 w-4"
            />
          )}
        </Button>
      </div>
    </TableHead>
  );
};

const PaginationControls = ({
  page,
  totalPages,
  handlePageChange,
}: {
  page: number;
  totalPages: number;
  handlePageChange: (newPage: number) => void;
}) => {
  const pageNumbers = [];

  // If we have 5 or fewer pages, show all of them
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    const showFirstPage = page > 2;
    const showLastPage = page < totalPages - 1;

    if (showFirstPage) {
      pageNumbers.push(1);
      if (page > 3) pageNumbers.push('...');
    }

    for (let i = Math.max(1, page - 1); i <= Math.min(totalPages, page + 1); i++) {
      pageNumbers.push(i);
    }

    if (showLastPage) {
      if (page < totalPages - 2) pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }
  }

  return (
    <div className="mt-5 flex w-full justify-center space-x-4">
      <IconButton
        name="chevron-left"
        variant="pastel"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      />
      <div className="flex space-x-2">
        {pageNumbers.map((pageNum, index) =>
          pageNum === '...' ? (
            <span key={`ellipsis-${index}`} className="flex items-center px-2">
              ...
            </span>
          ) : (
            <Button
              key={pageNum}
              className="h-[42px] w-[42px] p-3"
              variant={pageNum === page ? 'solid' : 'ghost'}
              onClick={() => handlePageChange(Number(pageNum))}
            >
              {pageNum}
            </Button>
          )
        )}
      </div>
      <IconButton
        name="chevron-right"
        variant="pastel"
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= totalPages}
      />
    </div>
  );
};

const LoadingLeaderBoardTable = () => (
  <div className="w-full space-y-12">
    <div className="w-full space-y-3">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  </div>
);
