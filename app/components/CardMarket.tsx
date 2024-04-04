"use client";

import { Logo } from "swapr-ui";

import { OutcomeBar } from "@/app/components";
import { Card, ScrollArea } from "@/app/components/ui";
import { FixedProductMarketMaker } from "@/queries/omen";
import { formattedNumberDollars } from "@/utils/currencies";
import { remainingTime } from "@/utils/dates";

interface CardMarketProps {
  market: FixedProductMarketMaker;
}

export const CardMarket = ({ market }: CardMarketProps) => {
  const closingDate = new Date(+market.openingTimestamp * 1000);

  return (
    <Card>
      <section className="p-4 h-[160px] flex flex-col justify-between">
        <div className="flex space-x-4 ">
          <div className="size-[40px] bg-text-low-em rounded-8 bg-gradient-to-r from-[#cb8fc1] to-[#b459c6]" />
          <ScrollArea className="flex-1 font-semibold text-text-high-em h-[98px]">
            {market.title}
          </ScrollArea>
        </div>
        <OutcomeBar market={market} />
      </section>
      <section className="flex items-center h-[40px] px-4 border-t border-outline-base-em">
        <div className="flex items-center justify-between w-full space-x-4">
          <div className="flex items-center space-x-2">
            <Logo
              src="https://raw.githubusercontent.com/SmolDapp/tokenAssets/main/tokens/100/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/logo-128.png"
              alt="token logo"
              size="xs"
            />
            <p className="text-sm font-semibold text-text-med-em">
              {formattedNumberDollars(+market.usdVolume) || "-"}{" "}
              <span>Vol</span>
            </p>
          </div>
          <p className="text-sm text-text-low-em">
            {remainingTime(closingDate)}
          </p>
        </div>
      </section>
    </Card>
  );
};

export const LoadingCardMarket = () => (
  <Card className="h-[202px] p-4 flex flex-col justify-between">
    <div className="space-y-4">
      <div className="h-24 rounded-8 bg-outline-low-em animate-pulse"></div>
      <div className="h-8 rounded-8 bg-outline-low-em animate-pulse"></div>
    </div>
    <div className="flex items-center justify-between">
      <div className="w-20 h-8 rounded-8 bg-outline-low-em"></div>
      <div className="w-32 h-8 rounded-8 bg-outline-low-em"></div>
    </div>
  </Card>
);
