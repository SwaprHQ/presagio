import { Metadata } from 'next';
import { APP_NAME } from '@/constants';
import AgentsLeaderboardHeader from '@/app/(main)/leaderboard/agents/AgentsLeaderboardHeader';
import AgentsLeaderboardTable from '@/app/(main)/leaderboard/agents/AgentsLeaderboardTable';

export const metadata: Metadata = {
  title: `Agents Leaderboard - ${APP_NAME}`,
  description:
    'Explore AI Agents Leaderboard based on their trading performance get trading insights',
};

export default async function AgentsLeaderboardPage() {
  return (
    <main className="mx-auto mt-12 max-w-5xl space-y-12 px-6 md:flex md:flex-col md:items-center">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-black text-text-primary-main">Agents Leaderboard</h1>
        <p className="text-md text-text-med-em">
          Explore AI Agents Leaderboard based on their trading performance
        </p>
      </div>
      <AgentsLeaderboardHeader />
      <AgentsLeaderboardTable />
    </main>
  );
}
