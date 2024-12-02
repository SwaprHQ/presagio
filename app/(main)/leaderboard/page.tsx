import AIAgentsLeaderboardTable from '@/app/(main)/leaderboard/AIAgentsLeaderboardTable';
import { Skeleton } from '@/app/components';

export default async function LeaderboardPage() {
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
      <AIAgentsLeaderboardTable />
    </main>
  );
}
