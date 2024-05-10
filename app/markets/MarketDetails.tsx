"use client";

import { OutcomeBar, Swapbox } from "@/app/components";
import { useQuery } from "@tanstack/react-query";
import { getMarket, getMarketUserTrades } from "@/queries/omen";
import { Button, IconButton, Logo, Tag } from "swapr-ui";
import { remainingTime } from "@/utils/dates";
import Link from "next/link";
import { Address, formatEther } from "viem";
import { MarketModel } from "@/models";
import { cx } from "class-variance-authority";
import { useAccount } from "wagmi";
import { WXDAI } from "@/constants";
import { redeemPositions, useReadBalance } from "@/model/conditionalTokens";
import { tradeTypeMathOperation } from "@/model/market";
import { getCondition } from "@/queries/conditional-tokens";
import { ModalId, useModalContext } from "@/context/ModalContext";
import { useState } from "react";
import { TransactionModal } from "@/app/components";
import { waitForTransactionReceipt } from "wagmi/actions";
import { config } from "@/providers/config";

interface MarketDetailsProps {
  id: Address;
}

export const MarketDetails = ({ id }: MarketDetailsProps) => {
  const { openModal } = useModalContext();
  const { address } = useAccount();
  const [txHash, setTxHash] = useState("");
  const [isTxLoading, setIsTxLoading] = useState(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ["getMarket", id],
    queryFn: async () => getMarket({ id }),
  });

  const conditionId = data?.fixedProductMarketMaker?.condition?.id;

  const { data: conditionData, isLoading: isConditionLoading } = useQuery({
    queryKey: ["getCondition", conditionId],
    queryFn: async () => {
      if (!!conditionId)
        return getCondition({
          id: conditionId,
        });
    },
    enabled: !!conditionId,
  });

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

  const outcomeBalance =
    userTrades?.fpmmTrades.reduce((acc, trade) => {
      const type = trade.type;
      const collateralAmountUSD = parseFloat(
        formatEther(trade.outcomeTokensTraded as bigint)
      );
      return tradeTypeMathOperation[type](acc, collateralAmountUSD);
    }, 0) ?? 0;

  const balance = outcomeBalance ? outcomeBalance.toFixed(2) : "-";

  const { data: outcome0Balance, isLoading: isOutcome0BalanceLoading } =
    useReadBalance(
      address,
      data?.fixedProductMarketMaker?.collateralToken,
      data?.fixedProductMarketMaker?.condition?.id,
      1
    );

  if (error) throw error;
  if (
    isLoading ||
    !data?.fixedProductMarketMaker ||
    isUserTradesLoading ||
    isOutcome0BalanceLoading ||
    isConditionLoading ||
    !conditionData?.condition
  )
    return <LoadingMarketDetails />;

  const market = data.fixedProductMarketMaker;
  const marketModel = new MarketModel(market);

  const closingDate = new Date(+market.openingTimestamp * 1000);

  const winnerOutcome = marketModel.getWinnerOutcome();

  const { condition } = conditionData;
  const isResolved = condition.resolved;
  const isClaimed = !outcome0Balance;
  const hasPayoutDenominator = +condition.payoutDenominator > 0;

  const canClaim =
    marketModel.isWinner(0) && isResolved && !isClaimed && hasPayoutDenominator;

  const redeem = async () => {
    setIsTxLoading(true);

    try {
      const txHash = await redeemPositions({
        conditionId: condition.id,
        outcomeIndex: 1,
      });
      setTxHash(txHash);
      openModal(ModalId.WAITING_TRANSACTION);

      await waitForTransactionReceipt(config, {
        hash: txHash,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsTxLoading(false);
    }
  };

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
          className="font-normal text-text-low-em"
          variant="ghost"
          size="sm"
        >
          Go back
        </Button>
      </Link>
      <div className="bg-surface-surface-0 w-full max-w-[464px] rounded-16 border border-outline-base-em">
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
        {marketModel.isClosed ? (
          <div className="flex p-4 space-x-4">
            {winnerOutcome && (
              <>
                <p className="text-sm font-semibold text-text-low-em">
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
      {canClaim && (
        <>
          <div className="bg-surface-surface-0 w-full max-w-[464px] rounded-16 border border-outline-base-em space-y-4 text-center p-4 bg-gradient-to-b from-[#F2f2F2] to-[#d0ffd6] dark:from-[#131313] dark:to-[#11301F]">
            <div className="mx-12 space-y-2">
              <p className="text-xl font-semibold">
                Congratulations on your win 🎉
              </p>
              <p className="font-semibold text-text-low-em">
                You can now redeem {balance} {WXDAI.symbol} from your {balance}{" "}
                shares of the winning outcome.
              </p>
            </div>
            <Button
              colorScheme="success"
              variant="pastel"
              width="full"
              size="lg"
              className="space-x-2"
              onClick={redeem}
            >
              <Logo
                src="https://raw.githubusercontent.com/SmolDapp/tokenAssets/main/tokens/100/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/logo-128.png"
                alt="token logo"
                size="xs"
              />{" "}
              <p>
                Redeem {balance} {WXDAI.symbol}
              </p>
            </Button>
          </div>
          <TransactionModal isLoading={isTxLoading} txHash={txHash} />
        </>
      )}
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
