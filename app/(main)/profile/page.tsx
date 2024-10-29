'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { Address, formatEther, isAddress } from 'viem';
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
  tradesCollateralAmountSpent,
  tradesOutcomeBalance,
  tradesVolume,
  UserBet,
} from '@/entities';
import { getUser } from '@/queries/conditional-tokens';
import { getUserBets } from '@/queries/omen';
import { useQueries, useQuery } from '@tanstack/react-query';
import { fromUnixTime, format } from 'date-fns';
import {
  AddressLink,
  Avatar,
  BetsListPanel,
  BetsListPanelProps,
  BetsListTab,
  ProfileCardBet,
  Skeleton,
} from '@/app/components';
import { getAIAgents } from '@/queries/dune';
import { getTokenUSDPrice } from '@/queries/mobula';
import { useEnsName } from 'wagmi';
import { mainnetConfigForENS } from '@/providers/chain-config';
import { mainnet } from 'viem/chains';

export default function ProfilePage() {
  const searchParams = useSearchParams();

  const address = searchParams.get('address')?.toLocaleLowerCase();

  const { data: ensName } = useEnsName({
    address: address as Address,
    chainId: mainnet.id,
    config: mainnetConfigForENS,
  });

  const { data: userInfo } = useQuery({
    queryKey: ['getUser', address],
    queryFn: async () => {
      if (!address) return;
      return getUser({ id: address });
    },
    enabled: !!address,
  });

  const { data: userPositions, isLoading } = useQuery<UserBet[]>({
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

  const spentAmountInUSD = useMemo(
    () =>
      userPositions?.reduce((acc, userPosition) => {
        const market = new Market(userPosition.fpmm);

        if (market.answer === null) return acc;

        const amountSpentWei = tradesCollateralAmountSpent({
          fpmmTrades: userPosition.fpmmTrades,
        });

        const amountSpent = parseFloat(formatEther(amountSpentWei));

        const collateralTokenAddress = userPosition.position.collateralTokenAddress;
        const priceInUSD = tokenPrices[collateralTokenAddress];

        if (!priceInUSD) return acc;

        return amountSpent * priceInUSD + acc;
      }, 0),
    [tokenPrices, userPositions]
  );

  const winAmountInUSD = useMemo(
    () =>
      userPositions?.reduce((acc, userPosition) => {
        const position = new Position(userPosition.position);
        const market = new Market(userPosition.fpmm);

        if (market.answer === null || market.isLoser(position.getOutcomeIndex()))
          return acc;
        const collateralTokenAddress = userPosition.position.collateralTokenAddress;
        const priceInUSD = tokenPrices[collateralTokenAddress];

        if (!priceInUSD) return acc;

        const winOutcomeBalancesInColleteralToken = tradesOutcomeBalance({
          fpmmTrades: userPosition.fpmmTrades,
        });

        return winOutcomeBalancesInColleteralToken * priceInUSD + acc;
      }, 0),
    [tokenPrices, userPositions]
  );

  const potentialWinAmountInUSD = useMemo(
    () =>
      userPositions?.reduce((acc, userPosition) => {
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
      }, 0),
    [tokenPrices, userPositions]
  );

  const totalVolumeInUSD = useMemo(
    () =>
      userPositions?.reduce((acc, userPosition) => {
        const volumeTradedWei = tradesVolume({
          fpmmTrades: userPosition.fpmmTrades,
        });

        const volumeTraded = parseFloat(formatEther(volumeTradedWei));

        const collateralTokenAddress = userPosition.position.collateralTokenAddress;
        const priceInUSD = tokenPrices[collateralTokenAddress];

        if (!priceInUSD) return acc;

        return volumeTraded * priceInUSD + acc;
      }, 0),
    [tokenPrices, userPositions]
  );

  const numberOfWonBets = useMemo(
    () =>
      userPositions?.reduce((acc, userPosition) => {
        const position = new Position(userPosition.position);
        const market = new Market(userPosition.fpmm);

        if (market.answer !== null && market.isWinner(position.getOutcomeIndex()))
          return acc + 1;

        return acc;
      }, 0),
    [userPositions]
  );

  const numberOfClosedBets = useMemo(
    () =>
      userPositions?.reduce((acc, userPosition) => {
        const market = new Market(userPosition.fpmm);

        if (market.isClosed && market.answer !== null) return acc + 1;

        return acc;
      }, 0),
    [userPositions]
  );

  if (!address || !isAddress(address)) return null;

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
      <div className="flex w-full flex-col justify-between space-y-4 rounded-32 bg-surface-surface-bg p-6 ring-1 ring-outline-low-em md:flex-row md:items-center md:space-y-0">
        <div className="flex items-center space-x-4">
          <Avatar address={address} className="size-14" />
          <div>
            <AddressLink
              href={getGnosisAddressExplorerLink(address)}
              address={address}
              isAIAgent={isAIAgent}
              className="text-xl font-semibold md:text-2xl"
              iconSize={24}
              target="_blank"
            />
            {ensName && <p className="text-text-low-em">{shortenAddress(address)}</p>}
          </div>
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
          <Skeleton className="h-9 w-12" />
        ) : (
          <span className="text-text-high-em">{value}</span>
        )}
        <span className="uppercase">{symbol}</span>
      </div>
    </div>
  );
};
