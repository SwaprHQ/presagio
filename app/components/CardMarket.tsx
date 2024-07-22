'use client';

import { OutcomeBar } from '@/app/components';
import { Card, ScrollArea, TokenLogo } from '@/app/components/ui';
import { FixedProductMarketMaker } from '@/queries/omen';
import { formattedNumberDollars } from '@/utils/currencies';
import { remainingTime } from '@/utils/dates';
import { MarketThumbnail } from './MarketThumbnail';

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
            <TokenLogo address={market.collateralToken} size="xs" />
            <p className="text-sm font-semibold text-text-med-em">
              {formattedNumberDollars(+market.usdVolume) || '-'} <span>Vol</span>
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
      <div className="h-[80px] animate-pulse rounded-8 bg-outline-low-em"></div>
      <div className="h-9 animate-pulse rounded-8 bg-outline-low-em"></div>
    </div>
    <div className="flex items-center justify-between px-4">
      <div className="h-8 w-20 animate-pulse rounded-8 bg-outline-low-em"></div>
      <div className="h-8 w-20 animate-pulse rounded-8 bg-outline-low-em"></div>
    </div>
  </Card>
);
