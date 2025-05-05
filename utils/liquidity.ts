import Big from 'big.js';

export const calcSharesAfterAddFunding = (
  addedFunds: bigint,
  poolBalances: bigint[],
  poolShareSupply?: bigint
) => {
  const sendAmountsAfterAddingFunding = calcAddFundingOutcomeTokensReturned(
    addedFunds,
    poolBalances,
    poolShareSupply
  );

  const sharesAfterAddingFunding = poolBalances.reduce(
    (acc, cur, index) => acc + cur + (sendAmountsAfterAddingFunding?.[index] || BigInt(0))
  );

  return sharesAfterAddingFunding;
};

/**
 * Compute the numbers of outcome tokens that will be sent to the user by the market maker after adding `addedFunds` of collateral.
 * @param addedFunds - the amount of collateral being added to the market maker as liquidity
 * @param poolBalances - the market maker's balances of outcome tokens
 * @param poolShareSupply - the total supply of liquidity pool tokens
 * @see https://github.com/protofire/omen-exchange/blob/f35d30614e92baa50d0787cd8203668fdb59ee3b/app/src/util/tools/fpmm/liquidity/index.ts#L9
 */
export const calcAddFundingOutcomeTokensReturned = (
  addedFunds: bigint,
  poolBalances: bigint[],
  poolShareSupply?: bigint
): bigint[] | null => {
  if (poolShareSupply && poolShareSupply === BigInt(0)) {
    return null;
  }
  const depositAmounts = calcAddFundingDepositedAmounts(addedFunds, poolBalances);

  const sendAmounts = depositAmounts.map(depositAmount => addedFunds - depositAmount);
  return sendAmounts;
};

/**
 * Compute the amount of collateral that can be obtained via merging after the user
 * removed `removedFunds` of pool shares.
 * @param removedFunds - the amount of liquidity pool tokens being sent to the market maker in return for underlying outcome tokens
 * @param poolBalances - the market maker's balances of outcome tokens
 * @param poolShareSupply - the total supply of liquidity pool tokens
 * @see https://github.com/protofire/omen-exchange/blob/f35d30614e92baa50d0787cd8203668fdb59ee3b/app/src/util/tools/fpmm/liquidity/index.ts#L30
 */
export const calcDepositedTokens = (
  removedFunds: bigint,
  poolBalances: bigint[],
  poolShareSupply: bigint
): bigint => {
  const sendAmounts = calcRemoveFundingSendAmounts(
    removedFunds,
    poolBalances,
    poolShareSupply
  );
  return sendAmounts.reduce((min, amount) => (amount < min ? amount : min));
};

/**
 * Compute the numbers of outcome tokens that will be added to the market maker after adding `addedFunds` of collateral.
 * @param addedFunds - the amount of collateral being added to the market maker as liquidity
 * @param poolBalances - the market maker's balances of outcome tokens
 * @returns array of BigInt values representing the deposited amounts
 * @throws error if any pool balance is zero
 * @see https://github.com/protofire/omen-exchange/blob/f35d30614e92baa50d0787cd8203668fdb59ee3b/app/src/util/tools/fpmm/liquidity/index.ts#L44
 */
export const calcAddFundingDepositedAmounts = (
  addedFunds: bigint,
  poolBalances: bigint[]
): bigint[] => {
  if (poolBalances.some(poolBalance => poolBalance === BigInt(0))) {
    console.log("poolBalances",poolBalances)
    throw new Error(
      'Invalid Pool Balances - you must provide a distribution hint for the desired weightings of the pool'
    );
  }

  const poolWeight = poolBalances.reduce((tokenABalance, tokenBBalance) =>
    tokenABalance > tokenBBalance ? tokenABalance : tokenBBalance
  );

  const depositAmounts = poolBalances.map(balance => (addedFunds * balance) / poolWeight);

  return depositAmounts;
};
/**
 * Computes the distribution hint that should be used for setting the initial odds to `initialOdds`
 * @param initialOdds - an array of numbers proportional to the initial estimate of the probability of each outcome
 * @returns array of BigInt values representing the distribution hint
 * @see https://github.com/protofire/omen-exchange/blob/f35d30614e92baa50d0787cd8203668fdb59ee3b/app/src/util/tools/fpmm/liquidity/index.ts#L61
 */
export const calcDistributionHint = (initialOdds: number[]): bigint[] => {
  const allEqual = initialOdds.every(initialOdd => initialOdd === initialOdds[0]);
  if (allEqual) {
    return [];
  }
  const initialOddsBigNumber = initialOdds.map(odds => new Big(odds));
  const oddsProduct = initialOddsBigNumber.reduce((accOdd, odd) => accOdd.mul(odd));

  const distributionHint = initialOddsBigNumber
    .map(odd => oddsProduct.div(odd))
    .map(oddPercentage => oddPercentage.mul(1000000).round())
    .map(oddPercentage => BigInt(oddPercentage.toString()));

  return distributionHint;
};

export const calcTokensToReceiveAfterAddFunding = (
  fundsToAdd: bigint,
  marketOutcomeTokensAmount: bigint[],
  poolLiquidity: bigint
): bigint => {
  if (poolLiquidity > 0 && marketOutcomeTokensAmount.length > 0) {
    const poolWeight = marketOutcomeTokensAmount.reduce(
      (maxTokenAmount: bigint, tokenAmount: bigint) =>
        tokenAmount > maxTokenAmount ? tokenAmount : maxTokenAmount,
      marketOutcomeTokensAmount[0]
    );

    return (fundsToAdd * poolLiquidity) / poolWeight;
  } else {
    return fundsToAdd;
  }
};

/**
 * Compute the number of outcome tokens that will be sent to the user by the Market Maker
 * after removing `removedFunds` of pool shares.
 * @param removedFunds - the amount of liquidity pool tokens being sent to the market maker in return for underlying outcome tokens
 * @param poolBalances - the market maker's balances of outcome tokens
 * @param poolShareSupply - the total supply of liquidity pool tokens
 * @see https://github.com/protofire/omen-exchange/blob/f35d30614e92baa50d0787cd8203668fdb59ee3b/app/src/util/tools/fpmm/liquidity/index.ts#L114
 */
export const calcRemoveFundingSendAmounts = (
  removedFunds: bigint,
  holdingsBN: bigint[],
  poolShareSupply: bigint
): bigint[] => {
  const sendAmounts = holdingsBN.map(h =>
    poolShareSupply > 0 ? (h * removedFunds) / poolShareSupply : BigInt(0)
  );
  return sendAmounts;
};
