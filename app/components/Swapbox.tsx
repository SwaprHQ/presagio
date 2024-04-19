"use client";

import { Button, IconButton } from "swapr-ui";
import { SwapInput } from "./ui/SwapInput";
import { useEffect, useState } from "react";
import { erc20Abi, formatEther, parseEther, Address } from "viem";
import { useAccount, useConfig, useReadContract } from "wagmi";
import { waitForTransactionReceipt, writeContract } from "wagmi/actions";
import MarketABI from "@/abi/market.json";
import { ConnectButton } from ".";
import { useReadCalcBuyAmount, useReadCalcSellAmount } from "@/model/market";
import { Outcome, Token } from "@/entities";
import { FixedProductMarketMaker } from "@/queries/omen";
import {
  CONDITIONAL_TOKEN_CONTRACT_ADDRESS,
  useReadBalance,
} from "@/model/conditionalTokens";
import ConditionalTokensABI from "@/abi/conditionalTokens.json";
import {
  addFraction,
  calcSellAmountInCollateral,
  formatTokenPrice,
  removeFraction,
} from "@/utils/price";

const WXADI = new Token(
  100,
  "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d",
  18,
  "WXDAI",
  "Wrapped xDAI"
);

const SLIPPAGE = 0.01;
const ONE_UNIT = "1";
const ROUNDING_PRECISON = 0.00000000001;

enum SwapDirection {
  BUY = "BUY",
  SELL = "SELL",
}

