"use client";

import { OutcomeBar, Swapbox } from "@/app/components";
import { useQuery } from "@tanstack/react-query";
import { getMarket, getMarketUserTrades } from "@/queries/omen";
import { Button, IconButton, Tag } from "swapr-ui";
import { remainingTime } from "@/utils/dates";
import Link from "next/link";
import { Address, formatEther } from "viem";
import { MarketModel } from "@/models";
import { cx } from "class-variance-authority";
import { useAccount } from "wagmi";
import { WXDAI } from "@/constants";
import { useReadBalance } from "@/model/conditionalTokens";
import { tradeTypeMathOperation } from "@/model/market";

interface MarketDetailsProps {
  id: Address;
}

export const MarketDetails = ({ id }: MarketDetailsProps) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["getMarket", id],
    queryFn: async () => getMarket({ id }),
  });

  const { address } = useAccount();

  const { data: userTrades, isLoading: isUserTradesLoading } = useQuery({
    queryKey: ["getMarketUserTrades", address, id, "0"],
    queryFn: async () => {
      if (!!address)
        return getMarketUserTrades({
          creator: address.toLowerCase(),
          fpmm: id,
          outcomeIndex_in: ["0"],
        });
    },
    enabled: !!address,
  });

  const collateralAmountUSDSpent =
    userTrades?.fpmmTrades.reduce((acc, trade) => {
      const type = trade.type;
      const collateralAmountUSD = parseFloat(trade.collateralAmountUSD);
      return tradeTypeMathOperation[type](acc, collateralAmountUSD);
    }, 0) ?? 0;

  const { data: outcome0Balance, isLoading: isOutcome0BalanceLoading } =
    useReadBalance(
      address,
      data?.fixedProductMarketMaker?.collateralToken,
      data?.fixedProductMarketMaker?.condition?.id,
      1
    );

  const balance = outcome0Balance
    ? parseFloat(formatEther(outcome0Balance as bigint)).toFixed(2)
    : "-";

  if (error) throw error;
  if (
    isLoading ||
    !data?.fixedProductMarketMaker ||
    isUserTradesLoading ||
    isOutcome0BalanceLoading
  )
    return <LoadingMarketDetails />;

  const market = data.fixedProductMarketMaker;
  const marketModel = new MarketModel(market);

  const closingDate = new Date(+market.openingTimestamp * 1000);

  const winnerOutcome = marketModel.getWinnerOutcome();

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
      <div className="bg-surface-surface-0 w-full max-w-[464px] rounded-16 border border-outline-base-em">
        <div className="p-5 space-y-4">
          <div className="flex justify-between items-center">
            <Tag
              className="w-fit capitalize"
              size="sm"
              colorScheme="quaternary"
            >
              {market.category}
            </Tag>
            {marketModel.isClosed ? (
              <Tag
                className="w-fit capitalize"
                size="sm"
                colorScheme="quaternary"
              >
                Market Closed
              </Tag>
            ) : (
              <p className="text-text-med-em text-sm">
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
        {marketModel.isClosed ? (
          <div className="p-4 flex space-x-4">
            {winnerOutcome && (
              <>
                <p className="text-text-low-em text-sm font-semibold">
                  🥇Winner:{" "}
                  <span
                    className={cx(
                      "uppercase",
                      marketModel.isWinner(0)
                        ? "text-text-success-main"
                        : "text-text-danger-main"
                    )}
                  >
                    {winnerOutcome.name}
                  </span>
                </p>
                <p className="text-sm font-semibold">
                  <span className="text-text-low-em">Bet amount: </span>
                  <span>
                    {collateralAmountUSDSpent?.toFixed(2)} {WXDAI.symbol}
                  </span>
                </p>
                {marketModel.isWinner(0) && (
                  <p className="text-sm font-semibold">
                    <span className="text-text-low-em">You won: </span>
                    <span>
                      {balance} {WXDAI.symbol}
                    </span>
                  </p>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="p-2">
            <Swapbox market={market} />
          </div>
        )}
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
    <div className="bg-surface-surface-0 w-full max-w-[464px] rounded-16 border border-outline-base-em">
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-center">
          <div className="w-20 h-7 rounded-8 bg-outline-low-em animate-pulse" />
          <div className="w-28 h-4 rounded-8 bg-outline-low-em animate-pulse" />
        </div>
        <div className="flex space-x-4">
          <div className="size-20 rounded-8 flex-shrink-0 bg-outline-low-em animate-pulse" />
          <div className="w-full h-28 rounded-8 bg-outline-low-em animate-pulse" />
        </div>
        <div className="!mt-7 w-full h-10 rounded-8 bg-outline-low-em animate-pulse" />
      </div>
      <div className="p-2 w-full h-28">
        <div className="w-full h-full rounded-8 bg-outline-low-em animate-pulse" />
      </div>
      <div className="p-2 w-full h-28">
        <div className="w-full h-full rounded-8 bg-outline-low-em animate-pulse" />
      </div>
      <div className="p-2 w-full h-14">
        <div className="w-full h-full" />
      </div>
      <div className="p-2 w-full h-16">
        <div className="w-full h-full rounded-8 bg-outline-low-em animate-pulse" />
      </div>
    </div>
  </div>
);
