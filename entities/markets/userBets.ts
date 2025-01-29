import { Market } from '@/entities/markets/market';
import { MarketCondition } from '@/entities/markets/marketCondition';
import { Position } from '@/entities/markets/position';
import { Condition, UserPosition } from '@/queries/conditional-tokens/types';
import { FixedProductMarketMaker, FpmmTrade } from '@/queries/omen';
import { Position as ConditionalTokenPosition } from '@/queries/conditional-tokens/types';

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

  getWonBets() {
    return this.userPositions.filter(userPosition => {
      if (!userPosition.position.conditions[0].resolved) return false;

      const position = new Position(userPosition.position as ConditionalTokenPosition);
      const outcomeIndex = position.getOutcomeIndex();
      const market = new Market(userPosition.fpmm);

      return market.isWinner(outcomeIndex);
    });
  }

  getLostBets() {
    return this.userPositions.filter(userPosition => {
      if (!userPosition.position.conditions[0].resolved) return false;

      const position = new Position(userPosition.position as ConditionalTokenPosition);
      const outcomeIndex = position.getOutcomeIndex();
      const market = new Market(userPosition.fpmm);

      return market.isLoser(outcomeIndex);
    });
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
