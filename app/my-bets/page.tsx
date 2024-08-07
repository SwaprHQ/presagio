'use client';

import { CardBet, LoadingCardBet } from '@/app/components/CardBet';
import NoBetsPage from '@/app/my-bets/NoBetsPage';
import NoWalletConnectedPage from '@/app/my-bets/NoWalletConnectedPage';
import { Market, Position, tradesOutcomeBalance } from '@/entities';

import { getUserPositions } from '@/queries/conditional-tokens';
import { UserPosition } from '@/queries/conditional-tokens/types';
import {
  Condition,
  FixedProductMarketMaker,
  FpmmTrade,
  getConditionMarket,
  getMarketUserTrades,
} from '@/queries/omen';
import { useQuery, useQueries } from '@tanstack/react-query';

import { PropsWithChildren, ReactNode, useEffect, useMemo, useState } from 'react';
import { TabBody, TabGroup, TabHeader, TabPanel, TabStyled } from '@swapr/ui';
import { useAccount } from 'wagmi';

interface UserPositionAll extends UserPosition {
  fpmmTrades: FpmmTrade[];
  market: FixedProductMarketMaker;
  condition: Condition;
}

export default function MyBetsPage() {
  const { address } = useAccount();
  const [userPositionsAllData, setUserPositionsAllData] = useState<UserPositionAll[]>([]);

  const { data: userPositionsData, isLoading: isUserPositionsLoading } = useQuery({
    queryKey: ['getUserPositions', address],
    queryFn: () => getUserPositions({ id: address?.toLowerCase() as string }),
    enabled: !!address,
  });

  const userPositions = useMemo(
    () => userPositionsData?.userPositions ?? [],
    [userPositionsData]
  );

  const queries = useMemo(() => {
    return userPositions.flatMap(userPosition => {
      const position = new Position(userPosition.position);
      const outcomeIndex = position.outcomeIndex - 1;

      return [
        {
          queryKey: ['getConditionMarket', position.conditionId],
          queryFn: () => getConditionMarket({ id: position.conditionId }),
        },
        {
          queryKey: ['getMarketUserTrades', address, position.conditionId, outcomeIndex],
          queryFn: async () => {
            if (!!address) {
              const conditionData = await getConditionMarket({
                id: position.conditionId,
              });
              const market = new Market(
                conditionData.conditions[0]?.fixedProductMarketMakers[0]
              );
              return getMarketUserTrades({
                creator: address.toLowerCase(),
                fpmm: market.data.id,
                outcomeIndex_in: [outcomeIndex],
              });
            }
          },
        },
      ];
    });
  }, [userPositions, address]);

  const queriesResults = useQueries({ queries });

  const isLoading =
    isUserPositionsLoading || queriesResults.some(query => query.isLoading);
  const isSuccess = queriesResults.every(query => query.isSuccess);

  useEffect(() => {
    if (isSuccess) {
      const newUserPositionsAllData = userPositions.map((userPosition, index) => {
        const conditionData = queriesResults[index * 2].data;
        const tradesData = queriesResults[index * 2 + 1].data;

        // @ts-expect-error
        const condition = conditionData?.conditions[0];
        const market = condition && new Market(condition?.fixedProductMarketMakers[0]);

        return {
          ...userPosition,
          market: market.data,
          condition,
          // @ts-expect-error
          fpmmTrades: tradesData?.fpmmTrades || [],
        } as UserPositionAll;
      });

      setUserPositionsAllData(newUserPositionsAllData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, userPositions]);

  const filterActiveBets = userPositionsAllData.filter(
    userPosition => userPosition.position.conditions[0].resolved === false
  );

  const filterCompleteBets = userPositionsAllData.filter(
    userPosition => userPosition.position.conditions[0].resolved
  );

  const filterUnredeemedBets = useMemo(() => {
    return filterCompleteBets.filter(userPosition => {
      const position = new Position(userPosition.position);
      const outcomeIndex = position.outcomeIndex - 1;

      const condition = userPosition.condition;
      const market = condition && new Market(condition?.fixedProductMarketMakers[0]);
      const outcomeBalance = tradesOutcomeBalance({
        fpmmTrades: userPosition.fpmmTrades,
      });
      const userPositionCondition = userPosition.position.conditions[0];

      const isClaimed = !outcomeBalance;
      const isWinner = market.isWinner(outcomeIndex);

      const isResolved = userPositionCondition.resolved;
      const hasPayoutDenominator = +userPositionCondition.payoutDenominator > 0;

      const canClaim = isWinner && isResolved && !isClaimed && hasPayoutDenominator;

      return canClaim;
    });
  }, [filterCompleteBets]);

  if (!address) return <NoWalletConnectedPage />;
  if (userPositionsData && userPositionsData.userPositions.length === 0)
    return <NoBetsPage />;

  const sortBetsByNewest = (bets: UserPositionAll[]) => {
    return [...bets].sort((a, b) => {
      return (
        b.fpmmTrades[b.fpmmTrades.length - 1]?.creationTimestamp -
        a.fpmmTrades[a.fpmmTrades.length - 1]?.creationTimestamp
      );
    });
  };

  const sortedAllBets = sortBetsByNewest(userPositionsAllData);
  const sortedCompleteBets = sortBetsByNewest(filterCompleteBets);
  const sortedActiveBets = sortBetsByNewest(filterActiveBets);
  const sortedUnredeemedBets = sortBetsByNewest(filterUnredeemedBets);

  return (
    <div className="mt-12 w-full space-y-12 px-6 md:flex md:flex-col md:items-center">
      <div>
        <h1 className="text-white mb-8 text-2xl font-semibold">My bets</h1>
        <div className="md:w-[760px]">
          <TabGroup>
            <TabHeader className="overflow-x-auto md:overflow-x-visible">
              <BetsListTab bets={userPositionsAllData}>All Bets</BetsListTab>
              <BetsListTab bets={filterActiveBets}>Active</BetsListTab>
              <BetsListTab bets={filterUnredeemedBets}>Unredeemed</BetsListTab>
              <BetsListTab bets={filterCompleteBets}>Complete</BetsListTab>
            </TabHeader>
            <TabBody className="mt-8">
              <BetsListPanel bets={sortedAllBets} isLoading={isLoading} />
              <BetsListPanel
                emptyText="No active bets"
                bets={sortedActiveBets}
                isLoading={isLoading}
              />
              <BetsListPanel
                emptyText="No unredeemed bets"
                bets={sortedUnredeemedBets}
                isLoading={isLoading}
              />
              <BetsListPanel
                emptyText="No complete bets"
                bets={sortedCompleteBets}
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
  bets: UserPosition[];
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
        bets.map((position: UserPosition) => (
          <CardBet userPosition={position} key={position.id} />
        ))}
      {!isLoading && !bets.length && (
        <div className="space-y-4 rounded-12 border border-surface-surface-2 p-6">
          <p>{emptyText}</p>
        </div>
      )}
    </TabPanel>
  );
};
