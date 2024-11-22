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
 */
export const calcAddFundingDepositedAmounts = (
  addedFunds: bigint,
  poolBalances: bigint[]
): bigint[] => {
  if (poolBalances.some(poolBalance => poolBalance === BigInt(0))) {
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

/**
 * Compute the number of outcome tokens that will be sent to the user by the market maker after funding it for the first time with `addedFunds` of collateral.
 * @dev The distribution hint plays the role of the pool's balances so we can just forward this to calcAddFundingSendAmounts
 * @param addedFunds - the amount of collateral being added to the market maker as liquidity
 * @param distributionHint - a distribution hint as calculated by `calcDistributionHint`
 */
export const calcInitialFundingSendAmounts = (
  addedFunds: bigint,
  distributionHint: bigint[]
): bigint[] | null => calcAddFundingOutcomeTokensReturned(addedFunds, distributionHint);

/**
 * Compute the number of liquidity pool tokens that will be sent to the user by the Market Maker
 * after adding `addedFunds` of collateral.
 * @param addedFunds - the amount of collateral being added to the market maker as liquidity
 * @param poolBalances - the market maker's balances of outcome tokens
 * @param poolShareSupply - the total supply of liquidity pool tokens
 */
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
/**
 * Compute the numbers of outcome tokens that will be added to the market maker after adding `addedFunds` of collateral.
 * @dev The distribution hint plays the role of the pool's balances so we can just forward this to calcAddFundingSendAmounts
 * @param addedFunds - the amount of collateral being added to the market maker as liquidity
 * @param poolBalances - the market maker's balances of outcome tokens
 */
export const calcInitialFundingDepositedAmounts = (
  addedFunds: bigint,
  distributionHint: bigint[]
): bigint[] => {
  if (distributionHint.some(percentage => percentage === BigInt(0))) {
    throw new Error(
      "Invalid Distribution Hint - can't assign a weight of zero to an outcome"
    );
  }
  return calcAddFundingDepositedAmounts(addedFunds, distributionHint);
};
export const calcSharesBought = (
  poolShares: bigint,
  balances: bigint[],
  shares: bigint[],
  collateralTokenAmount: bigint
) => {
  const sendAmountsAfterAddingFunding = calcAddFundingOutcomeTokensReturned(
    collateralTokenAmount,
    balances,
    poolShares
  );

  const sharesAfterAddingFunding = sendAmountsAfterAddingFunding
    ? shares.map((balance, i) => balance + sendAmountsAfterAddingFunding[i])
    : shares.map(share => share);

  const sendAmountsAfterRemovingFunding = calcRemoveFundingSendAmounts(
    collateralTokenAmount,
    balances,
    poolShares
  );
  const depositedTokens = sendAmountsAfterRemovingFunding.reduce(
    (min: bigint, amount: bigint) => (amount < min ? amount : min)
  );
  const sharesAfterRemovingFunding = shares.map((share, i) => {
    return share + sendAmountsAfterRemovingFunding[i] - depositedTokens;
  });

  return sharesAfterAddingFunding[0] - sharesAfterRemovingFunding[0];
};
