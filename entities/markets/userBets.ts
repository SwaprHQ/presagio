import { Condition, UserPosition } from '@/queries/conditional-tokens/types';
import { FixedProductMarketMaker, FpmmTrade } from '@/queries/omen';

export interface UserBets extends UserPosition {
  fpmmTrades: FpmmTrade[];
  fpmm: FixedProductMarketMaker;
  condition: Condition;
}
