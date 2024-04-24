"use client";

import { Card } from "@/app/components/ui";
import { UserPosition } from "@/queries/conditional-tokens/types";
import { FixedProductMarketMaker, getConditionMarket } from "@/queries/omen";
import { remainingTime } from "@/utils/dates";
import { useQuery } from "@tanstack/react-query";
import { cx } from "class-variance-authority";
import Link from "next/link";
import { Button, Logo, Tag } from "swapr-ui";
import { fromHex } from "viem";

interface BetProps {
  userPosition: UserPosition;
}

export const CardBet = ({ userPosition }: BetProps) => {
  const conditionId = userPosition.position.conditionIdsStr;

  const { data, isLoading } = useQuery({
    queryKey: ["getConditionMarket", conditionId],
    queryFn: async () =>
      getConditionMarket({
        id: conditionId,
      }),
    enabled: !!conditionId,
  });

  if (isLoading || isFetching) return <LoadingCardBet />;

  const market: FixedProductMarketMaker = data?.conditions[0]
    ?.fixedProductMarketMakers[0] as FixedProductMarketMaker;

  const closingDate = new Date(+market.openingTimestamp * 1000);
  const answer =
    market.question.currentAnswer &&
    fromHex(market.question.currentAnswer, "number");
  const outcomeIndex = userPosition.position.indexSets[0];

  const outcomes = userPosition.position.conditions[0].outcomes;
  const outcomeString = outcomes ? outcomes[outcomeIndex - 1] : "";

  const hasFinished = !!answer;
  const isWinner = hasFinished && answer == outcomeIndex;
  const isLoser = hasFinished && answer != outcomeIndex;

  const outcomeAmountString = answer
    ? isWinner
      ? "You won"
      : "You lost"
    : "Potential win";

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
      <Link key={market.id} href={`markets?id=${market.id}`} className="block">
        <section className="p-4 h-[144px] flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Tag colorScheme="quaternary" size="sm" className="capitalize">
                {market.category}
              </Tag>
              <Tag colorScheme="success" size="sm">
                You chose {outcomeString}
              </Tag>
            </div>
            <p className="text-sm text-text-low-em">
              {remainingTime(closingDate)}
            </p>
          </div>
          <div className="flex space-x-4 ">
            <div className="size-[40px] bg-text-low-em rounded-8 bg-gradient-to-r from-[#cb8fc1] to-[#b459c6]" />
            <div className="flex-1 text-normal md:text-xl font-semibold text-text-high-em h-[80px] overflow-y-auto">
              {market.title}
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
                200 <span>SDAI</span>
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
                300 <span>SDAI</span>
              </p>
              <Logo
                src="https://raw.githubusercontent.com/SmolDapp/tokenAssets/main/tokens/100/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/logo-128.png"
                alt="token logo"
                className="size-3"
              />
            </div>
          </div>
          {isWinner && (
            <Button size="sm" colorScheme="success" variant="pastel">
              Reedem
            </Button>
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
