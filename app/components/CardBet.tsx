"use client";

import { useQuery } from "@tanstack/react-query";
import { cx } from "class-variance-authority";
import Link from "next/link";
import { useAccount, useConfig } from "wagmi";

import { Button, Logo, Tag } from "swapr-ui";
import { Card } from "@/app/components/ui";

import { UserPosition } from "@/queries/conditional-tokens/types";
import { getConditionMarket, getMarketUserTrades } from "@/queries/omen";
import { remainingTime } from "@/utils/dates";
import {
  Market,
  Position,
  tradesCollateralAmountUSDSpent,
  tradesOutcomeBalance,
} from "@/entities";
import { redeemPositions } from "@/hooks/contracts";
import { WXDAI } from "@/constants";
import { waitForTransactionReceipt } from "wagmi/actions";
import { useState } from "react";
import { ModalId, useModalContext } from "@/context/ModalContext";
import { TransactionModal } from "./TransactionModal";

interface BetProps {
  userPosition: UserPosition;
}

export const CardBet = ({ userPosition }: BetProps) => {
  const position = new Position(userPosition.position);
  const outcomeIndex = position.outcomeIndex - 1;

  const config = useConfig();
  const { address } = useAccount();
  const [txHash, setTxHash] = useState("");
  const [isTxLoading, setIsTxLoading] = useState(false);
  const { openModal } = useModalContext();

  const { data, isLoading } = useQuery({
    queryKey: ["getConditionMarket", position.conditionId],
    queryFn: async () =>
      getConditionMarket({
        id: position.conditionId,
      }),
    enabled: !!position.conditionId,
  });

  const market =
    data?.conditions[0] &&
    new Market(data?.conditions[0]?.fixedProductMarketMakers[0]);

  const { data: userTrades, isLoading: isUserTradesLoading } = useQuery({
    queryKey: ["getMarketUserTrades", address, market?.data.id, outcomeIndex],
    queryFn: async () => {
      if (!!address && !!market)
        return getMarketUserTrades({
          creator: address.toLowerCase(),
          fpmm: market.data.id,
          outcomeIndex_in: [outcomeIndex],
        });
    },
    enabled: !!market?.data?.id,
  });

  const collateralAmountUSDSpent = tradesCollateralAmountUSDSpent({
    fpmmTrades: userTrades?.fpmmTrades,
  });

  const outcomeBalance = tradesOutcomeBalance({
    fpmmTrades: userTrades?.fpmmTrades,
  });

  const balance = outcomeBalance ? outcomeBalance.toFixed(2) : "-";

  if (isLoading || isUserTradesLoading) return <LoadingCardBet />;

  // emptyState
  if (!market) return;

  const isWinner = market.isWinner(outcomeIndex);
  const isLoser = market.isLoser(outcomeIndex);

  const outcomeAmountString = market.isClosed
    ? isWinner
      ? "You won"
      : "You lost"
    : "Potential win";

  const condition = userPosition.position.conditions[0];

  const isClaimed = !outcomeBalance;
  const isResolved = condition.resolved;
  const hasPayoutDenominator = +condition.payoutDenominator > 0;

  const canClaim = isWinner && isResolved && !isClaimed && hasPayoutDenominator;

  const redeem = async () => {
    setIsTxLoading(true);

    try {
      const txHash = await redeemPositions({
        conditionId: condition.id,
        outcomeIndex: position.outcomeIndex,
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
    <Card
      className={cx(
        "w-full bg-gradient-to-b from-[#F1F1F1] dark:from-[#131313]",
        isWinner &&
          "from-[#F2f2F2] to-[#d0ffd6] dark:from-[#131313] dark:to-[#11301F]",
        isLoser &&
          "from-[#F2f2F2] to-[#f4cbc4] dark:from-[#131313] dark:to-[#301111]"
      )}
    >
      <Link
        key={market.data.id}
        href={`markets?id=${market.data.id}`}
        className="block"
      >
        <section className="p-4 h-[144px] flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Tag colorScheme="quaternary" size="sm" className="capitalize">
                {market.data.category}
              </Tag>
              <Tag colorScheme="success" size="sm">
                You chose {position.getOutcome()}
              </Tag>
            </div>
            <p className="text-sm text-text-low-em">
              {remainingTime(market.closingDate)}
            </p>
          </div>
          <div className="flex space-x-4 ">
            <div className="size-[40px] bg-text-low-em rounded-8 bg-gradient-to-r from-[#cb8fc1] to-[#b459c6]" />
            <div className="flex-1 text-normal md:text-xl font-semibold text-text-high-em h-[80px] overflow-y-auto">
              {market.data.title}
            </div>
          </div>
        </section>
      </Link>
      <section className="flex items-center h-[56px] md:h-[48px] px-4 border-t border-outline-base-em">
        <div className="flex items-center justify-between w-full space-x-4">
          <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-2 space-y-0.5">
            <div className="flex items-center space-x-1">
              <p className="text-sm font-semibold text-text-med-em">
                Bet amount:
              </p>
              <p className="text-sm font-semibold text-text-high-em">
                {collateralAmountUSDSpent?.toFixed(2)} {WXDAI.symbol}
              </p>
              <Logo
                src="https://raw.githubusercontent.com/SmolDapp/tokenAssets/main/tokens/100/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/logo-128.png"
                alt="token logo"
                className="size-3"
              />
            </div>
            <div className="flex items-center space-x-1">
              <p className="text-sm font-semibold text-text-med-em">
                {outcomeAmountString}:
              </p>
              <p className="text-sm font-semibold text-text-high-em">
                {!market.isClosed || isWinner
                  ? balance
                  : collateralAmountUSDSpent?.toFixed(2)}{" "}
                {WXDAI.symbol}
              </p>
              <Logo
                src="https://raw.githubusercontent.com/SmolDapp/tokenAssets/main/tokens/100/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/logo-128.png"
                alt="token logo"
                className="size-3"
              />
            </div>
          </div>
          {canClaim && (
            <>
              <Button
                size="sm"
                colorScheme="success"
                variant="pastel"
                onClick={redeem}
              >
                Reedem
              </Button>
              <TransactionModal isLoading={isTxLoading} txHash={txHash} />
            </>
          )}
        </div>
      </section>
    </Card>
  );
};

export const LoadingCardBet = () => (
  <Card className="md:w-[760px] h-[194px] p-4 flex flex-col justify-between">
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="w-48 h-8 rounded-8 bg-outline-low-em animate-pulse"></div>
        <div className="w-32 h-8 rounded-8 bg-outline-low-em animate-pulse"></div>
      </div>{" "}
      <div className="h-20 rounded-8 bg-outline-low-em animate-pulse"></div>
    </div>
    <div className="flex items-center justify-between">
      <div className="w-48 h-6 rounded-8 bg-outline-low-em animate-pulse"></div>
      <div className="w-20 h-6 rounded-8 bg-outline-low-em animate-pulse"></div>
    </div>
  </Card>
);
