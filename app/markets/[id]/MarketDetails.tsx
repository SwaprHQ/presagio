"use client";

import { OutcomeBar, Swapbox } from "@/app/components";
import { useQuery } from "@tanstack/react-query";
import { getMarket } from "@/queries/omen";
import { Button, IconButton, Tag } from "swapr-ui";
import { remainingTime } from "@/utils/dates";
import Link from "next/link";
import { Address } from "viem";

interface MarketDetailsProps {
  id: Address;
}

export const MarketDetails = ({ id }: MarketDetailsProps) => {
  const { data, error, isLoading, isPending } = useQuery({
    queryKey: ["getMarket", id],
    queryFn: async () => getMarket({ id }),
  });

  if (error) throw error;
  if (isLoading || isPending || !data.fixedProductMarketMaker)
    return <LoadingMarketDetails />;

  const market = data.fixedProductMarketMaker;

  const closingDate = new Date(+market.openingTimestamp * 1000);

  return (
    <div className="space-y-4">
      <Link className="flex space-x-1.5 items-center w-fit group" href="/">
        <IconButton
          className="text-text-med-em"
          name="arrow-left"
          variant="pastel"
          size="sm"
        />
        <Button
          className="text-text-low-em font-normal"
          variant="ghost"
          size="sm"
        >
          Go back
        </Button>
      </Link>
      <div className="bg-surface-surface-0 w-full max-w-[464px] h-[544px] rounded-16 border border-outline-base-em">
        <div className="p-5 space-y-4">
          <div className="flex justify-between items-center">
            <Tag
              className="w-fit capitalize"
              size="sm"
              colorScheme="quaternary"
            >
              {market.category}
            </Tag>
            <p className="text-text-med-em text-sm">
              {remainingTime(closingDate)}
            </p>
          </div>
          <div className="flex space-x-4">
            <div className="size-20 rounded-8 bg-gradient-to-r from-[#cb8fc1] to-[#b459c6] flex-shrink-0" />
            <h1 className="text-xl font-semibold">{market.title}</h1>
          </div>
          <div className="!mt-7">
            <OutcomeBar market={market} />
          </div>
        </div>
        <div className="p-2">
          <Swapbox id={id} />
        </div>
      </div>
    </div>
  );
};

const LoadingMarketDetails = () => (
  <div className="w-full flex flex-col items-center space-y-4">
    <div className="flex space-x-1.5 items-start w-full max-w-[464px]">
      <div className="size-8 rounded-8 bg-outline-low-em animate-pulse"></div>
      <div className="w-14 h-8 rounded-8 bg-outline-low-em animate-pulse"></div>
    </div>
    <div className="bg-surface-surface-0 w-full max-w-[464px] h-[544px] rounded-16 border border-outline-base-em">
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-center">
          <div className="w-20 h-7 rounded-8 bg-outline-low-em animate-pulse" />
          <div className="w-28 h-4 rounded-8 bg-outline-low-em animate-pulse" />
        </div>
        <div className="flex space-x-4">
          <div className="size-20 rounded-8 flex-shrink-0 bg-outline-low-em animate-pulse" />
          <div className="w-full h-20 rounded-8 bg-outline-low-em animate-pulse" />
        </div>
        <div className="!mt-7 w-full h-7 rounded-8 bg-outline-low-em animate-pulse" />
      </div>
      <div className="p-2 w-full h-[348px]">
        <div className="w-full h-full rounded-8 bg-outline-low-em animate-pulse" />
      </div>
    </div>
  </div>
);
