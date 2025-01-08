// @ts-nocheck
'use client';

import { Skeleton } from '@/app/components';
import { useQuery } from '@tanstack/react-query';
import { getAgentsTotalsData } from '@/queries/dune';

export default function AgentsLeaderboardHeader() {
  const twelve_hours_in_ms = 12 * 60 * 60 * 1000;

  const { data: agentsTotalsData, isLoading } = useQuery({
    queryKey: ['getAgentsTotalsData'],
    queryFn: getAgentsTotalsData,
    staleTime: twelve_hours_in_ms,
  });

  if (isLoading) return <LoadingLeaderBoardHeader />;

  return (
    <div className="hidden w-full grid-cols-1 justify-between gap-4 sm:grid-cols-2 md:grid lg:grid-cols-4">
      <StatsCard
        title="Total tx volume"
        value={agentsTotalsData[0].total_volume.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
        symbol="USD"
        isLoading={false}
      />
      <StatsCard
        title="Total tx count"
        value={agentsTotalsData[0].total_bets}
        symbol="tx"
        isLoading={false}
      />
      <StatsCard
        title="Avg success rate"
        value={agentsTotalsData[0].avg_success_rate}
        symbol="%"
        isLoading={false}
      />
      <StatsCard
        title="Total Profit/loss"
        value={parseFloat(agentsTotalsData[0].total_profit_loss).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
        symbol="usd"
        isLoading={false}
      />
    </div>
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
      <div className="flex items-center space-x-1.5 text-2xl">
        {isLoading ? (
          <Skeleton className="h-9 w-12" />
        ) : (
          <span className="text-text-high-em">{value}</span>
        )}
        <span className="text-xl uppercase">{symbol}</span>
      </div>
    </div>
  );
};

const LoadingLeaderBoardHeader = () => (
  <div className="w-full space-y-12">
    <div className="hidden w-full grid-cols-1 justify-between gap-4 sm:grid-cols-2 md:grid lg:grid-cols-4">
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
    </div>
  </div>
);
