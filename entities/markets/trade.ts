import { FpmmTrade, TradeType } from '@/queries/omen/types';
import { formatEther } from 'viem';

export const valueByTrade = {
  [TradeType.Buy]: (previousValue: number, newValue: number) => previousValue + newValue,
  [TradeType.Sell]: (previousValue: number, newValue: number) => previousValue - newValue,
};

interface TradesProps {
  fpmmTrades: FpmmTrade[] | undefined;
}

export const tradesOutcomeBalance = ({ fpmmTrades }: TradesProps) => {
  return (
    fpmmTrades?.reduce((acc, trade) => {
      const type = trade.type;
      const collateralAmount = parseFloat(
        formatEther(trade.outcomeTokensTraded as bigint)
      );
      return valueByTrade[type](acc, collateralAmount);
    }, 0) ?? 0
  );
};

export const tradesCollateralAmountUSDSpent = ({ fpmmTrades }: TradesProps) => {
  return (
    fpmmTrades?.reduce((acc, trade) => {
      const type = trade.type;
      const collateralAmountUSD = parseFloat(trade.collateralAmountUSD);
      return valueByTrade[type](acc, collateralAmountUSD);
    }, 0) ?? 0
  );
};

export const tradesVolume = ({ fpmmTrades }: TradesProps) => {
  return (
    fpmmTrades?.reduce((acc, trade) => {
      const collateralAmountUSD = parseFloat(trade.collateralAmountUSD);
      return acc + collateralAmountUSD;
    }, 0) ?? 0
  );
};

export const getOutcomeUserTrades = ({ fpmmTrades }: TradesProps) => [
  fpmmTrades?.filter(trade => trade.outcomeIndex === '0') || [],
  fpmmTrades?.filter(trade => trade.outcomeIndex === '1') || [],
];
