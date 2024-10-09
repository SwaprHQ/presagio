'use client';

import { useQueries } from '@tanstack/react-query';
import Link from 'next/link';
import { FixedProductMarketMaker, getMarket } from '@/queries/omen';
import { OutcomeBar, TokenLogo } from '@/app/components';
import { formatEtherWithFixedDecimals, remainingTime } from '@/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselSelector,
} from './components/Carousel';
import Autoplay from 'embla-carousel-autoplay';
import { highlightedMarketsList } from '@/market-highlight.config';
import defaultHighlightImage from '@/public/assets/highlights/default.png';
import Image from 'next/image';
import { useState } from 'react';

export const MarketsHighlight = () => {
  const { data: markets, isLoading } = useQueries({
    queries: Object.keys(highlightedMarketsList).map(id => ({
      queryKey: ['getMarket', id],
      queryFn: async () => getMarket({ id }),
    })),
    combine: results => {
      return {
        data: results
          .map(result => result.data?.fixedProductMarketMaker)
          .filter((market): market is FixedProductMarketMaker => !!market),
        isLoading: results.some(result => result.isPending),
      };
    },
  });

  if (markets.length === 0 || isLoading) return null;

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 10000,
        }),
      ]}
      opts={{ loop: true }}
      className="group relative mb-6 w-full"
    >
      <CarouselSelector className="absolute bottom-0 left-0 right-0 z-50 mx-auto mb-6" />
      <div className="absolute bottom-0 right-0 z-50 mb-4 mr-6 flex space-x-2 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
        <CarouselPrevious />
        <CarouselNext />
      </div>
      <CarouselContent className="pb-2">
        {markets.map(market => (
          <HighlightCarouselItem key={market.id} market={market} />
        ))}
      </CarouselContent>
    </Carousel>
  );
};

const HighlightCarouselItem = ({ market }: { market: FixedProductMarketMaker }) => {
  const [image, setImage] = useState(highlightedMarketsList[market.id].image);
  const closingDate = new Date(+market.openingTimestamp * 1000);

  return (
    <CarouselItem key={market.id}>
      <Link
        href={`/markets?id=${market.id}`}
        className="flex h-auto min-h-[400px] w-full flex-col-reverse justify-between rounded-20 bg-surface-primary-main bg-gradient-to-b from-surface-surface-0 to-surface-surface-1 shadow-2 ring-1 ring-outline-base-em md:h-72 md:min-h-fit md:flex-row 2xl:h-96"
      >
        <div className="m-0 flex w-full max-w-2xl flex-col space-y-8 p-4 md:mx-6 md:my-8 md:mr-10 md:p-0 lg:mx-8 lg:mr-28">
          <div className="flex flex-col space-y-4">
            <p className="text-xs font-semibold text-text-low-em first-letter:uppercase md:text-sm">
              {remainingTime(closingDate)}
            </p>
            <p className="font-semibold md:text-lg lg:text-xl">{market.title}</p>
          </div>
          <OutcomeBar market={market} />
          <div className="flex items-center space-x-1">
            <TokenLogo address={market.collateralToken} className="size-3" />
            <p className="text-xs font-semibold text-text-med-em md:text-base">
              {formatEtherWithFixedDecimals(market.collateralVolume, 2)} Vol
            </p>
          </div>
        </div>
        <Image
          className="h-44 w-full rounded-e-0 rounded-t-20 md:h-full md:w-1/2 md:rounded-e-20 md:rounded-s-0 2xl:w-2/5"
          src={image}
          priority
          alt="Market highlight"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
          onError={() => setImage(defaultHighlightImage)}
        />
      </Link>
    </CarouselItem>
  );
};
