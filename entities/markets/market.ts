import { FixedProductMarketMaker } from '@/queries/omen';
import { fromHex } from 'viem';
import { Outcome } from '@/entities';
import { isPast } from 'date-fns';

export class Market {
  fpmm: FixedProductMarketMaker;
  closingDate: Date;
  answer: number | null;
  isClosed: boolean;
  outcomes: Outcome[];
  hasLiquidity: boolean;

  constructor(fpmm: FixedProductMarketMaker) {
    this.fpmm = fpmm;
    this.closingDate = new Date(+fpmm.openingTimestamp * 1000);
    this.answer =
      fpmm?.question?.currentAnswer && !!fpmm.resolutionTimestamp
        ? fromHex(fpmm.question.currentAnswer, 'number')
        : null;
    this.isClosed = this.answer !== null || isPast(this.closingDate);
    this.hasLiquidity = Number(fpmm.scaledLiquidityParameter) > 0;

    this.outcomes = [
      new Outcome(
        0,
        fpmm.outcomes?.[0] || 'Option 1',
        fpmm.id,
        fpmm.outcomeTokenMarginalPrices?.[0]
      ),
      new Outcome(
        1,
        fpmm.outcomes?.[1] || 'Option 2',
        fpmm.id,
        fpmm.outcomeTokenMarginalPrices?.[1]
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
