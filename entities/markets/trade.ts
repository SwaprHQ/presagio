import { FpmmTrade, TradeType } from '@/queries/omen/types';
import { formatEther } from 'viem';

export const valueByTrade = {
  [TradeType.Buy]: (previousValue: number, newValue: number) => previousValue + newValue,
  [TradeType.Sell]: (previousValue: number, newValue: number) => previousValue - newValue,
};

interface tradesProps {
  fpmmTrades: FpmmTrade[] | undefined;
}

export const tradesOutcomeBalance = ({ fpmmTrades }: tradesProps) => {
  return (
    fpmmTrades?.reduce((acc, trade) => {
      const type = trade.type;
      const collateralAmountUSD = parseFloat(
        formatEther(trade.outcomeTokensTraded as bigint)
      );
      return valueByTrade[type](acc, collateralAmountUSD);
    }, 0) ?? 0
  );
};

export const tradesCollateralAmountUSDSpent = ({ fpmmTrades }: tradesProps) => {
  return (
    fpmmTrades?.reduce((acc, trade) => {
      const type = trade.type;
      const collateralAmountUSD = parseFloat(trade.collateralAmountUSD);
      return valueByTrade[type](acc, collateralAmountUSD);
    }, 0) ?? 0
  );
};
