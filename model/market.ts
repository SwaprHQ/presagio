import MarketABI from "@/abi/market.json";
import { Abi, Address, parseEther } from "viem";
import { UseReadContractParameters, useReadContract } from "wagmi";
import { TradeType } from "@/queries/omen";

export const useReadMarketContract = ({
  address,
  functionName,
  args,
  query,
}: UseReadContractParameters) => {
  return useReadContract({
    abi: MarketABI as Abi,
    address,
    functionName,
    args,
    query,
  });
};

export const useReadCalcBuyAmount = (
  address: Address,
  tokenInAmount: string,
  outcomeIndex: number
) => {
  const amountWei = parseEther(tokenInAmount);
  return useReadMarketContract({
    address,
    functionName: "calcBuyAmount",
    args: [amountWei, outcomeIndex],
    query: { enabled: !!tokenInAmount },
  });
};

export const useReadCalcSellAmount = (
  address: Address,
  tokenOutAmount: string,
  outcomeIndex: number
) => {
  const amountWei = parseEther(tokenOutAmount);
  return useReadMarketContract({
    address,
    functionName: "calcSellAmount",
    args: [amountWei, outcomeIndex],
    query: { enabled: !!tokenOutAmount },
  });
};

export const tradeTypeMathOperation = {
  [TradeType.Buy]: (previousValue: number, newValue: number) =>
    previousValue + newValue,
  [TradeType.Sell]: (previousValue: number, newValue: number) =>
    previousValue - newValue,
};
