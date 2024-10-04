'use client';

import { Tag } from '@swapr/ui';

import { Market } from '@/entities';
import { MarketThumbnail } from '@/app/components/MarketThumbnail';
import { formattedNumberDollars, remainingTime } from '@/utils';
import { OutcomeBar } from '@/app/components/OutcomeBar';
import { APP_NAME, APP_URL } from '@/constants';
import { FixedProductMarketMaker } from '@/queries/omen';
import { TokenLogo } from '@/app/components/TokenLogo';

interface EmbedMarketCardProps {
  fixedProductMarketMaker: FixedProductMarketMaker;
}

export const EmbedMarketCard = ({ fixedProductMarketMaker }: EmbedMarketCardProps) => {
  const marketModel = new Market(fixedProductMarketMaker);
  const closingDate = new Date(+fixedProductMarketMaker.openingTimestamp * 1000);
  const marketUrl = `${APP_URL}/markets?id=${fixedProductMarketMaker.id}`;

  return (
    <div className="mx-auto h-fit w-full max-w-96 rounded-12 border border-outline-base-em bg-surface-surface-0">
      <div className="space-y-4 p-4">
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
        <div>
          <a href={marketUrl} target="_blank" className="flex space-x-4 hover:underline">
            <MarketThumbnail
              width={20}
              height={20}
              className="size-20 flex-shrink-0 rounded-8"
              marketId={fixedProductMarketMaker.id}
            />
            <h1 className="text-xl font-semibold">{fixedProductMarketMaker.title}</h1>
          </a>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-center space-x-1">
            <p className="text-sm font-semibold text-text-med-em">
              {formattedNumberDollars(+fixedProductMarketMaker.usdVolume) || '-'}{' '}
              <span>Vol</span>
            </p>
            <TokenLogo
              address={fixedProductMarketMaker.collateralToken}
              size="xs"
              className="size-3 opacity-65 hover:opacity-100"
            />
          </div>
          <OutcomeBar market={fixedProductMarketMaker} />
        </div>

        <div className="flex items-center justify-between">
          <a
            className="flex h-fit select-none items-center justify-center space-x-2 rounded-12 bg-surface-surface-2 px-3 py-2 text-base font-bold text-text-high-em hover:bg-surface-surface-3"
            href={marketUrl}
            target="_blank"
          >
            Check market
          </a>

          <p>
            More on{' '}
            <a href={APP_URL} target="_blank" className="text-text-primary-main">
              {APP_NAME}.eth
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
