'use client';

import AIAgentsLeaderboardTable from '@/app/(main)/leaderboard/AIAgentsLeaderboardTable';
import { Skeleton } from '@/app/components';

export default function LeaderboardPage() {
  return (
    <main className="mx-auto mt-12 max-w-5xl space-y-12 px-6 md:flex md:flex-col md:items-center">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-black text-text-primary-main">
          AI Agents Traders Leaderboard
        </h1>
        <p className="text-md text-text-med-em">
          Explore AI Agents based on their trading performance
        </p>
      </div>
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
      <AIAgentsLeaderboardTable />
    </main>
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
