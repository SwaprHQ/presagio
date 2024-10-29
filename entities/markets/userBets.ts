import { MarketCondition } from '@/entities/markets/marketCondition';
import { Position } from '@/entities/markets/position';
import { Condition, UserPosition } from '@/queries/conditional-tokens/types';
import { FixedProductMarketMaker, FpmmTrade } from '@/queries/omen';

export interface UserBet extends UserPosition {
  fpmmTrades: FpmmTrade[];
  fpmm: FixedProductMarketMaker;
  condition: Condition;
}

export class UserBetsManager {
  userPositions: UserBet[];

  constructor(userPositions: UserBet[] = []) {
    this.userPositions = userPositions;
  }

  getActiveBets() {
    return this.userPositions.filter(
      userPosition => !userPosition.position.conditions[0].resolved
    );
  }

  getCompletedBets() {
    return this.userPositions.filter(
      userPosition => userPosition.position.conditions[0].resolved
    );
  }

  getUnredeemedBets() {
    return this.userPositions.filter(userPosition => {
      const position = new Position(userPosition.position);
      const outcomeIndex = position.getOutcomeIndex();
      const marketCondition = new MarketCondition(userPosition.fpmm, position.condition);
      return marketCondition.canRedeem(outcomeIndex, userPosition.balance);
    });
  }
}
