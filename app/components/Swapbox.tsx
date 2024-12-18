'use client';

import {
  Button,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ToggleGroup,
  ToggleGroupOption,
} from '@swapr/ui';
import { SwapInput } from './ui/SwapInput';
import { useEffect, useState } from 'react';
import { parseEther, Address, formatEther } from 'viem';
import { useAccount, useReadContract } from 'wagmi';
import { ExecuteTxButtonWrapper } from '.';
import { Outcome, Token } from '@/entities';
import { FixedProductMarketMaker } from '@/queries/omen';
import {
  CONDITIONAL_TOKEN_CONTRACT_ADDRESS,
  useReadBalance,
  useReadCalcBuyAmount,
} from '@/hooks/contracts';
import ConditionalTokensABI from '@/abi/conditionalTokens.json';
import {
  calcSellAmountInCollateral,
  formatTokenPrice,
  removeFraction,
} from '@/utils/price';
import { ConfirmTrade } from './ConfirmTrade';
import { ModalId, useModal } from '@/context/ModalContext';
import { ChainId } from '@/constants';
import {
  useReadAllowance,
  useReadBalanceOf,
  useReadToken,
} from '@/hooks/contracts/erc20';
import { gnosis } from 'viem/chains';
import { formatEtherWithFixedDecimals, formatValueWithFixedDecimals } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { getTokenUSDPrice } from '@/queries/mobula';
import { useSlippage } from '@/context';

const ONE_UNIT = '1';

export enum SwapDirection {
  BUY = 'BUY',
  SELL = 'SELL',
}

export type SwapState = {
  inToken: Token | Outcome;
  outToken: Token | Outcome;
  changeInToken: (outcome?: Outcome) => void;
  changeOutToken: (outcome?: Outcome) => void;
  tokenPrice: string;
  isLoading: boolean;
  balance: bigint;
  isAllowed: boolean;
  buttonText: string;
  onSwitchButtonClick: () => void;
  refetchAllowence: () => void;
};

