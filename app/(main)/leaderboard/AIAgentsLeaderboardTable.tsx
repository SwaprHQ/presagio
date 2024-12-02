// @ts-nocheck
'use client';

import { useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/Table';
import { Button, Icon } from '@swapr/ui';
import { Skeleton, UserAvatarWithAddress } from '@/app/components';
import { Address, formatEther } from 'viem';
import { useQuery } from '@tanstack/react-query';
import {
  Market,
  Position,
  tradesCollateralAmountSpent,
  tradesOutcomeBalance,
  tradesVolume,
  UserBet,
} from '@/entities';
import {
  getAllAiAgentsBets,
  getConditionMarket,
  getMarketUserTrades,
} from '@/queries/omen';

export default function AIAgentsLeaderboardTable() {
  const [sortKey, setSortKey] = useState('profitLoss');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const { data, isLoading } = useQuery<UserBet[]>({
    queryKey: ['getAiAgentsBets'],
    queryFn: getAllAiAgentsBets,
  });

  const aggregatedUserPositionsPerAddress = data?.userPositions?.reduce((acc, item) => {
    const userId = item.user.id;
    const newUser = !acc[userId];

    if (newUser) {
      acc[userId] = {
        userId: userId,
        positions: [item.position],
      };
    } else {
      acc[userId].positions.push(item.position);
    }

    return acc;
  }, {});

  const fetchUserBets = async () => {
    const results = await Promise.all(
      Object.entries(aggregatedUserPositionsPerAddress).map(
        async ([userId, userData]) => {
          const userPositions = userData.positions;

          const userBets = await Promise.allSettled(
            userPositions.map(async (pos): Promise<UserBet | undefined> => {
              try {
                const position = new Position(pos);
                const outcomeIndex = position.getOutcomeIndex();
                const omenConditionData = await getConditionMarket({
                  id: position.conditionId,
                });
                const omenCondition = omenConditionData?.conditions[0];
                const market = new Market(omenCondition?.fixedProductMarketMakers[0]);

                if (!market) return undefined;

                const trades = await getMarketUserTrades({
                  creator: userId.toLowerCase(),
                  fpmm: market.fpmm.id,
                  outcomeIndex_in: [outcomeIndex],
                });

                const volume = parseFloat(
                  formatEther(
                    tradesVolume({
                      fpmmTrades: trades?.fpmmTrades,
                    })
                  )
                );
                return {
                  ...pos,
                  fpmm: market.fpmm,
                  condition: position.condition,
                  fpmmTrades: trades?.fpmmTrades || [],
                  volume: volume,
                };
              } catch (error) {
                console.error(error);
              }
            })
          );

          const validBets = userBets
            .filter(
              (result): result is PromiseFulfilledResult<UserBet> =>
                result.status === 'fulfilled' &&
                result.value !== undefined &&
                result.value.fpmmTrades.length > 0
            )
            .map(result => result.value);

          const totalVolume = validBets.reduce((acc, item) => {
            return acc + item.volume;
          }, 0);

          const numberOfClosedBets = validBets.reduce((acc, userPosition) => {
            const market = new Market(userPosition.fpmm);
            if (market.isClosed && market.answer !== null) return acc + 1;
            return acc;
          }, 0);

          const numberOfWonBets = validBets.reduce((acc, userPosition) => {
            const position = new Position(userPosition);
            const market = new Market(userPosition.fpmm);

            if (market.answer !== null && market.isWinner(position.getOutcomeIndex())) {
              return acc + 1;
            }

            return acc;
          }, 0);

          const successRate = ((numberOfWonBets / numberOfClosedBets) * 100).toFixed(0);

          const spentAmount = validBets.reduce((acc, userPosition) => {
            const market = new Market(userPosition.fpmm);
            if (market.answer === null) return acc;
            const amountSpentWei = tradesCollateralAmountSpent({
              fpmmTrades: userPosition.fpmmTrades,
            });

            const amountSpent = parseFloat(formatEther(amountSpentWei));
            return amountSpent + acc;
          }, 0);

          const amountWon = validBets.reduce((acc, userPosition) => {
            const position = new Position(userPosition);
            const market = new Market(userPosition.fpmm);

            if (market.answer === null || market.isLoser(position.getOutcomeIndex()))
              return acc;

            const winOutcomeBalancesInColleteralToken = tradesOutcomeBalance({
              fpmmTrades: userPosition.fpmmTrades,
            });

            return winOutcomeBalancesInColleteralToken + acc;
          }, 0);

          const profitLoss = (amountWon - spentAmount).toFixed(2);

          return {
            userId,
            userBets: validBets,
            totalVolume,
            profitLoss,
            successRate,
            numberOfBets: validBets.length,
            numberOfWonBets,
            ...userData,
          };
        }
      )
    );

    return results.reduce((acc, userData) => {
      acc[userData.userId] = userData;
      return acc;
    }, {});
  };

  const { data: aggregatedDataWithBets, isLoading: isAggregatedDataWithBetsLoading } =
    useQuery({
      queryKey: ['userBets', aggregatedUserPositionsPerAddress],
      queryFn: fetchUserBets,
      enabled: !!aggregatedUserPositionsPerAddress,
      staleTime: 60 * 60 * 1000, // 1 hour
      keepPreviousData: true,
    });

  const sortedAgentsData = useMemo(() => {
    if (!aggregatedDataWithBets) return [];

    return Object.entries(aggregatedDataWithBets).sort(([, a], [, b]) => {
      const aValue = parseFloat(a[sortKey]);
      const bValue = parseFloat(b[sortKey]);

      if (isNaN(aValue) || isNaN(bValue)) return 0;
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });
  }, [aggregatedDataWithBets, sortKey, sortOrder]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const SortableHeader = ({
    children,
    sortKey: key,
  }: {
    children: React.ReactNode;
    sortKey: string;
  }) => (
    <TableHead>
      <div className="flex justify-end">
        <Button
          variant="ghost"
          onClick={() => handleSort(key)}
          className="h-8 text-nowrap text-sm font-bold text-text-low-em"
        >
          {children}
          {key === sortKey && (
            <Icon
              name={sortOrder === 'asc' ? 'chevron-up' : 'chevron-down'}
              className="ml-2 h-4 w-4"
            />
          )}
        </Button>
      </div>
    </TableHead>
  );

  if (isLoading || isAggregatedDataWithBetsLoading) return <LoadingLeaderBoardTable />;

  return (
    <>
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
      <Table>
        <TableCaption className="text-text-low-em">
          This Leaderboard is composed by AI trading agents betting on Omen Prediction
          Markets contracts in gnosis chain.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Agent</TableHead>
            <SortableHeader sortKey="profitLoss">Profit/Loss</SortableHeader>
            <SortableHeader sortKey="numberOfWonBets">Won bets</SortableHeader>
            <SortableHeader sortKey="successRate">Success Rate</SortableHeader>
            <SortableHeader sortKey="totalVolume">Volume Traded</SortableHeader>
            <SortableHeader sortKey="numberOfBets">Total bets</SortableHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAgentsData.map(([agentId, agentData]) => (
            <TableRow key={agentId}>
              <TableCell>
                <UserAvatarWithAddress address={agentId as Address} isAIAgent={false} />
              </TableCell>
              <TableCell
                className={`text-right ${parseFloat(agentData.profitLoss) >= 0 ? 'text-text-success-main' : 'text-text-danger-main'}`}
              >
                {parseFloat(agentData.profitLoss).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </TableCell>
              <TableCell className="text-right">
                {agentData.numberOfWonBets.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">{agentData.successRate}%</TableCell>
              <TableCell className="text-right">
                {agentData.totalVolume.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </TableCell>
              <TableCell className="text-right">
                {agentData.numberOfBets.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
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

const LoadingLeaderBoardTable = () => (
  <div className="w-full space-y-12">
    <div className="hidden w-full grid-cols-1 justify-between gap-4 sm:grid-cols-2 md:grid lg:grid-cols-4">
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
    </div>
    <div className="w-full space-y-3">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  </div>
);
