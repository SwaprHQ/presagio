import { Market } from '@/entities/markets/market';
import { Condition as ConditionalTokenCondition } from '@/queries/conditional-tokens/types';

export class MarketCondition {
  market: Market;
  condition: ConditionalTokenCondition;

  constructor(market: Market, condition: ConditionalTokenCondition) {
    this.market = market;
    this.condition = condition;
  }

  canClaim(index: number) {
    const isResolved = this.condition.resolved;
    const hasPayoutDenominator = +this.condition.payoutDenominator > 0;

    return this.market.isWinner(index) && isResolved && hasPayoutDenominator;
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
