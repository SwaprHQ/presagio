'use client';

import { OutcomeBar, Card, ScrollArea, TokenLogo } from '@/app/components';
import { FixedProductMarketMaker } from '@/queries/omen';
import { remainingTime } from '@/utils/dates';
import { MarketThumbnail } from './MarketThumbnail';
import { Skeleton } from './Skeleton';
import { formatValueWithFixedDecimals } from '@/utils';

interface CardMarketProps {
  market: FixedProductMarketMaker;
}

export const CardMarket = ({ market }: CardMarketProps) => {
  const closingDate = new Date(+market.openingTimestamp * 1000);

  return (
    <Card>
      <div className="flex h-[160px] flex-col justify-between p-4">
        <div className="flex space-x-4">
          <MarketThumbnail
            width={40}
            height={40}
            className="size-[40px] rounded-8 bg-outline-low-em"
            marketId={market.id}
          />
          <ScrollArea className="h-[98px] flex-1 font-semibold text-text-high-em">
            {market.title}
          </ScrollArea>
        </div>
        <OutcomeBar market={market} />
      </div>
      <div className="flex h-[40px] items-center border-t border-outline-base-em px-4">
        <div className="flex w-full items-center justify-between space-x-4">
          <div className="flex items-center space-x-2">
            <TokenLogo address={market.collateralToken} size="xs" className="size-3.5" />
            <p className="text-sm font-semibold text-text-med-em">
              {formatValueWithFixedDecimals(market.scaledCollateralVolume, 2) ?? '-'}
              <span> Vol</span>
            </p>
          </div>
          <p className="text-sm text-text-low-em">{remainingTime(closingDate)}</p>
        </div>
      </div>
    </Card>
  );
};

export const LoadingCardMarket = () => (
  <Card className="h-[202px]">
    <div className="space-y-3 p-4">
      <Skeleton className="h-[80px]" />
      <Skeleton className="h-9" />
    </div>
    <div className="flex items-center justify-between px-4">
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-8 w-20" />
    </div>
  </Card>
);
