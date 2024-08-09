import { FixedProductMarketMaker } from '@/queries/omen';
import { fromHex } from 'viem';
import { Outcome } from '@/entities';

export class Market {
  data: FixedProductMarketMaker;
  closingDate: Date;
  answer: number | null;
  isClosed: boolean;
  outcomes: Outcome[];
  hasLiquidity: boolean;

  constructor(market: FixedProductMarketMaker) {
    this.data = market;
    this.closingDate = new Date(+market.openingTimestamp * 1000);
    this.answer = market?.question?.currentAnswer
      ? fromHex(market.question.currentAnswer, 'number')
      : null;
    this.isClosed = this.answer !== null;
    this.hasLiquidity = Number(market.scaledLiquidityParameter) > 0;

    this.outcomes = [
      new Outcome(
        0,
        market.outcomes?.[0] || 'Option 1',
        market.id,
        market.outcomeTokenMarginalPrices?.[0]
      ),
      new Outcome(
        1,
        market.outcomes?.[1] || 'Option 2',
        market.id,
        market.outcomeTokenMarginalPrices?.[1]
      ),
    ];
  }

  isWinner(index: number) {
    return this.answer === index;
  }

  isLoser(index: number) {
    return this.answer !== null && this.answer !== index;
  }

  getWinnerOutcome() {
    return this.isClosed && this.answer !== null ? this.outcomes[this.answer] : null;
  }
}
