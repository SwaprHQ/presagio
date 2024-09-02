'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useMemo } from 'react';
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
} from '@/entities';
import { getUser } from '@/queries/conditional-tokens';
import { UserPositionComplete } from '../my-bets/page';
import { getUserPositionsComplete } from '@/queries/omen';
import { useQuery } from '@tanstack/react-query';
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

export default function ProfilePage() {
  return (
    <Suspense>
      <Profile />
    </Suspense>
  );
}

const Profile = () => {
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

  const { data: userPositions, isLoading } = useQuery<UserPositionComplete[]>({
    queryKey: ['getUserPositionsComplete', address],
    queryFn: async () => await getUserPositionsComplete(address),
    enabled: !!address,
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

  const isLoadingUserPositions = userPositions === undefined;

  const lossesInUSD = userPositions?.reduce((acc, userPosition) => {
    const market = new Market(userPosition.fpmm);

    if (market.answer === null) return acc;

    const amountSpentInUSD = tradesCollateralAmountUSDSpent({
      fpmmTrades: userPosition.fpmmTrades,
    });

    return amountSpentInUSD + acc;
  }, 0);

  const winsInUSD = userPositions?.reduce((acc, userPosition) => {
    const position = new Position(userPosition.position);
    const market = new Market(userPosition.fpmm);

    if (market.answer === null || market.isLoser(position.outcomeIndex - 1)) return acc;

    // missing usd price
    const winOutcomeBalancesInColleteralToken = tradesOutcomeBalance({
      fpmmTrades: userPosition.fpmmTrades,
    });

    return winOutcomeBalancesInColleteralToken + acc;
  }, 0);

  const potentialWinsInUSD = userPositions?.reduce((acc, userPosition) => {
    const position = new Position(userPosition.position);
    const market = new Market(userPosition.fpmm);

    if (!userPosition.balance || market.answer !== null || !market.hasLiquidity)
      return acc;

    const oneShareSellPrice = calcSellAmountInCollateral(
      userPosition.balance,
      market.fpmm.outcomeTokenAmounts,
      position.outcomeIndex - 1,
      parseFloat(formatEther(market.fpmm.fee))
    );

    if (!oneShareSellPrice) return acc;

    // missing usd price
    const priceInColleteralToken = parseFloat(formatEther(oneShareSellPrice));

    return priceInColleteralToken + acc;
  }, 0);

  const totalVolumeInUSD = userPositions?.reduce(
    (acc, userPosition) =>
      tradesVolume({
        fpmmTrades: userPosition.fpmmTrades,
      }) + acc,
    0
  );

  const numberOfWins = userPositions?.reduce((acc, userPosition) => {
    const position = new Position(userPosition.position);
    const market = new Market(userPosition.fpmm);

    if (market.answer !== null && market.isWinner(position.outcomeIndex - 1))
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
    potentialWinsInUSD !== undefined
      ? formatValueWithFixedDecimals(potentialWinsInUSD, 2)
      : '-';
  const volumeTraded =
    totalVolumeInUSD !== undefined
      ? formatValueWithFixedDecimals(totalVolumeInUSD, 2)
      : '-';
  const succesRate =
    numberOfClosedBets !== undefined &&
    numberOfClosedBets !== 0 &&
    numberOfWins !== undefined
      ? ((numberOfWins / numberOfClosedBets) * 100).toFixed(0)
      : '-';
  const profitLoss =
    lossesInUSD !== undefined && winsInUSD !== undefined
      ? (winsInUSD - lossesInUSD).toFixed(2)
      : '-';

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
          isLoading={isLoadingUserPositions}
        />
        <StatsCard
          title="Volume traded"
          value={volumeTraded}
          symbol="usd"
          isLoading={isLoadingUserPositions}
        />
        <StatsCard
          title="Success rate"
          value={succesRate}
          symbol="%"
          isLoading={isLoadingUserPositions}
        />
        <StatsCard
          title="Profit/loss"
          value={profitLoss}
          symbol="usd"
          isLoading={isLoadingUserPositions}
        />
      </div>
      <TabGroup>
        <TabHeader className="w-full overflow-x-auto md:overflow-x-visible">
          <BetsListTab bets={userPositions ?? []}>All Bets</BetsListTab>
          <BetsListTab bets={filterActiveBets}>Active</BetsListTab>
          <BetsListTab bets={filterCompleteBets}>Complete</BetsListTab>
        </TabHeader>
        <TabBody className="mt-8 w-full">
          <ProfileBetsListPanel bets={userPositions ?? []} isLoading={isLoading} />
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
};

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
  if (isLoading) return <StatsCardLoading />;

  return (
    <div className="w-full space-y-2 rounded-16 bg-surface-surface-0 p-6 font-semibold text-text-low-em ring-1 ring-outline-base-em">
      <div className="text-xs font-bold uppercase">{title}</div>
      <div className="text-2xl">
        <span className="text-text-high-em">{value}</span>{' '}
        <span className="uppercase">{symbol}</span>
      </div>
    </div>
  );
};

const StatsCardLoading = () => (
  <div className="w-full space-y-2 rounded-16 bg-surface-surface-0 p-6 font-semibold text-text-low-em ring-1 ring-outline-base-em">
    <div className="h-3 w-20 animate-pulse rounded-8 bg-outline-low-em" />
    <div className="flex space-x-2">
      <div className="h-9 w-28 animate-pulse rounded-8 bg-outline-low-em" />
      <div className="h-9 w-10 animate-pulse rounded-8 bg-outline-low-em" />
    </div>
  </div>
);
