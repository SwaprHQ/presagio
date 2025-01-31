import { FixedProductMarketMaker } from '@/queries/omen';
import { fromHex } from 'viem';
import { Outcome } from '@/entities';
import { isPast } from 'date-fns';
import { nowTimestamp } from '@/utils/time';

const INVALID_ANSWER_HEX =
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

export class Market {
  static INVALID_ANSWER = -1;

  fpmm: FixedProductMarketMaker;
  closingDate: Date;
  answer: number | null;
  currentAnswer: number | null;
  isAnswerFinal: boolean;
  isClosed: boolean;
  outcomes: Outcome[];
  hasLiquidity: boolean;
  isAnswerInvalid: boolean;

  constructor(fpmm: FixedProductMarketMaker) {
    this.fpmm = fpmm;
    this.closingDate = new Date(+fpmm.openingTimestamp * 1000);
    this.isAnswerFinal =
      !!fpmm.resolutionTimestamp || fpmm.answerFinalizedTimestamp < nowTimestamp;

    this.currentAnswer = fpmm.question?.currentAnswer
      ? fpmm.question.currentAnswer === INVALID_ANSWER_HEX
        ? Market.INVALID_ANSWER
        : fromHex(fpmm.question.currentAnswer, 'number')
      : null;
    this.answer =
      fpmm.question && this.currentAnswer !== null && this.isAnswerFinal
        ? fpmm.question.currentAnswer === INVALID_ANSWER_HEX
          ? Market.INVALID_ANSWER
          : fromHex(fpmm.question.currentAnswer, 'number')
        : null;
    this.isAnswerInvalid = this.answer === Market.INVALID_ANSWER;

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
      new Outcome(-1, 'Invalid', fpmm.id),
    ];
  }

  isWinner(index: number) {
    return this.answer === index;
  }

  isLoser(index: number) {
    return this.answer !== null && this.answer !== index;
  }

  getWinnerOutcome() {
    return this.isClosed && this.answer !== null && !this.isAnswerInvalid
      ? this.outcomes[this.answer]
      : null;
  }

  getCurrentAnswerOutcome() {
    return this.currentAnswer !== null
      ? this.outcomes.at(this.currentAnswer) || null
      : null;
  }

  getMarketStatus() {
    if (this.isAnswerInvalid) return 'invalid market';

    if (!this.isAnswerFinal && this.isClosed) return 'finalizing';

    if (this.isClosed) return 'closed';

    return 'open';
  }
}
