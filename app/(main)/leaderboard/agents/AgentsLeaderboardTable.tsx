'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/Table';
import { Button, Icon, IconButton, Input } from '@swapr/ui';
import { Avatar, Skeleton } from '@/app/components';
import { useQuery } from '@tanstack/react-query';
import { getAgentsTradeMetricsData } from '@/queries/dune';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { formatValueWithFixedDecimals } from '@/utils';
import { useDebounce } from '@/hooks';

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
  ROI: 'ROI',
} as const;

type SortKeyType = (typeof SortKey)[keyof typeof SortKey];

const defaultSort = SortKey.PROFIT_LOSS;
const defaultOrder = SortOrder.DESC;

export default function AgentsLeaderboardTable() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = Number(searchParams.get('page')) || 1;
  const initialSortKey = (searchParams.get('sort') as SortKeyType) || defaultSort;
  const initialSortOrder =
    (searchParams.get('order')?.toLowerCase() as SortOrder) || defaultOrder;
  const initialFilter = searchParams.get('filter') || '';

  const [page, setPage] = useState(initialPage);
  const [sortKey, setSortKey] = useState<SortKeyType>(initialSortKey);
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialSortOrder);
  const [filter, setFilter] = useState(initialFilter);
  const [inputValue, setInputValue] = useState(initialFilter);

  const debouncedFilter = useDebounce(inputValue, 900);

  const { data, isLoading } = useQuery({
    queryKey: [
      'getAgentsTradeMetricsData',
      page,
      ITEMS_PER_PAGE,
      sortKey,
      sortOrder,
      filter,
    ],
    queryFn: () =>
      getAgentsTradeMetricsData({
        page,
        pageSize: ITEMS_PER_PAGE,
        sortBy: `${sortKey} ${sortOrder}`,
        filters: filter ? `address ILIKE '%${filter}%' OR label ILIKE '%${filter}%'` : '',
      }),
    staleTime: Infinity,
  });

  const agentsLeaderboardData = data?.data ?? [];
  const totalPages = Math.ceil((data?.totalRows ?? 0) / ITEMS_PER_PAGE);

  const updateURL = (params: {
    page?: number;
    sort?: SortKeyType;
    order?: SortOrder;
    filter?: string;
  }) => {
    const urlParams = new URLSearchParams(searchParams.toString());

    if (params.page === 1) {
      urlParams.delete('page');
    } else if (params.page) {
      urlParams.set('page', params.page.toString());
    }

    if (params.sort === defaultSort && params.order === defaultOrder) {
      urlParams.delete('sort');
      urlParams.delete('order');
    } else {
      if (params.sort) urlParams.set('sort', params.sort);
      if (params.order) urlParams.set('order', params.order);
    }

    if (params.filter) {
      urlParams.set('filter', params.filter);
    } else {
      urlParams.delete('filter');
    }

    router.replace(`/leaderboard/agents?${urlParams.toString()}`);
  };

  // Sync state with URL
  useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1);
    setSortKey((searchParams.get('sort') as SortKeyType) || defaultSort);
    setSortOrder((searchParams.get('order')?.toLowerCase() as SortOrder) || defaultOrder);
    setInputValue(searchParams.get('filter') || '');
  }, [searchParams]);

  // Update URL when debounced value changes
  useEffect(() => {
    setFilter(debouncedFilter);
    updateURL({ filter: debouncedFilter, page: 1, sort: sortKey, order: sortOrder });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFilter]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      updateURL({ page: newPage, sort: sortKey, order: sortOrder, filter });
    }
  };

  const handleSort = (key: SortKeyType) => {
    let order = sortOrder;
    if (key === sortKey) {
      order = sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
    } else {
      order = defaultOrder;
    }
    setSortKey(key);
    setSortOrder(order);
    updateURL({
      sort: key,
      order: order,
      page: 1, // Reset to first page when sorting changes
      filter,
    });
  };

  return (
    <div className="w-full">
      <Input
        leftIcon="search"
        className="mb-4 w-full"
        placeholder="Search agent by address or label"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      {isLoading ? (
        <LoadingLeaderBoardTable />
      ) : (
        <Table className="w-full">
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
              <SortableHeader
                handleSort={handleSort}
                sortOrder={sortOrder}
                headerKey={SortKey.ROI}
                sortKey={sortKey}
              >
                ROI
              </SortableHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agentsLeaderboardData.map(agent => (
              <TableRow key={agent.address}>
                <TableCell>
                  <div className="flex w-48 items-center space-x-2 text-sm md:text-base">
                    <Avatar address={agent.address} />
                    <Link
                      href={`/profile?address=${agent.address}`}
                      className="truncate hover:underline"
                    >
                      {agent.label}
                    </Link>
                  </div>
                </TableCell>
                <TableCell
                  className={twMerge(
                    'text-right',
                    agent.profit_loss >= 0 && 'text-text-success-high-em',
                    agent.profit_loss <= -0.01 && 'text-text-danger-high-em'
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
                <TableCell className="text-right">{Math.round(agent.ROI)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {agentsLeaderboardData.length === 0 && (
            <TableCaption className="py-8 text-md">
              No data found for{' '}
              <code className="text-text-med-em">{debouncedFilter}</code>
            </TableCaption>
          )}
          <TableCaption className="text-[13px] text-text-low-em">
            This Leaderboard is composed by{' '}
            <a href="https://www.gnosis.io/blog/meet-gnosis-ai" className="underline">
              AI prediction markets agents
            </a>{' '}
            betting on Prediction Markets on Gnosis chain.
          </TableCaption>
        </Table>
      )}

      {!debouncedFilter && (
        <PaginationControls
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
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
}) => (
  <TableHead>
    <div className="flex justify-end">
      <Button
        variant="ghost"
        onClick={() => handleSort(headerKey)}
        className="h-8 text-nowrap text-sm font-semibold text-text-low-em"
      >
        {children}
        {headerKey === sortKey && (
          <Icon
            name={sortOrder === SortOrder.ASC ? 'chevron-up' : 'chevron-down'}
            className="ml-1 h-4 w-4"
          />
        )}
      </Button>
    </div>
  </TableHead>
);

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
    <div className="mt-5 flex w-full items-center justify-center space-x-4">
      <IconButton
        name="chevron-left"
        size="sm"
        variant="secondary"
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
              variant={pageNum === page ? 'light' : 'ghost'}
              onClick={() => handlePageChange(Number(pageNum))}
            >
              {pageNum}
            </Button>
          )
        )}
      </div>
      <IconButton
        name="chevron-right"
        size="sm"
        variant="secondary"
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
    </div>
  </div>
);
