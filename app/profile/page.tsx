'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { formatEther, isAddress } from 'viem';
import {
  calcSellAmountInCollateral,
  formatValueWithFixedDecimals,
  getGnosisAddressExplorerLink,
  shortenAddress,
} from '@/utils';
import { TabBody, TabGroup, TabHeader, Tag } from '@swapr/ui';
import {
  Market,
  Position,
  tradesCollateralAmountUSDSpent,
  tradesOutcomeBalance,
  tradesVolume,
  UserBets,
} from '@/entities';
import { getUser } from '@/queries/conditional-tokens';
import { getUserBets } from '@/queries/omen';
import { useQueries, useQuery } from '@tanstack/react-query';
import { fromUnixTime, format } from 'date-fns';
import {
  BetsListPanel,
  BetsListPanelProps,
  BetsListTab,
  ProfileCardBet,
} from '@/app/components';
import { cx } from 'class-variance-authority';
import Image from 'next/image';
import { getAIAgents } from '@/queries/dune';
import { getTokenUSDPrice } from '@/queries/mobula';

export default function ProfilePage() {
  const searchParams = useSearchParams();

  const address = searchParams.get('address')?.toLocaleLowerCase();

  const { data: userInfo } = useQuery({
    queryKey: ['getUser', address],
    queryFn: async () => {
      if (!address) return;
      return getUser({ id: address });
    },
    enabled: !!address,
  });

  const { data: userPositions, isLoading } = useQuery<UserBets[]>({
    queryKey: ['getUserBets', address],
    queryFn: async () => await getUserBets(address),
    enabled: !!address,
  });

  const { data: tokenPrices, isLoading: isLoadingTokenPrices } = useQueries({
    queries: (userPositions || []).map(userPosition => {
      const { collateralTokenAddress } = userPosition.position;
      return {
        queryKey: ['tokenPriceUSD', collateralTokenAddress],
        queryFn: async () => ({
          [collateralTokenAddress]: await getTokenUSDPrice(collateralTokenAddress),
        }),
        staleTime: Infinity,
      };
    }),
    combine: results => {
      return {
        data: results.reduce<Record<string, number>>(
          (acc, result) => ({ ...result.data, ...acc }),
          {}
        ),
        isLoading: results.some(result => result.isPending),
      };
    },
  });

  const filterActiveBets = useMemo(
    () =>
      userPositions?.filter(
        userPosition => !userPosition.position.conditions[0].resolved
      ) ?? [],
    [userPositions]
  );

  const filterCompleteBets = useMemo(
    () =>
      userPositions?.filter(
        userPosition => userPosition.position.conditions[0].resolved
      ) ?? [],
    [userPositions]
  );

  const { data: aiAgentsList } = useQuery({
    queryKey: ['getAIAgents'],
    queryFn: getAIAgents,
    staleTime: Infinity,
  });

  const isAIAgent =
    aiAgentsList?.some(aiAgent => String(aiAgent.address).toLowerCase() === address) ??
    false;

  if (!address || !isAddress(address)) return null;

  const spentAmountInUSD = userPositions?.reduce((acc, userPosition) => {
    const market = new Market(userPosition.fpmm);

    if (market.answer === null) return acc;

    const amountSpentInUSD = tradesCollateralAmountUSDSpent({
      fpmmTrades: userPosition.fpmmTrades,
    });

    return amountSpentInUSD + acc;
  }, 0);

  const winAmountInUSD = userPositions?.reduce((acc, userPosition) => {
    const position = new Position(userPosition.position);
    const market = new Market(userPosition.fpmm);

    if (market.answer === null || market.isLoser(position.getOutcomeIndex())) return acc;
    const collateralTokenAddress = userPosition.position.collateralTokenAddress;
    const priceInUSD = tokenPrices[collateralTokenAddress];

    if (!priceInUSD) return acc;

    const winOutcomeBalancesInColleteralToken = tradesOutcomeBalance({
      fpmmTrades: userPosition.fpmmTrades,
    });

    return winOutcomeBalancesInColleteralToken * priceInUSD + acc;
  }, 0);

  const potentialWinAmountInUSD = userPositions?.reduce((acc, userPosition) => {
    const position = new Position(userPosition.position);
    const market = new Market(userPosition.fpmm);

    if (!userPosition.balance || market.answer !== null || !market.hasLiquidity)
      return acc;

    const oneShareSellPrice = calcSellAmountInCollateral(
      userPosition.balance,
      market.fpmm.outcomeTokenAmounts,
      position.getOutcomeIndex(),
      parseFloat(formatEther(market.fpmm.fee))
    );

    if (!oneShareSellPrice) return acc;

    const collateralTokenAddress = userPosition.position.collateralTokenAddress;
    const priceInUSD = tokenPrices[collateralTokenAddress];

    if (!priceInUSD) return acc;

    const priceInColleteralToken = parseFloat(formatEther(oneShareSellPrice));

    return priceInColleteralToken * priceInUSD + acc;
  }, 0);

  const totalVolumeInUSD = userPositions?.reduce(
    (acc, userPosition) =>
      tradesVolume({
        fpmmTrades: userPosition.fpmmTrades,
      }) + acc,
    0
  );

  const numberOfWonBets = userPositions?.reduce((acc, userPosition) => {
    const position = new Position(userPosition.position);
    const market = new Market(userPosition.fpmm);

    if (market.answer !== null && market.isWinner(position.getOutcomeIndex()))
      return acc + 1;

    return acc;
  }, 0);

  const numberOfClosedBets = userPositions?.reduce((acc, userPosition) => {
    const market = new Market(userPosition.fpmm);

    if (market.isClosed && market.answer !== null) return acc + 1;

    return acc;
  }, 0);

  const userFirstParticipationDate = userInfo?.user
    ? format(fromUnixTime(userInfo.user.firstParticipation), 'MMMM y')
    : null;

  const positionValue =
    potentialWinAmountInUSD !== undefined
      ? formatValueWithFixedDecimals(potentialWinAmountInUSD, 2)
      : '-';
  const volumeTraded =
    totalVolumeInUSD !== undefined
      ? formatValueWithFixedDecimals(totalVolumeInUSD, 2)
      : '-';
  const successRate =
    numberOfClosedBets !== undefined &&
    numberOfClosedBets !== 0 &&
    numberOfWonBets !== undefined
      ? ((numberOfWonBets / numberOfClosedBets) * 100).toFixed(0)
      : '-';
  const profitLoss =
    spentAmountInUSD !== undefined && winAmountInUSD !== undefined
      ? (winAmountInUSD - spentAmountInUSD).toFixed(2)
      : '-';

  const isLoadingStats = userPositions === undefined || isLoadingTokenPrices;

  return (
    <main className="mx-auto mt-12 max-w-5xl space-y-12 px-6 md:flex md:flex-col md:items-center">
      <div className="flex w-full items-center justify-between rounded-32 bg-surface-surface-bg p-6 ring-1 ring-outline-low-em">
        <div className="flex items-center space-x-4">
          <a
            href={getGnosisAddressExplorerLink(address)}
            className={cx(
              'text-2xl font-semibold text-text-high-em hover:underline',
              isAIAgent ? 'text-text-primary-main' : 'text-text-high-em'
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            {shortenAddress(address)}
          </a>
          {isAIAgent && <Image src="/ai.svg" alt="ai" width={26} height={26} />}
        </div>
        {userFirstParticipationDate && (
          <Tag
            className="w-fit rounded-100 capitalize"
            size="sm"
            colorScheme="quaternary"
          >
            Joined {userFirstParticipationDate}
          </Tag>
        )}
      </div>
      <div className="grid w-full grid-cols-1 justify-between gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Positions value"
          value={positionValue}
          symbol="usd"
          isLoading={isLoadingStats}
        />
        <StatsCard
          title="Volume traded"
          value={volumeTraded}
          symbol="usd"
          isLoading={isLoadingStats}
        />
        <StatsCard
          title="Success rate"
          value={successRate}
          symbol="%"
          isLoading={isLoadingStats}
        />
        <StatsCard
          title="Profit/loss"
          value={profitLoss}
          symbol="usd"
          isLoading={isLoadingStats}
        />
      </div>
      <TabGroup>
        <TabHeader className="w-full overflow-x-auto border-t border-outline-base-em pt-6 md:overflow-x-visible">
          <BetsListTab bets={userPositions ?? []}>All Bets</BetsListTab>
          <BetsListTab bets={filterActiveBets}>Active</BetsListTab>
          <BetsListTab bets={filterCompleteBets}>Complete</BetsListTab>
        </TabHeader>
        <TabBody className="mt-8 w-full">
          <ProfileBetsListPanel
            emptyText="No bets"
            bets={userPositions ?? []}
            isLoading={isLoading}
          />
          <ProfileBetsListPanel
            emptyText="No active bets"
            bets={filterActiveBets}
            isLoading={isLoading}
          />
          <ProfileBetsListPanel
            emptyText="No complete bets"
            bets={filterCompleteBets}
            isLoading={isLoading}
          />
        </TabBody>
      </TabGroup>
    </main>
  );
}

const ProfileBetsListPanel = (props: BetsListPanelProps) => (
  <BetsListPanel {...props} CardComponent={ProfileCardBet} />
);

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
          <div className="h-9 w-12 animate-pulse rounded-8 bg-outline-low-em" />
        ) : (
          <span className="text-text-high-em">{value}</span>
        )}
        <span className="uppercase">{symbol}</span>
      </div>
    </div>
  );
};
