'use client';

import Link from 'next/link';
import { FixedProductMarketMaker } from '@/queries/omen';
import { MarketThumbnail, OutcomeBar, TokenLogo } from '@/app/components';
import { formatEtherWithFixedDecimals, remainingTime } from '@/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselSelector,
} from '../components/Carousel';
import Autoplay from 'embla-carousel-autoplay';
import { FA_EVENTS } from '@/analytics';
import { trackEvent } from 'fathom-client';

interface MarketsHighlightProps {
  markets: FixedProductMarketMaker[];
}

export const MarketsHighlight = ({ markets }: MarketsHighlightProps) => {
  const randomMarkets = markets.sort(() => 0.5 - Math.random()).slice(0, 3);

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
      <CarouselSelector className="absolute bottom-3 left-0 right-0 z-50 mx-auto mb-6 md:bottom-0" />
      <div className="absolute bottom-2 right-0 z-50 mb-4 mr-6 flex space-x-2 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
        <CarouselPrevious />
        <CarouselNext />
      </div>
      <CarouselContent className="relative pb-2">
        {randomMarkets.map(market => (
          <HighlightCarouselItem key={market.id} market={market} />
        ))}
      </CarouselContent>
    </Carousel>
  );
};

const HighlightCarouselItem = ({ market }: { market: FixedProductMarketMaker }) => {
  const closingDate = new Date(+market.openingTimestamp * 1000);

  return (
    <CarouselItem key={market.id}>
      <Link
        onClick={() => trackEvent(FA_EVENTS.MARKETS.CAROUSEL)}
        href={`/markets?id=${market.id}`}
        className="flex min-h-[600px] w-auto flex-col-reverse justify-between rounded-20 bg-gradient-to-b from-surface-surface-1 to-surface-surface-3 shadow-2 ring-1 ring-outline-base-em md:h-72 md:min-h-fit md:flex-row 2xl:h-96"
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
            <p className="text-xs font-semibold text-text-med-em md:text-sm">
              {formatEtherWithFixedDecimals(market.collateralVolume, 2)} Vol
            </p>
          </div>
        </div>
        <MarketThumbnail
          priority
          width={200}
          height={200}
          className="h-full w-full rounded-e-0 rounded-t-20 bg-outline-primary-low-em md:w-1/2 md:rounded-e-20 md:rounded-s-0 2xl:w-2/5"
          marketId={market.id}
          style={{ objectFit: 'cover', objectPosition: 'top' }}
          alt="Market highlight"
        />
      </Link>
    </CarouselItem>
  );
};
