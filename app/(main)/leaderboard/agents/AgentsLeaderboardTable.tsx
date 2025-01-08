// @ts-nocheck
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
import { Button, Icon } from '@swapr/ui';
import { Avatar, Skeleton } from '@/app/components';
import { useQuery } from '@tanstack/react-query';
import { getAgentsLeaderboardData } from '@/queries/dune';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

const twelve_hours_in_ms = 12 * 60 * 60 * 1000;

export default function AgentsLeaderboardTable() {
  const [sortKey, setSortKey] = useState('profitLoss');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const { data: agentsLeaderboardData, isLoading } = useQuery({
    queryKey: ['getAgentsLeaderboardData'],
    queryFn: getAgentsLeaderboardData,
    staleTime: twelve_hours_in_ms,
  });

  const handleSort = (key: any) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const SortableHeader = ({
    children,
    sortKey: key,
  }: {
    children: React.ReactNode;
    sortKey: string;
  }) => (
    <TableHead>
      <div className="flex justify-end">
        <Button
          variant="ghost"
          onClick={() => handleSort(key)}
          className="h-8 text-nowrap text-sm font-bold text-text-low-em"
        >
          {children}
          {key === sortKey && (
            <Icon
              name={sortOrder === 'asc' ? 'chevron-up' : 'chevron-down'}
              className="ml-2 h-4 w-4"
            />
          )}
        </Button>
      </div>
    </TableHead>
  );

  if (isLoading) return <LoadingLeaderBoardTable />;

  return (
    <Table>
      <TableCaption className="text-text-low-em">
        This Leaderboard is composed by AI trading agents betting on Omen Prediction
        Markets contracts in gnosis chain.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Agent</TableHead>
          <SortableHeader sortKey="profitLoss">Profit/Loss</SortableHeader>
          <SortableHeader sortKey="totalVolume">Volume Traded</SortableHeader>
          <SortableHeader sortKey="successRate">Success Rate</SortableHeader>
          <SortableHeader sortKey="numberOfWonBets">Won bets</SortableHeader>
          <SortableHeader sortKey="numberOfBets">Total bets</SortableHeader>
        </TableRow>
      </TableHeader>
      <TableBody>
        {agentsLeaderboardData?.map(agent => (
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
                parseFloat(agent.profit_loss) >= 0.01 && 'text-text-success-main',
                parseFloat(agent.profit_loss) <= -0.01 && 'text-text-danger-main'
              )}
            >
              {parseFloat(agent.profit_loss).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </TableCell>
            <TableCell className="text-right">
              {agent.total_volume.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </TableCell>
            <TableCell className="text-right">{agent.success_rate}%</TableCell>
            <TableCell className="text-right">
              {agent.total_wins.toLocaleString()}
            </TableCell>
            <TableCell className="text-right">
              {agent.total_bets.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

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
