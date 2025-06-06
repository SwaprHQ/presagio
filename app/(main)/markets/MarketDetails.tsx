'use client';

import {
  OutcomeBar,
  UserTrades,
  MarketThumbnail,
  Skeleton,
  TokenLogo,
  IconTooltip,
} from '@/app/components';
import { trackEvent } from 'fathom-client';
import { useQuery } from '@tanstack/react-query';
import { getMarket } from '@/queries/omen';
import { marketHasDangerousKeyword } from '@/queries/omen/dangerousKeywords';
import { IconButton, Tag, ToggleGroup, ToggleGroupOption } from '@swapr/ui';
import { remainingTime } from '@/utils/dates';
import { Address } from 'viem';
import { Market } from '@/entities';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { HistorySection } from './HistorySection';
import { News } from './News';
import { Info } from './Info';
import { Bet } from './Bet';
import { FA_EVENTS } from '@/analytics';
import { ModalId, useModal } from '@/context';
import { EmbedMarketModal } from '@/app/components/EmbedMarketModal';
import { formatValueWithFixedDecimals } from '@/utils';
import { MarketNotFound } from './MarketNotFound';
import { Liquidity } from './Liquidity';
import { UserLiquidity } from './UserLiquidity';
import { getQuestionValidity } from '@/queries/gnosis-ai';
import { AiChatMarket } from './AiChatMarket';

interface MarketDetailsProps {
  id: Address;
}

enum Tabs {
  BET = 'bet',
  HISTORY = 'history',
  LIQUIDITY = 'liquidity',
  NEWS = 'news',
  INFO = 'info',
}

export const MarketDetails = ({ id }: MarketDetailsProps) => {
  const [tab, setTab] = useState<Tabs>(Tabs.BET);
  const { openModal } = useModal();
  const searchParams = useSearchParams();
  const chatOpen = searchParams.get('chatOpen') === 'true';

  const { data, error, isLoading } = useQuery({
    queryKey: ['getMarket', id],
    queryFn: async () => getMarket({ id }),
  });
  const { data: questionValidity } = useQuery({
    queryKey: ['getQuestionValidity', id],
    queryFn: () => getQuestionValidity(data?.fixedProductMarketMaker?.title || ''),
    enabled: Boolean(data?.fixedProductMarketMaker?.title),
  });

  const isMarketInvalid = useMemo(
    () => questionValidity?.invalid,
    [questionValidity?.invalid]
  );

  if (error) throw error;
  if (isLoading) return <LoadingMarketDetails />;
  if (!data?.fixedProductMarketMaker) return <MarketNotFound />;

  const fixedProductMarketMaker = data.fixedProductMarketMaker;
  const marketModel = new Market(fixedProductMarketMaker);
  const closingDate = new Date(+fixedProductMarketMaker.openingTimestamp * 1000);
  const titleHasDangerousWords = marketHasDangerousKeyword(fixedProductMarketMaker);

  return (
    <>
      <div className="w-full">
        <div className="mx-auto max-w-[464px] space-y-4">
          <div className="flex items-center justify-between">
            <BackButton />
            <IconButton
              name="code"
              variant="secondary"
              size="xs"
              onClick={() => {
                trackEvent(FA_EVENTS.MARKETS.DETAILS.EMBED.ID);
                openModal(ModalId.EMBED_MARKET);
              }}
            />
          </div>
          <div className="w-full rounded-16 border border-outline-base-em bg-surface-surface-0">
            <div className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <a href={`/?c=${fixedProductMarketMaker.category?.toLocaleLowerCase()}`}>
                  <Tag className="w-fit capitalize" size="xs" colorScheme="secondary">
                    {fixedProductMarketMaker.category}
                  </Tag>
                </a>
                <div className="flex items-center gap-2">
                  {titleHasDangerousWords && (
                    <IconTooltip iconName="warning">
                      <p>This market may be inappropriate to bet on.</p>
                      <p>
                        We <strong>do not endorse or control</strong> the creation of
                        these markets.
                      </p>
                    </IconTooltip>
                  )}
                  {isMarketInvalid && (
                    <IconTooltip iconName="info">
                      <p>
                        This market{' '}
                        <strong>might have an invalid question or answer.</strong>
                      </p>
                      <p>Funds might be lost by interacting with this market.</p>
                    </IconTooltip>
                  )}
                  {marketModel.isClosed ? (
                    <Tag className="w-fit capitalize" size="sm" colorScheme="secondary">
                      Market Closed
                    </Tag>
                  ) : (
                    <p className="text-sm text-text-med-em">
                      {remainingTime(closingDate)}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex space-x-4">
                <MarketThumbnail
                  width={20}
                  height={20}
                  className="size-20 flex-shrink-0 rounded-8"
                  marketId={fixedProductMarketMaker.id}
                />
                <h1 className="text-normal text-md font-medium">
                  {fixedProductMarketMaker.title}
                </h1>
              </div>
              <div className="!mt-7 space-y-4">
                <OutcomeBar market={fixedProductMarketMaker} />
                <div className="flex items-center justify-end space-x-8">
                  <div className="flex items-center space-x-2 text-sm font-semibold text-text-med-em">
                    <TokenLogo
                      address={fixedProductMarketMaker.collateralToken}
                      size="xs"
                      className="size-4"
                    />
                    <p className="font-mono">
                      {formatValueWithFixedDecimals(
                        fixedProductMarketMaker.scaledCollateralVolume,
                        2
                      ) ?? '-'}
                      <span title="volume"> Volume</span>
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm font-semibold text-text-med-em">
                    <TokenLogo
                      address={fixedProductMarketMaker.collateralToken}
                      size="xs"
                      className="size-4"
                    />
                    <p className="font-mono">
                      {formatValueWithFixedDecimals(
                        fixedProductMarketMaker.scaledLiquidityMeasure,
                        2
                      ) ?? '-'}
                      <span title="volume"> Liquidity</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 pb-2">
              <ToggleGroup
                value={tab}
                onChange={(value: string) => setTab(value as Tabs)}
                className="w-full justify-around overflow-auto md:w-full"
              >
                {Object.values(Tabs)
                  .filter(tab => !(tab === Tabs.LIQUIDITY && marketModel.isClosed))
                  .map(tab => (
                    <div className="w-full" key={tab}>
                      <ToggleGroupOption
                        size="md"
                        value={tab}
                        className="flex justify-center font-semibold capitalize"
                        onClick={() =>
                          trackEvent(FA_EVENTS.MARKETS.DETAILS.TABS.NAME(tab))
                        }
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
                <News fixedProductMarketMaker={fixedProductMarketMaker} />
              </div>
            )}
            {tab === Tabs.INFO && (
              <div className="mx-4 my-2 flex flex-col divide-y divide-outline-low-em">
                <Info fixedProductMarketMaker={fixedProductMarketMaker} />
              </div>
            )}
            {tab === Tabs.LIQUIDITY && !marketModel.isClosed && (
              <div className="mx-4 my-2 flex flex-col divide-y divide-outline-low-em">
                <Liquidity id={id} />
              </div>
            )}
          </div>
          <UserTrades fixedProductMarketMaker={fixedProductMarketMaker} />
          <UserLiquidity id={id} />
        </div>
      </div>
      <EmbedMarketModal id={id} />
      <AiChatMarket id={id} isChatOpen={chatOpen} />
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
  const { back, push } = useRouter();

  return (
    <IconButton
      name="arrow-left"
      variant="secondary"
      size="xs"
      onClick={() => {
        const hasPreviousPage = window.history.length > 2;

        hasPreviousPage ? back() : push('/');
      }}
    />
  );
};
