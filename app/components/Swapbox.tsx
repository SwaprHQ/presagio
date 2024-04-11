"use client";

import { Button, IconButton } from "swapr-ui";
import { SwapInput } from "./ui/SwapInput";
import { useEffect, useState } from "react";
import { erc20Abi, formatEther, parseEther, Address } from "viem";
import { useAccount, useConfig, useReadContract } from "wagmi";
import { waitForTransactionReceipt, writeContract } from "wagmi/actions";
import MarketABI from "@/abi/market.json";
import { ConnectButton } from ".";
import { useReadCalcBuyAmount } from "@/model/market";

const WXDAI_ADDRESS = "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d";
const SLIPPAGE = 0.01;
const ONE_SHARE = "1";

// Removes the given fraction from the given integer-bounded amount and returns the value as an original type.
const removeFraction = (amount: bigint, fraction: number): bigint => {
  if (fraction >= 1 || fraction <= 0)
    throw `The given basisPoints ${fraction} is not in the range [0, 1].`;

  const basisPoints = 10000;

  const fractionInBasisPoints = fraction * basisPoints;

  const keepFraction = basisPoints - fractionInBasisPoints;

  return (amount * BigInt(keepFraction)) / BigInt(basisPoints);
};

export const Swapbox = ({ id }: { id: Address }) => {
  const { address, isDisconnected } = useAccount();
  const config = useConfig();

  const [tokenInAmount, setTokenInAmount] = useState("");
  const [tokenOutAmount, setTokenOutAmount] = useState("");
  const [minAmountOut, setMinAmountOut] = useState<bigint>();

  const outcomeIndex = 0;

  const amountWei = parseEther(tokenInAmount);

  const { data: buyAmount } = useReadCalcBuyAmount(
    id,
    tokenInAmount,
    outcomeIndex
  );

  const { data: oneSharePrice } = useReadCalcBuyAmount(
    id,
    ONE_SHARE,
    outcomeIndex
  );

  const { data: allowance, refetch } = useReadContract({
    abi: erc20Abi,
    address: WXDAI_ADDRESS,
    functionName: "allowance",
    args: [address as Address, id],
    query: { enabled: !!address },
  });

  const { data: balance } = useReadContract({
    abi: erc20Abi,
    address: WXDAI_ADDRESS,
    functionName: "balanceOf",
    args: [address as Address],
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (!buyAmount) return;

    const amountOut = removeFraction(buyAmount as bigint, SLIPPAGE);
    const twoDigitsAmountOut = parseFloat(formatEther(amountOut)).toFixed(2);

    setMinAmountOut(amountOut);
    setTokenOutAmount(twoDigitsAmountOut);
  }, [buyAmount]);

  useEffect(() => {
    if (tokenInAmount === "") setTokenOutAmount("");
  }, [tokenInAmount]);

  const approveToken = async () => {
    try {
      const txHash = await writeContract(config, {
        abi: erc20Abi,
        address: WXDAI_ADDRESS,
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
        args: [amountWei, outcomeIndex, minAmountOut],
      });
      await waitForTransactionReceipt(config, {
        hash: txHash,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const maxBalance = () => {
    setTokenInAmount(formatEther(balance as bigint));
  };

  const isAllowed = allowance && !!amountWei && allowance >= amountWei;

  const oneSharePriceUSD = oneSharePrice
    ? parseFloat(formatEther(oneSharePrice as bigint)).toFixed(2)
    : "-";

  return (
    <div className="space-y-2 relative">
      <SwapInput
        title="You Swap"
        value={tokenInAmount}
        onChange={(event) => {
          setTokenInAmount(event.target.value);
        }}
        onClick={() => console.log("I want to change token")}
        selectedToken="WXDAI"
      >
        <div className="flex text-sm items-center justify-end space-x-1.5">
          {!!balance && (
            <>
              <p className="text-text-low-em">
                Balance: {parseFloat(formatEther(balance)).toFixed(2)}
              </p>
              <Button
                variant="ghost"
                className="text-sm font-semibold text-text-primary-main"
                onClick={maxBalance}
              >
                Use MAX
              </Button>
            </>
          )}
        </div>
      </SwapInput>
      <IconButton
        name="swap-vertical"
        variant="outline"
        className="absolute top-[100px] left-[calc(50%_-_20px)]"
      />
      <SwapInput
        title="To Receive"
        selectedToken="YES"
        value={tokenOutAmount}
        onChange={(event) => {
          setTokenOutAmount(event.target.value);
        }}
      />
      <div className="space-y-4">
        <div className="px-3 py-1">
          <div className="flex items-center justify-between">
            <p className=" text-text-low-em">Price</p>
            <div className="flex items-center space-x-1">
              <p>1 WXDAI</p>
              <p>=</p>
              <p className="text-text-success-em">{oneSharePriceUSD} YES</p>
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
        ) : !tokenInAmount ? (
          <Button width="full" variant="pastel" size="lg" disabled>
            Enter amount
          </Button>
        ) : isAllowed ? (
          <Button width="full" variant="pastel" size="lg" onClick={submitBet}>
            Bet
          </Button>
        ) : (
          <Button
            width="full"
            variant="pastel"
            size="lg"
            onClick={approveToken}
          >
            Allow
          </Button>
        )}
      </div>
    </div>
  );
};
