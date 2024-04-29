import Big from "big.js";
import { newtonRaphson } from "@fvictorio/newton-raphson-method";
import { formatEther } from "viem";

/**
 * Computes the amount of collateral that needs to be sold to get `shares` amount of shares. Returns null if the amount
 * couldn't be computed.
 * @param sharesToSellAmount The amount of shares that need to be sold
 * @param marketSharesAmounts Array of the amount of shares that market maker holds
 * @param sellingOutcomeIndex The index of the outcome being sold
 * @param marketFee The market maker fee
 */

export const calcSellAmountInCollateral = (
  sharesToSellAmount: string,
  marketSharesAmounts: string[],
  sellingOutcomeIndex: number,
  marketFee: number
): bigint | null => {
  Big.DP = 90;

  const marketSellingSharesAmounts = new Big(
    marketSharesAmounts[sellingOutcomeIndex]
  );
  const marketNonSellingSharesAmounts = marketSharesAmounts
    .filter((_, index) => index !== sellingOutcomeIndex)
    .map((marketShares) => new Big(marketShares));
  const sharesToSell = new Big(sharesToSellAmount);

  const f = (r: Big) => {
    /* For three outcomes, where the `x` is the one being sold, the formula is:
     * f(r) = ((y - R) * (z - R)) * (x  + a - R) - (x * y * z)
     * where:
     *   `R` is r / (1 - fee)
     *   `x`, `y`, `z` are the market maker shares for each outcome, where `x` is the market maker share being sold
     *   `a` is the amount of outcomes shares that are being sold
     *   `r` (the unknown) is the amount of collateral that will be returned in exchange of `a` tokens
     */

    const R = r.div(1 - marketFee);

    // ((y - R) * (z - R))
    const firstTerm = marketNonSellingSharesAmounts
      .map((h) => h.minus(R))
      .reduce((a, b) => a.mul(b));

    // (x  + a - R)
    const secondTerm = marketSellingSharesAmounts.plus(sharesToSell).minus(R);

    // (x * y * z)
    const thirdTerm = marketNonSellingSharesAmounts.reduce(
      (a, b) => a.mul(b),
      marketSellingSharesAmounts
    );

    // ((y - R) * (z - R)) * (x  + a - R) - (x * y * z)
    return firstTerm.mul(secondTerm).minus(thirdTerm);
  };

  /* Newton-Raphson method is used to find the root of a function.
   * Root of a function is the point where the function touches the x-axis on a graph.
   * In this case y-axis is the number of outcome tokens / shares.
   * The x-axis is the number of colleral tokens to be received.
   * This meaning we want to know how much collateral we need to receive to have 0 outcome tokens / shares.
   */
  const r = newtonRaphson(f, 0, { maxIterations: 100 });

  if (!r) {
    return null;
  }

  return BigInt(r.toFixed(0));
};

// Removes the given fraction from the given integer-bounded amount and returns the value as an original type.
export const removeFraction = (amount: bigint, fraction: number): bigint => {
  if (fraction >= 1 || fraction <= 0)
    throw `The given basisPoints ${fraction} is not in the range [0, 1].`;

  const keepFraction = 1 - fraction;

  return BigInt(new Big(amount.toString()).mul(keepFraction).toFixed(0));
};

// Adds the given fraction from the given integer-bounded amount and returns the value as an original type.
export const addFraction = (amount: bigint, fraction: number): bigint => {
  if (fraction >= 1 || fraction <= 0)
    throw `The given basisPoints ${fraction} is not in the range [0, 1].`;

  const keepFraction = 1 + fraction;

  return BigInt(new Big(amount.toString()).mul(keepFraction).toFixed(0));
};

export const formatTokenPrice = (price?: bigint) => {
  return price ? parseFloat(formatEther(price as bigint)).toFixed(2) : "-";
};
