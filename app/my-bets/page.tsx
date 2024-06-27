'use client';

import { CardBet, LoadingCardBet } from '@/app/components/CardBet';
import NoBetsPage from '@/app/my-bets/NoBetsPage';
import NoWalletConnectedPage from '@/app/my-bets/NoWalletConnectedPage';
import { Market, Position, tradesOutcomeBalance } from '@/entities';

import { getUserPositions } from '@/queries/conditional-tokens';
import { UserPosition } from '@/queries/conditional-tokens/types';
import { getConditionMarket, getMarketUserTrades } from '@/queries/omen';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { PropsWithChildren, ReactNode, useCallback, useEffect, useState } from 'react';
import { TabBody, TabGroup, TabHeader, TabPanel, TabStyled } from '@swapr/ui';
import { useAccount } from 'wagmi';

export default function MyBetsPage() {
  const { address } = useAccount();
  const [unredeemedBets, setUnredeemedBets] = useState<UserPosition[]>([]);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['getUserPositions', address],
    queryFn: () => getUserPositions({ id: address?.toLowerCase() as string }),
    enabled: !!address,
  });

  const userPositions = data?.userPositions ?? [];

  const filterActiveBets = userPositions.filter(
    position => position.position.conditions[0].resolved === false
  );
  const filterCompleteBets = userPositions.filter(
    position => position.position.conditions[0].resolved
  );

  const fetchUnredeemedBets = useCallback(async () => {
    const results = await Promise.all(
      filterCompleteBets.map(async userPosition => {
        const position = new Position(userPosition.position);
        const outcomeIndex = position.outcomeIndex - 1;

        try {
          const conditionData = await queryClient.fetchQuery({
            queryKey: ['getConditionMarket', position.conditionId],
            queryFn: () => getConditionMarket({ id: position.conditionId }),
          });
          const condition = conditionData?.conditions[0];
          const market = condition && new Market(condition?.fixedProductMarketMakers[0]);

          const userTrades = await queryClient.fetchQuery({
            queryKey: ['getMarketUserTrades', address, market?.data.id, outcomeIndex],
            queryFn: () => {
              if (!!address && !!market)
                return getMarketUserTrades({
                  creator: address.toLowerCase(),
                  fpmm: market.data.id,
                  outcomeIndex_in: [outcomeIndex],
                });
            },
          });

          const outcomeBalance = tradesOutcomeBalance({
            fpmmTrades: userTrades?.fpmmTrades,
          });

          const userPositionCondition = userPosition.position.conditions[0];

          const isClaimed = !outcomeBalance;
          const isWinner = market.isWinner(outcomeIndex);

          const isResolved = userPositionCondition.resolved;
          const hasPayoutDenominator = +userPositionCondition.payoutDenominator > 0;

          const canClaim = isWinner && isResolved && !isClaimed && hasPayoutDenominator;

          if (canClaim) return userPosition;
        } catch (error) {
          console.error(error);
        }
      })
    );

    const filteredResults: UserPosition[] = results.filter(
      (result): result is UserPosition => result !== undefined
    );
    setUnredeemedBets(filteredResults);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPositions]);

  useEffect(() => {
    if (!address || !filterCompleteBets.length) return;

    fetchUnredeemedBets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPositions]);

  if (!address) return <NoWalletConnectedPage />;
  if (data && data.userPositions.length === 0) return <NoBetsPage />;

  return (
    <div className="mt-12 w-full space-y-12 px-6 md:flex md:flex-col md:items-center">
      <div>
        <h1 className="text-white mb-8 text-2xl font-semibold">My bets</h1>
        <div className="md:w-[760px]">
          <TabGroup>
            <TabHeader className="overflow-x-auto md:overflow-x-visible">
              <BetsListTab bets={userPositions}>All Bets</BetsListTab>
              <BetsListTab bets={filterActiveBets}>Active</BetsListTab>
              <BetsListTab bets={unredeemedBets}>Unredeemed</BetsListTab>
              <BetsListTab bets={filterCompleteBets}>Complete</BetsListTab>
            </TabHeader>
            <TabBody className="mt-8">
              <BetsListPanel bets={userPositions} isLoading={isLoading} />
              <BetsListPanel
                emptyText="No active bets"
                bets={filterActiveBets}
                isLoading={isLoading}
              />
              <BetsListPanel
                emptyText="No unredeemed bets"
                bets={unredeemedBets}
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
        <div className="space-y-4 rounded-12 bg-surface-surface-2 p-6">
          <p>{emptyText}</p>
        </div>
      )}
    </TabPanel>
  );
};
