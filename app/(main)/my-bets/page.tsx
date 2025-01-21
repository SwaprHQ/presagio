'use client';

import NoBetsPage from '@/app/(main)/my-bets/NoBetsPage';
import NoWalletConnectedPage from '@/app/(main)/my-bets/NoWalletConnectedPage';
import { UserBet, UserBetsManager } from '@/entities';

import { getUserBets } from '@/queries/omen';
import { useQuery } from '@tanstack/react-query';

import { useMemo } from 'react';
import { TabBody, TabGroup, TabHeader } from '@swapr/ui';
import { useAccount } from 'wagmi';
import { BetsListPanel, BetsListTab } from '@/app/components';

export default function MyBetsPage() {
  const { address } = useAccount();

  const { data: userPositionsComplete, isLoading } = useQuery<UserBet[]>({
    queryKey: ['getUserBets', address],
    queryFn: async () => await getUserBets(address),
    enabled: !!address,
  });

  const userBetsManager = useMemo(
    () => new UserBetsManager(userPositionsComplete),
    [userPositionsComplete]
  );

  const filterActiveBets = useMemo(
    () => userBetsManager.getActiveBets(),
    [userBetsManager]
  );
  const filterCompleteBets = useMemo(
    () => userBetsManager.getCompletedBets(),
    [userBetsManager]
  );

  const filterWonBets = useMemo(() => userBetsManager.getWonBets(), [userBetsManager]);
  const filterLostBets = useMemo(() => userBetsManager.getLostBets(), [userBetsManager]);

  const filterUnredeemedBets = useMemo(
    () => userBetsManager.getUnredeemedBets(),
    [userBetsManager]
  );

  if (!address) return <NoWalletConnectedPage />;
  if (!isLoading && userPositionsComplete?.length === 0) return <NoBetsPage />;

  return (
    <div className="mt-12 w-full space-y-12 px-6 md:flex md:flex-col md:items-center">
      <div>
        <h1 className="text-white mb-8 text-2xl font-semibold">My bets</h1>
        <div className="md:w-[760px]">
          <TabGroup>
            <TabHeader className="overflow-x-auto md:overflow-x-visible">
              <BetsListTab bets={userPositionsComplete ?? []}>All</BetsListTab>
              <BetsListTab bets={filterActiveBets}>Active</BetsListTab>
              <BetsListTab bets={filterUnredeemedBets}>Unredeemed</BetsListTab>
              <BetsListTab bets={filterCompleteBets}>Complete</BetsListTab>
              <BetsListTab bets={filterWonBets}>Won</BetsListTab>
              <BetsListTab bets={filterLostBets}>Lost</BetsListTab>
            </TabHeader>
            <TabBody className="mt-8">
              <BetsListPanel bets={userPositionsComplete ?? []} isLoading={isLoading} />
              <BetsListPanel
                emptyText="No active bets"
                bets={filterActiveBets}
                isLoading={isLoading}
              />
              <BetsListPanel
                emptyText="No unredeemed bets"
                bets={filterUnredeemedBets}
                isLoading={isLoading}
              />
              <BetsListPanel
                emptyText="No complete bets"
                bets={filterCompleteBets}
                isLoading={isLoading}
              />
              <BetsListPanel
                emptyText="No won bets"
                bets={filterWonBets}
                isLoading={isLoading}
              />
              <BetsListPanel
                emptyText="No lost bets"
                bets={filterLostBets}
                isLoading={isLoading}
              />
            </TabBody>
          </TabGroup>
        </div>
      </div>
    </div>
  );
}
