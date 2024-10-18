import { FpmmTrade, TradeType } from '@/queries/omen/types';
import { formatEther } from 'viem';

export const valueByTrade = {
  [TradeType.Buy]: (previousValue: number, newValue: number) => previousValue + newValue,
  [TradeType.Sell]: (previousValue: number, newValue: number) => previousValue - newValue,
};

export const valueByTradeBigInt = {
  [TradeType.Buy]: (previousValue: bigint, newValue: bigint) => previousValue + newValue,
  [TradeType.Sell]: (previousValue: bigint, newValue: bigint) => previousValue - newValue,
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

export const tradesCollateralAmountSpent = ({ fpmmTrades }: TradesProps) => {
  return (
    fpmmTrades?.reduce((acc, trade) => {
      const type = trade.type;
      return valueByTradeBigInt[type](acc, BigInt(trade.collateralAmount));
    }, BigInt(0)) ?? BigInt(0)
  );
};

export const outcomeTokensTradedTotal = ({ fpmmTrades }: TradesProps) => {
  return (
    fpmmTrades?.reduce((acc, trade) => {
      const type = trade.type;
      return valueByTradeBigInt[type](acc, BigInt(trade.outcomeTokensTraded));
    }, BigInt(0)) ?? BigInt(0)
  );
};

export const tradesVolume = ({ fpmmTrades }: TradesProps) => {
  return (
    fpmmTrades?.reduce((acc, trade) => {
      const collateralAmount = BigInt(trade.collateralAmount);
      return acc + collateralAmount;
    }, BigInt(0)) ?? BigInt(0)
  );
};

export const getOutcomeUserTrades = ({ fpmmTrades }: TradesProps) => [
  fpmmTrades?.filter(trade => trade.outcomeIndex === '0') || [],
  fpmmTrades?.filter(trade => trade.outcomeIndex === '1') || [],
];
