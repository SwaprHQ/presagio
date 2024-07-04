'use client';

import { OutcomeBar, Swapbox } from '@/app/components';
import { useQuery } from '@tanstack/react-query';
import { getMarket } from '@/queries/omen';
import { Button, IconButton, Tag, ToggleGroup, ToggleGroupOption } from '@swapr/ui';
import { remainingTime } from '@/utils/dates';
import { Address } from 'viem';
import { Market } from '@/entities';
import { UserBets } from '../components/UserBets';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { HistorySection } from '@/app/markets/HistorySection';
import { MarketThumbnail } from '../components/MarketThumbnail';

interface MarketDetailsProps {
  id: Address;
}

enum Tabs {
  BET = 'bet',
  HISTORY = 'history',
}

export const MarketDetails = ({ id }: MarketDetailsProps) => {
  const [tab, setTab] = useState<Tabs>(Tabs.BET);
  const { data, error, isLoading } = useQuery({
    queryKey: ['getMarket', id],
    queryFn: async () => getMarket({ id }),
  });

  if (error) throw error;
  if (isLoading || !data?.fixedProductMarketMaker) return <LoadingMarketDetails />;

  const market = data.fixedProductMarketMaker;
  const marketModel = new Market(market);
  const closingDate = new Date(+market.openingTimestamp * 1000);

  return (
    <div className="w-full">
      <div className="mx-auto max-w-[464px] space-y-4">
        <BackButton />
        <div className="w-full rounded-16 border border-outline-base-em bg-surface-surface-0">
          <div className="space-y-4 p-5">
            <div className="flex items-center justify-between">
              <Tag className="w-fit capitalize" size="sm" colorScheme="quaternary">
                {market.category}
              </Tag>
              {marketModel.isClosed ? (
                <Tag className="w-fit capitalize" size="sm" colorScheme="quaternary">
                  Market Closed
                </Tag>
              ) : (
                <p className="text-sm text-text-med-em">{remainingTime(closingDate)}</p>
              )}
            </div>
            <div className="flex space-x-4">
              <MarketThumbnail
                width={20}
                height={20}
                className="size-20 flex-shrink-0 rounded-8"
                marketId={market.id}
              />
              <h1 className="text-xl font-semibold">{market.title}</h1>
            </div>
            <div className="!mt-7">
              <OutcomeBar market={market} />
            </div>
          </div>
          <div className="px-4 pb-2">
            <ToggleGroup
              value={tab}
              onChange={setTab}
              className="w-full justify-around md:w-full"
            >
              {Object.values(Tabs).map(tab => (
                <div className="w-full" key={tab}>
                  <ToggleGroupOption
                    size="md"
                    value={tab}
                    className="flex justify-center font-semibold capitalize"
                  >
                    {tab}
                  </ToggleGroupOption>
                </div>
              ))}
            </ToggleGroup>
          </div>
          {tab === 'bet' && (
            <div className="p-2">
              {!marketModel.isClosed ? (
                <Swapbox market={market} />
              ) : (
                <div className="p-4 text-center">Market closed</div>
              )}
            </div>
          )}
          {tab === 'history' && <HistorySection id={id} />}
        </div>
        <UserBets market={market} />
      </div>
    </div>
  );
};

const LoadingMarketDetails = () => (
  <div className="flex w-full flex-col items-center space-y-4">
    <div className="flex w-full max-w-[464px] items-start">
      <div className="h-8 w-20 animate-pulse rounded-12 bg-outline-low-em"></div>
    </div>
    <div className="w-full max-w-[464px] rounded-16 border border-outline-base-em bg-surface-surface-0">
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <div className="h-7 w-20 animate-pulse rounded-8 bg-outline-low-em" />
          <div className="h-4 w-28 animate-pulse rounded-8 bg-outline-low-em" />
        </div>
        <div className="flex space-x-4">
          <div className="size-20 flex-shrink-0 animate-pulse rounded-8 bg-outline-low-em" />
          <div className="h-28 w-full animate-pulse rounded-8 bg-outline-low-em" />
        </div>
        <div className="!mt-4 h-6 w-full animate-pulse rounded-8 bg-outline-low-em" />
      </div>
      <div className="w-full px-4 pb-2">
        <div className="h-12 w-full animate-pulse rounded-8 bg-outline-low-em" />
      </div>
      <div className="h-32 w-full p-2">
        <div className="h-full w-full animate-pulse rounded-8 bg-outline-low-em" />
      </div>
      <div className="h-28 w-full p-2">
        <div className="h-full w-full animate-pulse rounded-8 bg-outline-low-em" />
      </div>
      <div className="h-14 w-full p-2">
        <div className="h-full w-full" />
      </div>
      <div className="h-16 w-full p-2">
        <div className="h-full w-full animate-pulse rounded-8 bg-outline-low-em" />
      </div>
    </div>
  </div>
);

const BackButton = () => {
  const { back } = useRouter();

  return (
    <div
      className="flex w-fit items-center rounded-12 hover:bg-surface-surface-2"
      onClick={back}
    >
      <IconButton
        className="text-text-med-em hover:bg-surface-surface-2"
        name="arrow-left"
        variant="pastel"
        size="sm"
      />
      <Button className="font-normal text-text-low-em" variant="ghost" size="sm">
        Go back
      </Button>
    </div>
  );
};
