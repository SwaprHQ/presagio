"use client";

import { FixedProductMarketMaker } from "@/queries/omen";
import { Tag } from "swapr-ui";

interface OutcomeBarProps {
  market: FixedProductMarketMaker;
  outcome0Price: any;
  outcome1Price: any;
}

export const OutcomeBar = ({
  market,
  outcome0Price,
  outcome1Price,
}: OutcomeBarProps) => {
  function formatRoundNumber(number: string | number) {
    number = parseFloat(number.toString()); // Parse the number to handle string inputs as well
    return Math.ceil(number); // Round up to the nearest integer
  }

  const option0 = {
    title: market.outcomes?.[0],
    roundedPrice: formatRoundNumber(outcome0Price),
    price: outcome0Price,
  };
  const option1 = {
    title: market.outcomes?.[1],
    roundedPrice: formatRoundNumber(outcome1Price),
    price: outcome0Price,
  };

  if (option0.roundedPrice <= 0 && option1.roundedPrice <= 0)
    return <Tag colorScheme="quaternary">Closed</Tag>;

  return (
    <div className="flex space-x-1">
      <div
        className={`flex items-center h-8 px-2 bg-surface-success-accent-1 rounded-s-8 w-[${option0.roundedPrice}%]`}
      >
        <p className="w-full uppercase text-text-success-em">
          {`${option0.title} - ${option0.price}%`}
        </p>
      </div>
      <div
        className={`flex items-center w-full h-8 px-2 bg-surface-danger-accent-1 rounded-e-8 w-[${option1.roundedPrice}%]`}
      >
        <p className="w-full text-right uppercase text-text-danger-em">
          {`${option1.title} - ${option1.price}%`}
        </p>
      </div>
    </div>
  );
};
