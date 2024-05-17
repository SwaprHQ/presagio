"use client";

import { OutcomeBar, Swapbox } from "@/app/components";
import { useQuery } from "@tanstack/react-query";
import { getMarket } from "@/queries/omen";
import { Button, IconButton, Tag } from "swapr-ui";
import { remainingTime } from "@/utils/dates";
import Link from "next/link";
import { Address } from "viem";
import { Market } from "@/entities";
import { UserBets } from "../components/UserBets";

interface MarketDetailsProps {
  id: Address;
}

export const MarketDetails = ({ id }: MarketDetailsProps) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["getMarket", id],
    queryFn: async () => getMarket({ id }),
  });

  if (error) throw error;
  if (isLoading || !data?.fixedProductMarketMaker)
    return <LoadingMarketDetails />;

  const market = data.fixedProductMarketMaker;
  const marketModel = new Market(market);
  const closingDate = new Date(+market.openingTimestamp * 1000);

  return (
    <div className="w-full">
      <div className="max-w-[464px] mx-auto space-y-4">
        <Link className="flex space-x-1.5 items-center w-fit group" href="/">
          <IconButton
            className="text-text-med-em"
            name="arrow-left"
            variant="pastel"
            size="sm"
          />
          <Button
            className="font-normal text-text-low-em"
            variant="ghost"
            size="sm"
          >
            Go back
          </Button>
        </Link>
        <div className="w-full border bg-surface-surface-0 rounded-16 border-outline-base-em">
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <Tag
                className="capitalize w-fit"
                size="sm"
                colorScheme="quaternary"
              >
                {market.category}
              </Tag>
              {marketModel.isClosed ? (
                <Tag
                  className="capitalize w-fit"
                  size="sm"
                  colorScheme="quaternary"
                >
                  Market Closed
                </Tag>
              ) : (
                <p className="text-sm text-text-med-em">
                  {remainingTime(closingDate)}
                </p>
              )}
            </div>
            <div className="flex space-x-4">
              <div className="size-20 rounded-8 bg-gradient-to-r from-[#cb8fc1] to-[#b459c6] flex-shrink-0" />
              <h1 className="text-xl font-semibold">{market.title}</h1>
            </div>
            <div className="!mt-7">
              <OutcomeBar market={market} />
            </div>
          </div>
          {!marketModel.isClosed && (
            <div className="p-2">
              <Swapbox market={market} />
            </div>
          )}
        </div>
        <UserBets market={market} />
      </div>
    </div>
  );
};

const LoadingMarketDetails = () => (
  <div className="flex flex-col items-center w-full space-y-4">
    <div className="flex space-x-1.5 items-start w-full max-w-[464px]">
      <div className="size-8 rounded-8 bg-outline-low-em animate-pulse"></div>
      <div className="h-8 w-14 rounded-8 bg-outline-low-em animate-pulse"></div>
    </div>
    <div className="bg-surface-surface-0 w-full max-w-[464px] rounded-16 border border-outline-base-em">
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="w-20 h-7 rounded-8 bg-outline-low-em animate-pulse" />
          <div className="h-4 w-28 rounded-8 bg-outline-low-em animate-pulse" />
        </div>
        <div className="flex space-x-4">
          <div className="flex-shrink-0 size-20 rounded-8 bg-outline-low-em animate-pulse" />
          <div className="w-full h-28 rounded-8 bg-outline-low-em animate-pulse" />
        </div>
        <div className="!mt-7 w-full h-10 rounded-8 bg-outline-low-em animate-pulse" />
      </div>
      <div className="w-full p-2 h-28">
        <div className="w-full h-full rounded-8 bg-outline-low-em animate-pulse" />
      </div>
      <div className="w-full p-2 h-28">
        <div className="w-full h-full rounded-8 bg-outline-low-em animate-pulse" />
      </div>
      <div className="w-full p-2 h-14">
        <div className="w-full h-full" />
      </div>
      <div className="w-full h-16 p-2">
        <div className="w-full h-full rounded-8 bg-outline-low-em animate-pulse" />
      </div>
    </div>
  </div>
);
