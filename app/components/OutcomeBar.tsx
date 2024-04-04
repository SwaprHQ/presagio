"use client";

import { FixedProductMarketMaker } from "@/queries/omen";
import { cx } from "class-variance-authority";

interface OutcomeBarProps {
  market: FixedProductMarketMaker;
}

export const OutcomeBar = ({ market }: OutcomeBarProps) => {
  const outcome0Price = market.outcomeTokenMarginalPrices
    ? (+market.outcomeTokenMarginalPrices[0] * 100).toFixed(2)
    : 0;
  const outcome1Price = market.outcomeTokenMarginalPrices
    ? (+market.outcomeTokenMarginalPrices[1] * 100).toFixed(2)
    : 0;

  const option0 = {
    title: market.outcomes?.[0],
    price: outcome0Price,
  };

  const option1 = {
    title: market.outcomes?.[1],
    price: outcome1Price,
  };

  return (
    <div className="flex space-x-1">
      <div
        className={cx(
          "flex items-center h-8 px-2 rounded-s-8",
          option0.price == 0
            ? "bg-outline-low-em"
            : "bg-surface-success-accent-1 text-text-success-em"
        )}
        style={{ width: option0.price == 0 ? "50%" : `${option0.price}%` }}
      >
        <p className="w-full uppercase">
          {`${option0.title} - ${option0.price}%`}
        </p>
      </div>
      <div
        className={cx(
          "flex items-center h-8 px-2 rounded-e-8",
          option0.price == 0
            ? "bg-outline-low-em"
            : "bg-surface-danger-accent-1 text-text-danger-em"
        )}
        style={{ width: option1.price == 0 ? "50%" : `${option1.price}%` }}
      >
        <p className="w-full text-right uppercase">
          {`${option1.title} - ${option1.price}%`}
        </p>
      </div>
    </div>
  );
};
