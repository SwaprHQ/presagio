'use client';

import { CardBet, LoadingCardBet } from '@/app/components/CardBet';
import NoBetsPage from '@/app/my-bets/NoBetsPage';
import NoWalletConnectedPage from '@/app/my-bets/NoWalletConnectedPage';
import { Market, MarketCondition, Position } from '@/entities';

import { getUserPositions } from '@/queries/conditional-tokens';
import { UserPosition, Condition } from '@/queries/conditional-tokens/types';
import {
  FixedProductMarketMaker,
  FpmmTrade,
  getConditionMarket,
  getMarketUserTrades,
} from '@/queries/omen';
import { useQuery } from '@tanstack/react-query';

import { PropsWithChildren, ReactNode, useMemo } from 'react';
import { TabBody, TabGroup, TabHeader, TabPanel, TabStyled } from '@swapr/ui';
import { useAccount } from 'wagmi';

export interface UserPositionComplete extends UserPosition {
  fpmmTrades: FpmmTrade[];
  fpmm: FixedProductMarketMaker;
  condition: Condition;
}

const sortByNewestBet = (a: UserPositionComplete, b: UserPositionComplete) => {
  return (
    b.fpmmTrades[b.fpmmTrades.length - 1]?.creationTimestamp -
    a.fpmmTrades[a.fpmmTrades.length - 1]?.creationTimestamp
  );
};

export default function MyBetsPage() {
  const { address } = useAccount();

  const { data: userPositionsComplete, isLoading } = useQuery<UserPositionComplete[]>({
    queryKey: ['getUserPositionsComplete', address],
    queryFn: async () => {
      if (!address) return [];

      const userPositionsData = await getUserPositions({ id: address.toLowerCase() });
      const userPositions = userPositionsData?.userPositions ?? [];

      const userPositionsComplete = await Promise.allSettled(
        userPositions.map(
          async (userPosition): Promise<UserPositionComplete | undefined> => {
            try {
              const position = new Position(userPosition.position);
              const outcomeIndex = position.outcomeIndex - 1;

              const omenConditionData = await getConditionMarket({
                id: position.conditionId,
              });
              const omenCondition = omenConditionData?.conditions[0];
              const market = new Market(omenCondition?.fixedProductMarketMakers[0]);

              if (!market) return undefined;

              const tradesData = await getMarketUserTrades({
                creator: address.toLowerCase(),
                fpmm: market.fpmm.id,
                outcomeIndex_in: [outcomeIndex],
              });

              return {
                ...userPosition,
                fpmm: market.fpmm,
                condition: position.condition as Condition,
                fpmmTrades: tradesData?.fpmmTrades || [],
              };
            } catch (error) {
              console.error(error);
            }
          }
        )
      ).then(results =>
        results
          .filter(
            (result): result is PromiseFulfilledResult<UserPositionComplete> =>
              result.status === 'fulfilled' && result.value !== undefined
          )
          .map(result => result.value)
          .sort(sortByNewestBet)
      );

      return userPositionsComplete;
    },
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
const BetsListTabCounter = ({ children }: PropsWithChildren) => (
  <div className="ml-2 rounded-6 border border-outline-low-em bg-surface-surface-0 p-1 px-1.5 text-2xs">
    {children}
  </div>
);

const LoadingBets = () =>
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(index => <LoadingCardBet key={index} />);

interface BetsListPanelProps {
  emptyText?: string;
  bets: UserPositionComplete[];
  isLoading: boolean;
  unredeemed?: boolean;
}

interface BetsListTabProps {
  children: ReactNode;
  bets: UserPosition[];
}

const BetsListTab = ({ children, bets }: BetsListTabProps) => {
  const counter = bets?.length ?? '-';
  return (
    <TabStyled>
      {children}
      <BetsListTabCounter>{counter}</BetsListTabCounter>
    </TabStyled>
  );
};

const BetsListPanel = ({ emptyText = '', bets, isLoading }: BetsListPanelProps) => {
  return (
    <TabPanel className="space-y-4">
      {isLoading && <LoadingBets />}
      {!isLoading &&
        bets.length > 0 &&
        bets.map((userPositionComplete: UserPositionComplete) => (
          <CardBet
            userPositionComplete={userPositionComplete}
            key={userPositionComplete.id}
          />
        ))}
      {!isLoading && !bets.length && (
        <div className="space-y-4 rounded-12 border border-surface-surface-2 p-6">
          <p>{emptyText}</p>
        </div>
      )}
    </TabPanel>
  );
};