interface SwapboxProps {
  fixedProductMarketMaker: FixedProductMarketMaker;
}
export const Swapbox = ({ fixedProductMarketMaker }: SwapboxProps) => {
  const id = fixedProductMarketMaker.id as Address;
  const outcome0 = new Outcome(
    0,
    fixedProductMarketMaker.outcomes?.[0] || 'Option 1',
    id
  );
  const outcome1 = new Outcome(
    1,
    fixedProductMarketMaker.outcomes?.[1] || 'Option 2',
    id
  );

  const { address } = useAccount();
  const { openModal } = useModal();
  const { slippage } = useSlippage();

  const [tokenAmountIn, setTokenAmountIn] = useState('');
  const [tokenAmountOut, setTokenAmountOut] = useState<bigint>();
  const [outcome, setOutcome] = useState<Outcome>(outcome0);
  const [swapDirection, setSwapDirection] = useState<SwapDirection>(SwapDirection.BUY);

  const changeOutcome = (outcome?: Outcome) => {
    outcome && setOutcome(outcome);
  };

  const amountWei = parseEther(tokenAmountIn);
  const formattedTokenOutAmount = tokenAmountOut
    ? formatEtherWithFixedDecimals(tokenAmountOut)
    : '';

  const { data: buyAmount, isLoading: isLoadingBuyAmount } = useReadCalcBuyAmount(
    id,
    tokenAmountIn,
    outcome.index
  );

  const { data: allowance, refetch: refetchCollateralAllowence } = useReadAllowance({
    address,
    tokenAddress: fixedProductMarketMaker.collateralToken,
    spenderAddress: id,
  });

  const { data: isNFTAllowed, refetch: refetchNFTAllowence } = useReadContract({
    abi: ConditionalTokensABI,
    address: CONDITIONAL_TOKEN_CONTRACT_ADDRESS,
    functionName: 'isApprovedForAll',
    args: [address as Address, id],
    query: { enabled: !!address },
    chainId: gnosis.id,
  });

  const { data: balance, refetch: refetchCollateralBalance } = useReadBalanceOf({
    address,
    tokenAddress: fixedProductMarketMaker.collateralToken,
  });

  const { data: outcome0Balance, refetch: refetchOutcome0Balance } = useReadBalance(
    address,
    fixedProductMarketMaker.collateralToken,
    fixedProductMarketMaker.condition?.id,
    1
  );

  const { data: outcome1Balance, refetch: refetchOutcome1Balance } = useReadBalance(
    address,
    fixedProductMarketMaker.collateralToken,
    fixedProductMarketMaker.condition?.id,
    2
  );

  const { name, symbol, decimals } = useReadToken({
    tokenAddress: fixedProductMarketMaker.collateralToken,
  });

  const isBuying = swapDirection === SwapDirection.BUY;

  useEffect(() => {
    if (isBuying) {
      if (!buyAmount) return;
      const amountOut = removeFraction(buyAmount as bigint, slippage);

      setTokenAmountOut(amountOut);
    } else {
      if (!fixedProductMarketMaker.outcomeTokenAmounts || !tokenAmountIn) return;

      const sellAmountInColleteral = calcSellAmountInCollateral(
        parseEther(tokenAmountIn).toString(),
        fixedProductMarketMaker.outcomeTokenAmounts,
        outcome.index,
        parseFloat(formatEther(fixedProductMarketMaker.fee))
      );

      if (!sellAmountInColleteral) return;

      setTokenAmountOut(sellAmountInColleteral);
    }
  }, [
    buyAmount,
    fixedProductMarketMaker.fee,
    fixedProductMarketMaker.outcomeTokenAmounts,
    isBuying,
    outcome.index,
    tokenAmountIn,
    slippage,
  ]);

  useEffect(() => {
    if (tokenAmountIn === '') setTokenAmountOut(undefined);
  }, [tokenAmountIn]);

  const { data: oneShareBuyPrice } = useReadCalcBuyAmount(id, ONE_UNIT, outcome.index);

  const oneShareSellPrice = calcSellAmountInCollateral(
    parseEther(ONE_UNIT).toString(),
    fixedProductMarketMaker.outcomeTokenAmounts,
    outcome.index,
    parseFloat(formatEther(fixedProductMarketMaker.fee))
  );

  const outcomeBalances = [outcome0Balance, outcome1Balance];

  const { data: collateralTokenUSDPrice } = useQuery({
    queryKey: ['tokenPriceUSD', fixedProductMarketMaker.collateralToken],
    queryFn: async () => await getTokenUSDPrice(fixedProductMarketMaker.collateralToken),
    staleTime: Infinity,
  });

  if (!name || !symbol || !decimals) return;

  const collateralToken = new Token(
    ChainId.GNOSIS,
    fixedProductMarketMaker.collateralToken,
    decimals,
    symbol,
    name
  );

  const swapState: Record<SwapDirection, SwapState> = {
    [SwapDirection.BUY]: {
      inToken: collateralToken,
      outToken: outcome,
      changeInToken: () => {},
      changeOutToken: changeOutcome,
      tokenPrice: formatTokenPrice(oneShareBuyPrice as bigint),
      isLoading: isLoadingBuyAmount,
      balance: balance as bigint,
      isAllowed: !!allowance && !!amountWei && BigInt(allowance) >= amountWei,
      buttonText: 'Bet',
      onSwitchButtonClick: () => setSwapDirection(SwapDirection.SELL),
      refetchAllowence: refetchCollateralAllowence,
    },
    [SwapDirection.SELL]: {
      inToken: outcome,
      outToken: collateralToken,
      changeInToken: changeOutcome,
      changeOutToken: () => {},
      tokenPrice: formatTokenPrice(oneShareSellPrice as bigint),
      isLoading: false,
      balance: outcomeBalances[outcome.index] as bigint,
      isAllowed: !!isNFTAllowed,
      buttonText: 'Sell bet',
      onSwitchButtonClick: () => setSwapDirection(SwapDirection.BUY),
      refetchAllowence: refetchNFTAllowence,
    },
  };

  const currentState = swapState[swapDirection];

  const maxBalance = () => {
    currentState.balance && setTokenAmountIn(formatEther(currentState.balance as bigint));
  };

  const openBetModal = () => {
    openModal(ModalId.CONFIRM_SWAP);
  };

  const outcomeList = [outcome0, outcome1];

  const priceInUSD = collateralTokenUSDPrice
    ? isBuying
      ? collateralTokenUSDPrice
      : collateralTokenUSDPrice * +currentState.tokenPrice
    : null;

  const formattedPriceInUSD = priceInUSD && formatValueWithFixedDecimals(priceInUSD, 2);

  const potentialProfit =
    tokenAmountOut && tokenAmountIn && isBuying
      ? +formatEther(tokenAmountOut) - +tokenAmountIn
      : null;

  const formattedPotentialProfit =
    potentialProfit !== null && formatValueWithFixedDecimals(potentialProfit, 2);

  const potentialProfitInUSD =
    potentialProfit !== null && collateralTokenUSDPrice
      ? formatValueWithFixedDecimals(collateralTokenUSDPrice * potentialProfit, 2)
      : null;

  const resetSwapState = () => {
    setTokenAmountIn('');
    setTokenAmountOut(undefined);
  };

  return (
    <>
      <div className="relative space-y-2 font-medium">
        <SwapInput
          title="You Swap"
          value={tokenAmountIn}
          onChange={event => {
            setTokenAmountIn(event.target.value);
          }}
          onTokenClick={currentState.changeInToken}
          selectedToken={currentState.inToken}
          tokenList={outcomeList}
        >
          <div className="flex min-h-8 items-center justify-end space-x-1.5 text-sm">
            <p className="text-text-low-em">
              Balance:{' '}
              {currentState.balance
                ? formatEtherWithFixedDecimals(currentState.balance)
                : 0}
            </p>
            {!!currentState.balance && (
              <Button
                variant="ghost"
                className="text-sm font-semibold text-text-primary-main"
                onClick={maxBalance}
              >
                Use MAX
              </Button>
            )}
          </div>
        </SwapInput>
        <IconButton
          name="swap-vertical"
          variant="outline"
          className="absolute left-[calc(50%_-_20px)] top-[100px]"
          onClick={currentState.onSwitchButtonClick}
        />
        <SwapInput
          title="To Receive"
          value={formattedTokenOutAmount}
          selectedToken={currentState.outToken}
          onTokenClick={currentState.changeOutToken}
          tokenList={outcomeList}
          readOnly
          type="text"
        />
        <div className="space-y-4">
          <div className="px-3 py-1">
            <div className="flex items-center justify-between">
              <p className="text-text-low-em">Price</p>
              <div className="flex items-center space-x-1">
                <p>1 {currentState.inToken.symbol}</p>
                <p>=</p>
                <p
                  className={
                    currentState.outToken instanceof Outcome
                      ? currentState.outToken.index === 0
                        ? 'text-text-success-main'
                        : 'text-text-danger-main'
                      : ''
                  }
                >
                  {currentState.tokenPrice} {currentState.outToken.symbol}
                </p>
                {formattedPriceInUSD && (
                  <p className="text-text-low-em">(≈ ${formattedPriceInUSD})</p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-text-low-em">Slippage</p>
              <div className="flex items-center space-x-2">
                <p>{slippage * 100}%</p>
                <SlippageSettings />
              </div>
            </div>
            {!!potentialProfit && (
              <div className="flex items-center justify-between">
                <p className="text-text-low-em">Potential profit</p>
                <div className="flex items-center space-x-1">
                  <p className="text-text-success-main">
                    {formattedPotentialProfit} {collateralToken.symbol}
                  </p>
                  {potentialProfitInUSD && (
                    <p className="text-text-low-em">(≈ ${potentialProfitInUSD})</p>
                  )}
                </div>
              </div>
            )}
          </div>
          {currentState?.isLoading ? (
            <Button width="full" variant="pastel" size="lg" disabled>
              Fetching price
            </Button>
          ) : (
            <ExecuteTxButtonWrapper>
              {!tokenAmountIn || +tokenAmountIn === 0 ? (
                <Button width="full" variant="pastel" size="lg" disabled>
                  Enter amount
                </Button>
              ) : currentState.isLoading ? (
                <Button width="full" variant="pastel" size="lg" disabled>
                  Fetching price
                </Button>
              ) : +tokenAmountIn > +formatEther(currentState.balance) ? (
                <Button width="full" variant="pastel" size="lg" disabled>
                  Insufficient {currentState.inToken.symbol} balance
                </Button>
              ) : (
                <Button width="full" variant="pastel" size="lg" onClick={openBetModal}>
                  {currentState.buttonText}
                </Button>
              )}
            </ExecuteTxButtonWrapper>
          )}
        </div>
      </div>
      <ConfirmTrade
        swapState={currentState}
        swapDirection={swapDirection}
        marketId={id}
        outcomeIndex={outcome.index}
        tokenAmountIn={tokenAmountIn}
        tokenAmountOut={tokenAmountOut}
        onSwap={() => {
          refetchCollateralBalance();
          refetchOutcome0Balance();
          refetchOutcome1Balance();
          resetSwapState();
        }}
        onApprove={currentState.refetchAllowence}
      />
    </>
  );
};

const SlippageSettings = () => {
  const { slippage, updateSlippage } = useSlippage();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton name="settings" size="xs" variant="ghost" />
      </PopoverTrigger>
      <PopoverContent className="px-4">
        <div className="space-y-2">
          <div className="flex items-center text-text-low-em">
            <p className="text-xs font-bold">Slippage tolerance</p>
          </div>
          <ToggleGroup value={slippage} onChange={updateSlippage}>
            <ToggleGroupOption value={0.0001}>0.01%</ToggleGroupOption>
            <ToggleGroupOption value={0.001}>0.1%</ToggleGroupOption>
            <ToggleGroupOption value={0.01}>1%</ToggleGroupOption>
          </ToggleGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
};
