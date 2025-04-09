'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { Address, formatEther, isAddress } from 'viem';
import {
  calcSellAmountInCollateral,
  formatValueWithFixedDecimals,
  getExplorerAddressUrl,
  shortenAddress,
} from '@/utils';
import { TabBody, TabGroup, TabHeader, Tag } from '@swapr/ui';
import { Market, Position, UserBet } from '@/entities';
import { getUser } from '@/queries/conditional-tokens';
import { getUserBets } from '@/queries/omen';
import { useQueries, useQuery } from '@tanstack/react-query';
import { fromUnixTime, format } from 'date-fns';
import {
  LabelWithLink,
  Avatar,
  BetsListPanel,
  BetsListPanelProps,
  BetsListTab,
  ProfileCardBet,
  StatsCard,
} from '@/app/components';
import { getAIAgents, getOmenTradeMetrics } from '@/queries/dune';
import { getTokenUSDPrice } from '@/queries/mobula';
import { useEnsName } from 'wagmi';
import { mainnetConfigForENS } from '@/providers/chain-config';
import { mainnet } from 'viem/chains';

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const address = searchParams.get('address')?.toLocaleLowerCase();

  const { data: tradeMetricsData, isLoading: isLoadingTradeMetrics } = useQuery({
    queryKey: ['getOmenTradeMetrics', address],
    queryFn: () => getOmenTradeMetrics({ pageSize: 1, filters: `address=${address}` }),
    staleTime: Infinity,
  });

  const tradeMetrics = tradeMetricsData?.data[0];

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

  const getIsAIAgent = useMemo(() => {
    return (address: string) => {
      if (!aiAgentsList?.length) return undefined;

      return aiAgentsList.find(
        aiAgent => String(aiAgent.address).toLowerCase() === address.toLowerCase()
      );
    };
  }, [aiAgentsList]);

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

  if (!address || !isAddress(address)) return null;

  const userFirstParticipationDate = userInfo?.user
    ? format(fromUnixTime(userInfo.user.firstParticipation), 'MMMM y')
    : null;

  const positionValue =
    potentialWinAmountInUSD !== undefined
      ? formatValueWithFixedDecimals(potentialWinAmountInUSD, 2)
      : '-';

  const isLoadingStats = userPositions === undefined || isLoadingTokenPrices;
  const aiAgent = getIsAIAgent(address);

  return (
    <main className="mx-auto mt-12 max-w-5xl space-y-12 px-6 md:flex md:flex-col md:items-center">
      <div className="flex w-full flex-col justify-between space-y-4 rounded-32 bg-neutral-inverse-white-alpha-4 p-6 ring-1 ring-outline-low-em md:flex-row md:items-center md:space-y-0">
        <div className="flex items-center space-x-4">
          <Avatar address={address} className="size-14" />
          <div>
            <LabelWithLink
              href={getExplorerAddressUrl(address)}
              address={address}
              aiAgent={aiAgent}
              className="text-xl font-semibold md:text-2xl"
              iconSize={24}
              target="_blank"
            />
            {ensName && <p className="text-text-low-em">{shortenAddress(address)}</p>}
          </div>
        </div>
        {userFirstParticipationDate && (
          <Tag className="capitalize" size="sm" colorScheme="light">
            Joined {userFirstParticipationDate}
          </Tag>
        )}
      </div>
      <div className="grid w-full grid-cols-1 justify-between gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Profit/loss"
          value={tradeMetrics?.profit_loss?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
          symbol="usd"
          isLoading={isLoadingTradeMetrics}
        />
        <StatsCard
          title="Volume traded"
          value={tradeMetrics?.total_volume.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
          symbol="usd"
          isLoading={isLoadingTradeMetrics}
        />
        <StatsCard
          title="Success rate"
          value={tradeMetrics?.success_rate?.toString()}
          symbol="%"
          isLoading={isLoadingTradeMetrics}
        />
        <StatsCard
          title="Positions value"
          value={positionValue}
          symbol="usd"
          isLoading={isLoadingStats}
        />
      </div>
      <TabGroup className="w-full">
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
