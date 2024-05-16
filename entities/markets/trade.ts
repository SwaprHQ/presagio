import { TradeType } from "@/queries/omen/types";

export const valueByTrade = {
  [TradeType.Buy]: (previousValue: number, newValue: number) =>
    previousValue + newValue,
  [TradeType.Sell]: (previousValue: number, newValue: number) =>
    previousValue - newValue,
};
