'use client';

import { Market } from '@/entities';
import { MarketThumbnail } from '@/app/components/MarketThumbnail';
import { remainingTime } from '@/utils';
import { OutcomeBar } from '@/app/components/OutcomeBar';
import { APP_NAME, APP_URL } from '@/constants';
import { FixedProductMarketMaker } from '@/queries/omen';

interface EmbedMarketCardProps {
  fixedProductMarketMaker: FixedProductMarketMaker;
}

export const EmbedMarketCard = ({ fixedProductMarketMaker }: EmbedMarketCardProps) => {
  const marketModel = new Market(fixedProductMarketMaker);
  const closingDate = new Date(+fixedProductMarketMaker.openingTimestamp * 1000);
  const marketUrl = `${APP_URL}/markets?id=${fixedProductMarketMaker.id}`;

  return (
    <div className="h-fit w-full max-w-96 rounded-12 border border-outline-base-em bg-surface-surface-0">
      <div className="space-y-3 p-4">
        <a href={APP_URL} target="_blank" className="text-text-primary-high-em">
          {APP_NAME}
        </a>
        <div className="h-16">
          <a href={marketUrl} target="_blank" className="flex space-x-4 hover:underline">
            <MarketThumbnail
              width={48}
              height={48}
              className="size-12 flex-shrink-0 rounded-8"
              marketId={fixedProductMarketMaker.id}
            />
            <p className="line-clamp-3 text-[13px] text-sm font-medium text-text-high-em">
              {fixedProductMarketMaker.title}
            </p>
          </a>
        </div>
        <div className="space-y-2">
          <OutcomeBar market={fixedProductMarketMaker} />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <a
            className="flex h-fit select-none items-center justify-center space-x-2 rounded-12 bg-surface-surface-4 px-3 py-2 text-sm font-bold text-text-high-em hover:bg-surface-surface-3"
            href={marketUrl}
            target="_blank"
          >
            {marketModel.isClosed ? 'View market' : 'Bet now'}
          </a>
          {marketModel.isClosed ? (
            <p className="text-xs">Market Closed</p>
          ) : (
            <p className="text-sm text-text-med-em">{remainingTime(closingDate)}</p>
          )}
        </div>
      </div>
    </div>
  );
};
