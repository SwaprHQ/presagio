'use client';

import { OutcomeBar, UserBets, MarketThumbnail, Skeleton } from '@/app/components';
import { useQuery } from '@tanstack/react-query';
import { getMarket } from '@/queries/omen';
import { IconButton, Tag, ToggleGroup, ToggleGroupOption } from '@swapr/ui';
import { remainingTime } from '@/utils/dates';
import { Address } from 'viem';
import { Market } from '@/entities';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { HistorySection } from './HistorySection';
import { News } from './News';
import { Info } from './Info';
import { Bet } from './Bet';
import { ModalId, useModal } from '@/context';
import { EmbedMarketModal } from '@/app/components/EmbedMarketModal';

interface MarketDetailsProps {
  id: Address;
}

enum Tabs {
  BET = 'bet',
  HISTORY = 'history',
  NEWS = 'news',
  INFO = 'info',
}

export const MarketDetails = ({ id }: MarketDetailsProps) => {
  const [tab, setTab] = useState<Tabs>(Tabs.BET);
  const { openModal } = useModal();
  const { data, error, isLoading } = useQuery({
    queryKey: ['getMarket', id],
    queryFn: async () => getMarket({ id }),
  });

  if (error) throw error;
  if (isLoading || !data?.fixedProductMarketMaker) return <LoadingMarketDetails />;

  const fixedProductMarketMaker = data.fixedProductMarketMaker;
  const marketModel = new Market(fixedProductMarketMaker);
  const closingDate = new Date(+fixedProductMarketMaker.openingTimestamp * 1000);

  return (
    <>
      <div className="w-full">
        <div className="mx-auto max-w-[464px] space-y-4">
          <div className="flex items-center justify-between">
            <BackButton />
            <IconButton
              name="link"
              variant="pastel"
              size="sm"
              onClick={() => openModal(ModalId.EMBED_MARKET)}
            />
          </div>
          <div className="w-full rounded-16 border border-outline-base-em bg-surface-surface-0">
            <div className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <Tag className="w-fit capitalize" size="sm" colorScheme="quaternary">
                  {fixedProductMarketMaker.category}
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
                  marketId={fixedProductMarketMaker.id}
                />
                <h1 className="text-xl font-semibold">{fixedProductMarketMaker.title}</h1>
              </div>
              <div className="!mt-7">
                <OutcomeBar market={fixedProductMarketMaker} />
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
            {tab === Tabs.BET && (
              <div className="p-2">
                <Bet fixedProductMarketMaker={fixedProductMarketMaker} />
              </div>
            )}
            {tab === Tabs.HISTORY && <HistorySection id={id} />}
            {tab === Tabs.NEWS && (
              <div className="mx-4 my-2 flex flex-col divide-y divide-outline-low-em">
                <News id={id} />
              </div>
            )}
            {tab === Tabs.INFO && (
              <div className="mx-4 my-2 flex flex-col divide-y divide-outline-low-em">
                <Info fixedProductMarketMaker={fixedProductMarketMaker} />
              </div>
            )}
          </div>
          <UserBets fixedProductMarketMaker={fixedProductMarketMaker} />
        </div>
      </div>
      <EmbedMarketModal fixedProductMarketMaker={fixedProductMarketMaker} id={id} />
    </>
  );
};

const LoadingMarketDetails = () => (
  <div className="flex w-full flex-col items-center space-y-4">
    <div className="flex w-full max-w-[464px] items-start">
      <Skeleton className="h-8 w-8 rounded-12" />
    </div>
    <div className="w-full max-w-[464px] rounded-16 border border-outline-base-em bg-surface-surface-0">
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="flex space-x-4">
          <Skeleton className="size-20 flex-shrink-0" />
          <Skeleton className="h-28 w-full" />
        </div>
        <Skeleton className="!mt-4 h-6 w-full" />
      </div>
      <div className="w-full px-4 pb-2">
        <Skeleton className="h-12 w-full" />
      </div>
      <div className="h-32 w-full p-2">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="h-28 w-full p-2">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="h-14 w-full p-2">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="h-16 w-full p-2">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  </div>
);

const BackButton = () => {
  const { back } = useRouter();

  return (
    <IconButton
      className="text-text-med-em hover:bg-surface-surface-4"
      name="arrow-left"
      variant="pastel"
      size="sm"
      onClick={back}
    />
  );
};
