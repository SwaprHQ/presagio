import MarketABI from '@/abi/market.json';
import { Abi, Address, parseEther } from 'viem';
import { gnosis } from 'viem/chains';
import { UseReadContractParameters, useReadContract } from 'wagmi';

export const MARKET_MAKER_FACTORY_ADDRESS = '0x9083A2B699c0a4AD06F63580BDE2635d26a3eeF0';

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
    chainId: gnosis.id,
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
    functionName: 'calcBuyAmount',
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
    functionName: 'calcSellAmount',
    args: [amountWei, outcomeIndex],
    query: { enabled: !!tokenOutAmount },
  });
};
