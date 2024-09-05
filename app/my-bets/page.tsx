'use client';

import NoBetsPage from '@/app/my-bets/NoBetsPage';
import NoWalletConnectedPage from '@/app/my-bets/NoWalletConnectedPage';
import { MarketCondition, Position } from '@/entities';

import { Condition, UserPosition } from '@/queries/conditional-tokens/types';
import {
  FixedProductMarketMaker,
  FpmmTrade,
  getUserPositionsComplete,
} from '@/queries/omen';
import { useQuery } from '@tanstack/react-query';

import { useMemo } from 'react';
import { TabBody, TabGroup, TabHeader } from '@swapr/ui';
import { useAccount } from 'wagmi';
import { BetsListPanel, BetsListTab } from '@/app/components';
export interface UserPositionComplete extends UserPosition {
  fpmmTrades: FpmmTrade[];
  fpmm: FixedProductMarketMaker;
  condition: Condition;
}

export default function MyBetsPage() {
  const { address } = useAccount();

  const { data: userPositionsComplete, isLoading } = useQuery<UserPositionComplete[]>({
    queryKey: ['getUserPositionsComplete', address],
    queryFn: async () => await getUserPositionsComplete(address),
    enabled: !!address,
  });

  const filterActiveBets = useMemo(
    () =>
      userPositionsComplete?.filter(
        userPosition => !userPosition.position.conditions[0].resolved
      ) ?? [],
    [userPositionsComplete]
  );

  const filterCompleteBets = useMemo(
    () =>
      userPositionsComplete?.filter(
        userPosition => userPosition.position.conditions[0].resolved
      ) ?? [],
    [userPositionsComplete]
  );

  const filterUnredeemedBets = useMemo(
    () =>
      userPositionsComplete?.filter(userPosition => {
        const position = new Position(userPosition.position);
        const outcomeIndex = position.getOutcomeIndex();
        const marketCondition = new MarketCondition(
          userPosition.fpmm,
          position.condition
        );
        const canRedeem = marketCondition.canRedeem(outcomeIndex, userPosition.balance);
        return canRedeem;
      }) ?? [],
    [userPositionsComplete]
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
              <BetsListTab bets={userPositionsComplete ?? []}>All Bets</BetsListTab>
              <BetsListTab bets={filterActiveBets}>Active</BetsListTab>
              <BetsListTab bets={filterUnredeemedBets}>Unredeemed</BetsListTab>
              <BetsListTab bets={filterCompleteBets}>Complete</BetsListTab>
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
            </TabBody>
          </TabGroup>
        </div>
      </div>
    </div>
  );
}
