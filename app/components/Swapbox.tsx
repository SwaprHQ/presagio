"use client";

import { Button, IconButton } from "swapr-ui";
import { SwapInput } from "./ui/SwapInput";
import { useEffect, useState } from "react";
import { erc20Abi, formatEther, parseEther, Address } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { ConnectButton } from ".";
import { useReadCalcBuyAmount } from "@/model/market";
import { Outcome, Token } from "@/entities";
import { FixedProductMarketMaker } from "@/queries/omen";
import {
  CONDITIONAL_TOKEN_CONTRACT_ADDRESS,
  useReadBalance,
} from "@/model/conditionalTokens";
import ConditionalTokensABI from "@/abi/conditionalTokens.json";
import {
  calcSellAmountInCollateral,
  formatTokenPrice,
  removeFraction,
} from "@/utils/price";
import { ConfirmTrade } from "./ConfirmTrade";
import { ModalId, useModalContext } from "@/context/ModalContext";
import { WXDAI } from "@/constants";

export const SLIPPAGE = 0.01;
const ONE_UNIT = "1";

export enum SwapDirection {
  BUY = "BUY",
  SELL = "SELL",
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

export const Swapbox = ({ market }: { market: FixedProductMarketMaker }) => {
  const id = market.id as Address;
  const outcome0 = new Outcome(0, market.outcomes?.[0] || "Option 1", id);
  const outcome1 = new Outcome(1, market.outcomes?.[1] || "Option 2", id);

  const { address, isDisconnected } = useAccount();
  const { openModal } = useModalContext();

  const [tokenAmountIn, setTokenAmountIn] = useState("");
  const [tokenAmountOut, setTokenAmountOut] = useState<bigint>();
  const [outcome, setOutcome] = useState<Outcome>(outcome0);
  const [swapDirection, setSwapDirection] = useState<SwapDirection>(
    SwapDirection.BUY
  );

  const changeOutcome = (outcome?: Outcome) => {
    outcome && setOutcome(outcome);
  };

  const amountWei = parseEther(tokenAmountIn);
  const twoDecimalsTokenOutAmount = tokenAmountOut
    ? parseFloat(formatEther(tokenAmountOut)).toFixed(2)
    : "";

  const { data: buyAmount, isLoading: isLoadingBuyAmount } =
    useReadCalcBuyAmount(id, tokenAmountIn, outcome.index);

  const { data: allowance, refetch: refetchCollateralAllowence } =
    useReadContract({
      abi: erc20Abi,
      address: WXDAI.address,
      functionName: "allowance",
      args: [address as Address, id],
      query: { enabled: !!address },
    });

  const { data: isNFTAllowed, refetch: refetchNFTAllowence } = useReadContract({
    abi: ConditionalTokensABI,
    address: CONDITIONAL_TOKEN_CONTRACT_ADDRESS,
    functionName: "isApprovedForAll",
    args: [address as Address, id],
    query: { enabled: !!address },
  });

  const { data: balance, refetch: refetchCollateralBalance } = useReadContract({
    abi: erc20Abi,
    address: WXDAI.address,
    functionName: "balanceOf",
    args: [address as Address],
    query: { enabled: !!address },
  });

  const { data: outcome0Balance, refetch: refetchOutcome0Balance } =
    useReadBalance(address, market.collateralToken, market.condition?.id, 1);

  const { data: outcome1Balance, refetch: refetchOutcome1Balance } =
    useReadBalance(address, market.collateralToken, market.condition?.id, 2);

  useEffect(() => {
    if (swapDirection === SwapDirection.BUY) {
      if (!buyAmount) return;

      const amountOut = removeFraction(buyAmount as bigint, SLIPPAGE);

      setTokenAmountOut(amountOut);
    } else {
      if (!market.outcomeTokenAmounts || !tokenAmountIn) return;

      const sellAmountInColleteral = calcSellAmountInCollateral(
        parseEther(tokenAmountIn).toString(),
        market.outcomeTokenAmounts,
        outcome.index,
        parseFloat(formatEther(market.fee))
      );

      if (!sellAmountInColleteral) return;

      setTokenAmountOut(sellAmountInColleteral);
    }
  }, [
    buyAmount,
    market.fee,
    market.outcomeTokenAmounts,
    outcome.index,
    swapDirection,
    tokenAmountIn,
  ]);

  useEffect(() => {
    if (tokenAmountIn === "") setTokenAmountOut(undefined);
  }, [tokenAmountIn]);

  const { data: oneShareBuyPrice } = useReadCalcBuyAmount(
    id,
    ONE_UNIT,
    outcome.index
  );

  const oneShareSellPrice = calcSellAmountInCollateral(
    parseEther(ONE_UNIT).toString(),
    market.outcomeTokenAmounts,
    outcome.index,
    parseFloat(formatEther(market.fee))
  );

  const outcomeBalances = [outcome0Balance, outcome1Balance];

  const swapState: Record<SwapDirection, SwapState> = {
    [SwapDirection.BUY]: {
      inToken: WXDAI,
      outToken: outcome,
      changeInToken: () => {},
      changeOutToken: changeOutcome,
      tokenPrice: formatTokenPrice(oneShareBuyPrice as bigint),
      isLoading: isLoadingBuyAmount,
      balance: balance as bigint,
      isAllowed: !!allowance && !!amountWei && allowance >= amountWei,
      buttonText: "Bet",
      onSwitchButtonClick: () => setSwapDirection(SwapDirection.SELL),
      refetchAllowence: refetchCollateralAllowence,
    },
    [SwapDirection.SELL]: {
      inToken: outcome,
      outToken: WXDAI,
      changeInToken: changeOutcome,
      changeOutToken: () => {},
      tokenPrice: formatTokenPrice(oneShareSellPrice as bigint),
      isLoading: false,
      balance: outcomeBalances[outcome.index] as bigint,
      isAllowed: !!isNFTAllowed,
      buttonText: "Sell bet",
      onSwitchButtonClick: () => setSwapDirection(SwapDirection.BUY),
      refetchAllowence: refetchNFTAllowence,
    },
  };

  const currentState = swapState[swapDirection];

  const maxBalance = () => {
    currentState.balance &&
      setTokenAmountIn(formatEther(currentState.balance as bigint));
  };

  const openBetModal = () => {
    openModal(ModalId.CONFIRM_SWAP);
  };

  const outcomeList = [outcome0, outcome1];

  return (
    <>
      <div className="relative space-y-2">
        <SwapInput
          title="You Swap"
          value={tokenAmountIn}
          onChange={(event) => {
            setTokenAmountIn(event.target.value);
          }}
          onClick={currentState.changeInToken}
          selectedToken={currentState.inToken}
          tokenList={outcomeList}
        >
          <div className="flex text-sm items-center justify-end space-x-1.5">
            <p className="text-text-low-em">
              Balance:
              {currentState.balance
                ? parseFloat(formatEther(currentState.balance)).toFixed(2)
                : "0"}
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
          className="absolute top-[100px] left-[calc(50%_-_20px)]"
          onClick={currentState.onSwitchButtonClick}
        />
        <SwapInput
          title="To Receive"
          value={twoDecimalsTokenOutAmount}
          selectedToken={currentState.outToken}
          onClick={currentState.changeOutToken}
          tokenList={outcomeList}
        />
        <div className="space-y-4">
          <div className="px-3 py-1">
            <div className="flex items-center justify-between">
              <p className=" text-text-low-em">Price</p>
              <div className="flex items-center space-x-1">
                <p>1 {currentState.inToken.symbol}</p>
                <p>=</p>
                <p
                  className={
                    currentState.outToken instanceof Outcome
                      ? currentState.outToken.index === 0
                        ? "text-text-success-main"
                        : "text-text-danger-main"
                      : ""
                  }
                >
                  {currentState.tokenPrice} {currentState.outToken.symbol}
                </p>
                <p className=" text-text-low-em">(≈ $1)</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className=" text-text-low-em">Slippage</p>
              <p>{SLIPPAGE * 100}%</p>
            </div>
          </div>
          {isDisconnected ? (
            <ConnectButton width="full" size="lg">
              Connect
            </ConnectButton>
          ) : !tokenAmountIn || +tokenAmountIn === 0 ? (
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
            <Button
              width="full"
              variant="pastel"
              size="lg"
              onClick={openBetModal}
            >
              {currentState.buttonText}
            </Button>
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
        }}
        onApprove={currentState.refetchAllowence}
      />
    </>
  );
};
