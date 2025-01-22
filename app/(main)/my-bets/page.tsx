'use client';

import NoBetsPage from '@/app/(main)/my-bets/NoBetsPage';
import NoWalletConnectedPage from '@/app/(main)/my-bets/NoWalletConnectedPage';
import { UserBet, UserBetsManager } from '@/entities';

import { getUserBets } from '@/queries/omen';
import { useQuery } from '@tanstack/react-query';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { TabBody, TabGroup, TabHeader } from '@swapr/ui';
import { useAccount } from 'wagmi';
import { BetsListPanel, BetsListTab, ItemsPerPage } from '@/app/components';
import { useRouter } from 'next/navigation';

const DEFAULT_ITEMS_PER_PAGE = 25;
const itemsPerPageOptions = [10, DEFAULT_ITEMS_PER_PAGE, 50, 100];

export default function MyBetsPage() {
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [isPageItemsPopoverOpen, setIsPageItemsPopoverOpen] = useState(false);
  const { address } = useAccount();
  const router = useRouter();

  const searchParams = useMemo(
    () =>
      typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams('/profile'),
    []
  );

  const pageParam = Number(searchParams.get('page')?.toLocaleLowerCase() || '1');

  const [page, setPage] = useState(pageParam);

  const { data: userPositionsComplete, isLoading } = useQuery<UserBet[]>({
    queryKey: ['getUserBets', address, itemsPerPage, page],
    queryFn: async () => await getUserBets({ address, itemsPerPage, page }),
    enabled: !!address,
  });

  const { data: nextPagePositions } = useQuery<UserBet[]>({
    queryKey: ['getUserBetsNextPage', address, itemsPerPage, page],
    queryFn: async () =>
      await getUserBets({
        address,
        itemsPerPage,
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

  const handlePageChange = useCallback(
    (newPage: number) => {
      searchParams.set('page', newPage.toString());
      setPage(newPage);

      router.replace(`/profile?${searchParams.toString()}`);
    },
    [router, searchParams]
  );

  useEffect(() => {
    setPage(pageParam);
  }, [pageParam]);

  useEffect(() => {
    if (page !== 1 && !isLoading && !userPositionsComplete?.length) handlePageChange(1);
  }, [handlePageChange, isLoading, page, userPositionsComplete?.length]);

  if (!address) return <NoWalletConnectedPage />;
  if (!isLoading && userPositionsComplete?.length === 0) return <NoBetsPage />;

  return (
    <div className="mt-12 w-full space-y-12 px-6 md:flex md:flex-col md:items-center">
      <div>
        <h1 className="text-white mb-8 text-2xl font-semibold">My bets</h1>
        <div className="md:w-[760px]">
          <TabGroup>
            <TabHeader className="justify-between overflow-x-auto md:overflow-x-visible">
              <div className="flex gap-2">
                <BetsListTab bets={userPositionsComplete ?? []}>All Bets</BetsListTab>
                <BetsListTab bets={filterActiveBets}>Active</BetsListTab>
                <BetsListTab bets={filterUnredeemedBets}>Unredeemed</BetsListTab>
                <BetsListTab bets={filterCompleteBets}>Complete</BetsListTab>
              </div>
              <ItemsPerPage
                isOpen={isPageItemsPopoverOpen}
                label="Bets per page"
                onChange={setItemsPerPage}
                onOpenChange={setIsPageItemsPopoverOpen}
                options={itemsPerPageOptions}
                value={itemsPerPage}
              />
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
