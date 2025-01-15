'use client';

import NoBetsPage from '@/app/(main)/my-bets/NoBetsPage';
import NoWalletConnectedPage from '@/app/(main)/my-bets/NoWalletConnectedPage';
import { UserBet, UserBetsManager } from '@/entities';

import { getUserBets } from '@/queries/omen';
import { useQuery } from '@tanstack/react-query';

import { useEffect, useMemo, useState } from 'react';
import { TabBody, TabGroup, TabHeader } from '@swapr/ui';
import { useAccount } from 'wagmi';
import { BetsListPanel, BetsListTab } from '@/app/components';
import { useRouter } from 'next/navigation';

const ITEMS_PER_PAGE = 50;

export default function MyBetsPage() {
  const { address } = useAccount();
  const router = useRouter();

  const searchParams =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams('/my-bets');

  const [page, setPage] = useState(
    Number(searchParams.get('page')?.toLocaleLowerCase() || '1')
  );

  const { data: userPositionsComplete, isLoading } = useQuery<UserBet[]>({
    queryKey: ['getUserBets', address],
    queryFn: async () => await getUserBets({ address }),
    enabled: !!address,
  });

  const { data: nextPagePositions } = useQuery<UserBet[]>({
    queryKey: ['getUserBetsNextPage', address, page],
    queryFn: async () =>
      await getUserBets({
        address,
        itemsPerPage: ITEMS_PER_PAGE,
        page: page + 1,
      }),
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
  const filterUnredeemedBets = useMemo(
    () => userBetsManager.getUnredeemedBets(),
    [userBetsManager]
  );

  useEffect(() => {
    return () => {
      searchParams.delete('page');
      router.replace(`/my-bets?${searchParams.toString()}`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!address) return <NoWalletConnectedPage />;
  if (!isLoading && userPositionsComplete?.length === 0) return <NoBetsPage />;

  const handlePageChange = (newPage: number) => {
    searchParams.set('page', newPage.toString());
    setPage(newPage);

    router.replace(`/my-bets?${searchParams.toString()}`);
  };

  return (
    <div className="mt-12 w-full space-y-12 px-6 md:flex md:flex-col md:items-center">
      <div>
        <h1 className="text-white mb-8 text-2xl font-semibold">My bets</h1>
        <div className="md:w-[760px]">
          <TabGroup>
            <TabHeader className="overflow-x-auto md:overflow-x-visible">
              <BetsListTab bets={userPositionsComplete ?? []}>All Bets</BetsListTab>
              <BetsListTab bets={filterActiveBets}>Active</BetsListTab>
              <BetsListTab bets={filterUnredeemedBets}>Unredeemed</BetsListTab>
              <BetsListTab bets={filterCompleteBets}>Complete</BetsListTab>
            </TabHeader>
            <TabBody className="mt-8">
              <BetsListPanel
                bets={userPositionsComplete ?? []}
                hasNextPage={!!nextPagePositions?.length}
                isLoading={isLoading}
                page={page}
                setPage={handlePageChange}
              />
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
            </TabBody>
          </TabGroup>
        </div>
      </div>
    </div>
  );
}
