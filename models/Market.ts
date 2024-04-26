import { FixedProductMarketMaker } from "@/queries/omen";
import { fromHex } from "viem";

export class MarketModel {
  data: FixedProductMarketMaker;
  closingDate: Date;
  answer: number | null;
  isClosed: boolean;

  constructor(market: FixedProductMarketMaker) {
    this.data = market;
    this.closingDate = new Date(+market.openingTimestamp * 1000);
    this.answer = market.question?.currentAnswer
      ? fromHex(market.question.currentAnswer, "number")
      : null;
    this.isClosed = !!this.answer;
  }

  isWinner(outcomeIndex: number) {
    return this.answer == outcomeIndex - 1;
  }

  isLoser(outcomeIndex: number) {
    return this.isClosed && this.answer != outcomeIndex - 1;
  }
}
