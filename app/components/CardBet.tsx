"use client";

import { Card } from "@/app/components/ui";
import { FixedProductMarketMaker } from "@/queries/omen";
import { remainingTime } from "@/utils/dates";
import { cx } from "class-variance-authority";
import Link from "next/link";
import { Button, Logo, Tag } from "swapr-ui";

interface CardBetProps {
  market: FixedProductMarketMaker;
}

export const CardBet = ({ market }: CardBetProps) => {
  const closingDate = new Date(+market.openingTimestamp * 1000);

  const outcomes = ["win", "loss", "-"];
  const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];

  return (
    <Card
      className={cx(
        "w-full bg-gradient-to-b from-[#131313]",
        randomOutcome === "win" && "from-[#131313] to-[#11301F]",
        randomOutcome === "loss" && "from-[#131313] to-[#301111]"
      )}
    >
      <Link key={market.id} href={`markets?id=${market.id}`} className="block">
        <section className="p-4 h-[144px] flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Tag colorScheme="quaternary" size="sm">
                Election
              </Tag>
              <Tag colorScheme="success" size="sm">
                You chose Yes
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
                size="xs"
              />
            </div>
            <div className="flex items-center space-x-1">
              <p className="text-sm font-semibold text-text-med-em">You won:</p>
              <p className="text-sm font-semibold text-text-high-em">
                300 <span>SDAI</span>
              </p>
              <Logo
                src="https://raw.githubusercontent.com/SmolDapp/tokenAssets/main/tokens/100/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/logo-128.png"
                alt="token logo"
                size="xs"
              />
            </div>
          </div>
          <Button size="sm" colorScheme="success" variant="pastel">
            Reedem
          </Button>
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
      <div className="h-24 rounded-8 bg-outline-low-em animate-pulse"></div>
    </div>
    <div className="flex items-center justify-between">
      <div className="w-48 h-8 rounded-8 bg-outline-low-em animate-pulse"></div>
      <div className="w-20 h-8 rounded-8 bg-outline-low-em animate-pulse"></div>
    </div>
  </Card>
);
