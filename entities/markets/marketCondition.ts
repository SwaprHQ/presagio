import { Market } from '@/entities/markets/market';
import { Condition as ConditionalTokenCondition } from '@/queries/conditional-tokens/types';
import { FixedProductMarketMaker } from '@/queries/omen';

export class MarketCondition extends Market {
  condition: ConditionalTokenCondition;

  constructor(fpmm: FixedProductMarketMaker, condition: ConditionalTokenCondition) {
    super(fpmm);
    this.condition = condition;
  }

  canClaim(index: number) {
    const isResolved = this.condition.resolved;
    const hasPayoutDenominator = +this.condition.payoutDenominator > 0;

    return this.isWinner(index) && isResolved && hasPayoutDenominator;
  }

  alreadyClaimed(index: number, outcomeBalance: BigInt | string) {
    const zero = typeof outcomeBalance === 'bigint' ? BigInt(0) : 0;
    const balance = typeof outcomeBalance === 'string' ? +outcomeBalance : outcomeBalance;

    return this.canClaim(index) && balance === zero;
  }

  canRedeem(index: number, outcomeBalance: any) {
    return this.canClaim(index) && !this.alreadyClaimed(index, outcomeBalance);
  }
}