export const Swapbox = ({ market }: { market: FixedProductMarketMaker }) => {
  const id = market.id as Address;
  const outcome0 = new Outcome(0, market.outcomes?.[0] || "Option 1");
  const outcome1 = new Outcome(1, market.outcomes?.[1] || "Option 2");

  const { address, isDisconnected } = useAccount();
  const config = useConfig();

  const [tokenInAmount, setTokenInAmount] = useState("");
  const [tokenOutAmount, setTokenOutAmount] = useState("");
  const [amountOut, setAmountOut] = useState<bigint>();
  const [outcome, setOutcome] = useState<Outcome>(outcome0);
  const [swapDirection, setSwapDirection] = useState<SwapDirection>(
    SwapDirection.BUY
  );

  const changeOutcome = () => {
    outcome.index === 0 ? setOutcome(outcome1) : setOutcome(outcome0);
  };

  const amountWei = parseEther(tokenInAmount);

  const { data: sellAmount } = useReadCalcSellAmount(
    id,
    formatEther(amountOut || BigInt(0)),
    outcome.index
  );

  const { data: buyAmount, isLoading: isLoadingBuyAmount } =
    useReadCalcBuyAmount(id, tokenInAmount, outcome.index);

  const { data: allowance, refetch } = useReadContract({
    abi: erc20Abi,
    address: WXADI.address,
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

  const { data: balance } = useReadContract({
    abi: erc20Abi,
    address: WXADI.address,
    functionName: "balanceOf",
    args: [address as Address],
    query: { enabled: !!address },
  });

  const { data: outcome0Balance } = useReadBalance(
    address,
    market.collateralToken,
    market.condition?.id,
    1
  );

  const { data: outcome1Balance } = useReadBalance(
    address,
    market.collateralToken,
    market.condition?.id,
    2
  );

  useEffect(() => {
    if (swapDirection === SwapDirection.BUY) {
      if (!buyAmount) return;

      const amountOut = removeFraction(buyAmount as bigint, SLIPPAGE);
      const twoDigitsAmountOut = parseFloat(formatEther(amountOut)).toFixed(2);

      setAmountOut(amountOut);
      setTokenOutAmount(twoDigitsAmountOut);
    } else {
      if (!market.outcomeTokenAmounts || !tokenInAmount) return;

      const sellAmountInColleteral = calcSellAmountInCollateral(
        parseEther(tokenInAmount).toString(),
        market.outcomeTokenAmounts,
        outcome.index,
        parseFloat(formatEther(market.fee))
      );

      if (!sellAmountInColleteral) return;

      const twoDigitsAmountOut = parseFloat(
        formatEther(sellAmountInColleteral)
      ).toFixed(2);

      setAmountOut(sellAmountInColleteral);
      setTokenOutAmount(twoDigitsAmountOut);
    }
  }, [
    buyAmount,
    market.fee,
    market.outcomeTokenAmounts,
    outcome.index,
    swapDirection,
    tokenInAmount,
  ]);

  useEffect(() => {
    if (tokenInAmount === "") setTokenOutAmount("");
  }, [tokenInAmount]);

  const approveToken = async () => {
    try {
      const txHash = await writeContract(config, {
        abi: erc20Abi,
        address: WXADI.address,
        functionName: "approve",
        args: [id, amountWei],
      });
      await waitForTransactionReceipt(config, {
        hash: txHash,
      });
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const submitBet = async () => {
    try {
      const txHash = await writeContract(config, {
        abi: MarketABI,
        address: id,
        functionName: "buy",
        args: [amountWei, outcome.index, amountOut],
      });
      await waitForTransactionReceipt(config, {
        hash: txHash,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const approveNFT = async () => {
    try {
      const txHash = await writeContract(config, {
        abi: ConditionalTokensABI,
        address: CONDITIONAL_TOKEN_CONTRACT_ADDRESS,
        functionName: "setApprovalForAll",
        args: [id, true],
      });
      await waitForTransactionReceipt(config, {
        hash: txHash,
      });
      refetchNFTAllowence();
    } catch (error) {
      console.error(error);
    }
  };

  const sellBet = async () => {
    if (!amountOut || !sellAmount) return;

    const roundedAmountOut = removeFraction(amountOut, ROUNDING_PRECISON);
    const maxSellAmount = addFraction(sellAmount as bigint, SLIPPAGE);

    try {
      const txHash = await writeContract(config, {
        abi: MarketABI,
        address: id,
        functionName: "sell",
        args: [roundedAmountOut, outcome.index, maxSellAmount],
      });
      await waitForTransactionReceipt(config, {
        hash: txHash,
      });
    } catch (error) {
      console.error(error);
    }
  };

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

  const swapState = {
    [SwapDirection.BUY]: {
      inToken: WXADI.symbol,
      outToken: outcome.name,
      changeInToken: () => {},
      changeOutToken: changeOutcome,
      tokenPrice: formatTokenPrice(oneShareBuyPrice as bigint),
      isLoading: isLoadingBuyAmount,
      balance: balance as bigint,
      submit: submitBet,
      approve: approveToken,
      isAllowed: allowance && !!amountWei && allowance >= amountWei,
      buttonText: "Bet",
      onSwitchButtonClick: () => setSwapDirection(SwapDirection.SELL),
    },
    [SwapDirection.SELL]: {
      inToken: outcome.name,
      outToken: WXADI.symbol,
      changeInToken: changeOutcome,
      changeOutToken: () => {},
      tokenPrice: formatTokenPrice(oneShareSellPrice as bigint),
      isLoading: false,
      balance: outcomeBalances[outcome.index] as bigint,
      submit: sellBet,
      approve: approveNFT,
      isAllowed: isNFTAllowed,
      buttonText: "Sell bet",
      onSwitchButtonClick: () => setSwapDirection(SwapDirection.BUY),
    },
  };

  const currentState = swapState[swapDirection];

  const maxBalance = () => {
    setTokenInAmount(formatEther(currentState.balance as bigint));
  };

  return (
    <div className="space-y-2 relative">
      <SwapInput
        title="You Swap"
        value={tokenInAmount}
        onChange={(event) => {
          setTokenInAmount(event.target.value);
        }}
        onClick={currentState.changeInToken}
        selectedToken={currentState.inToken}
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
        value={!!tokenOutAmount ? tokenOutAmount : ""}
        onChange={(event) => {
          setTokenOutAmount(event.target.value);
        }}
        selectedToken={currentState.outToken}
        onClick={currentState.changeOutToken}
      />
      <div className="space-y-4">
        <div className="px-3 py-1">
          <div className="flex items-center justify-between">
            <p className=" text-text-low-em">Price</p>
            <div className="flex items-center space-x-1">
              <p>1 {currentState.inToken}</p>
              <p>=</p>
              <p className="text-text-success-em">
                {currentState.tokenPrice} {currentState.outToken}
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
        ) : !tokenInAmount || +tokenInAmount === 0 ? (
          <Button width="full" variant="pastel" size="lg" disabled>
            Enter amount
          </Button>
        ) : currentState.isLoading ? (
          <Button width="full" variant="pastel" size="lg" disabled>
            Fetching price
          </Button>
        ) : +tokenInAmount > +formatEther(currentState.balance) ? (
          <Button width="full" variant="pastel" size="lg" disabled>
            Insufficient {currentState.inToken} balance
          </Button>
        ) : currentState.isAllowed ? (
          <Button
            width="full"
            variant="pastel"
            size="lg"
            onClick={currentState.submit}
          >
            {currentState.buttonText}
          </Button>
        ) : (
          <Button
            width="full"
            variant="pastel"
            size="lg"
            onClick={currentState.approve}
          >
            Allow
          </Button>
        )}
      </div>
    </div>
  );
};
