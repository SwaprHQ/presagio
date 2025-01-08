// @ts-nocheck
'use client';

import { useMemo, useState } from 'react';
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
import { Avatar, Skeleton, UserAvatarWithAddress } from '@/app/components';
import { Address, formatEther } from 'viem';
import { useQuery } from '@tanstack/react-query';
import {
  Market,
  Position,
  tradesCollateralAmountSpent,
  tradesOutcomeBalance,
  tradesVolume,
  UserBet,
} from '@/entities';
import {
  getAllAiAgentsBets,
  getConditionMarket,
  getMarketUserTrades,
} from '@/queries/omen';
import { getAgentsLeaderboardData } from '@/queries/dune';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

export default function AIAgentsLeaderboardTable() {
  const [sortKey, setSortKey] = useState('profitLoss');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const { data: agentsLeaderboardData, isLoading } = useQuery({
    queryKey: ['getAIAgents'],
    queryFn: getAgentsLeaderboardData,
    staleTime: 12 * 60 * 60 * 1000, // 12 hours
  });

  const handleSort = (key: SortKey) => {
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
    <>
      <div className="hidden w-full grid-cols-1 justify-between gap-4 sm:grid-cols-2 md:grid lg:grid-cols-4">
        <StatsCard
          title="Total tx volume"
          value={'89,122'}
          symbol="usd"
          isLoading={false}
        />
        <StatsCard title="Total tx count" value={'8126'} symbol="tx" isLoading={false} />
        <StatsCard title="Avg success rate" value={'45'} symbol="%" isLoading={false} />
        <StatsCard
          title="Total Profit/loss"
          value={'3,321.00'}
          symbol="usd"
          isLoading={false}
        />
      </div>
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
    </>
  );
}

const StatsCard = ({
  title,
  value,
  symbol,
  isLoading,
}: {
  title: string;
  value: string;
  symbol: string;
  isLoading?: boolean;
}) => {
  return (
    <div className="w-full space-y-2 rounded-16 bg-surface-surface-0 p-6 font-semibold text-text-low-em ring-1 ring-outline-base-em">
      <div className="text-xs font-bold uppercase">{title}</div>
      <div className="flex space-x-1.5 text-2xl">
        {isLoading ? (
          <Skeleton className="h-9 w-12" />
        ) : (
          <span className="text-text-high-em">{value}</span>
        )}
        <span className="uppercase">{symbol}</span>
      </div>
    </div>
  );
};

const LoadingLeaderBoardTable = () => (
  <div className="w-full space-y-12">
    <div className="hidden w-full grid-cols-1 justify-between gap-4 sm:grid-cols-2 md:grid lg:grid-cols-4">
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
    </div>
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
