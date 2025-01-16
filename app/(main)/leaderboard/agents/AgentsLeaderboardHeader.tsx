'use client';

import { useQuery } from '@tanstack/react-query';
import { getAgentsTotalsTradeMetricsData } from '@/queries/dune';
import { StatsCard } from '@/app/components';

export default function AgentsLeaderboardHeader() {
  const { data: agentsTotalsData, isLoading } = useQuery({
    queryKey: ['getAgentsTotalsTradeMetricsData'],
    queryFn: getAgentsTotalsTradeMetricsData,
    staleTime: Infinity,
  });

  return (
    <div className="hidden w-full grid-cols-1 justify-between gap-4 sm:grid-cols-2 md:grid lg:grid-cols-4">
      <StatsCard
        title="Total volume"
        value={agentsTotalsData?.total_volume.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
        isLoading={isLoading}
        symbol="USD"
      />
      <StatsCard
        title="Total positions"
        value={agentsTotalsData?.total_positions.toString()}
        symbol="tx"
        isLoading={isLoading}
      />
      <StatsCard
        title="Avg success rate"
        value={agentsTotalsData?.avg_success_rate.toString()}
        symbol="%"
        isLoading={isLoading}
      />
      <StatsCard
        title="Total Profit/loss"
        value={agentsTotalsData?.total_profit_loss.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
        symbol="usd"
        isLoading={isLoading}
      />
    </div>
  );
}
