import {
  FixedProductMarketMaker_Filter,
  FixedProductMarketMaker_OrderBy,
  OrderDirection,
} from '@/queries/omen';

import { nowTimestamp } from '@/utils/time';
import { WXDAI, SDAI, AI_AGENTS_ALLOWLIST } from '@/constants';

export type OrderFilter = {
  name: string;
  key: string;
  orderBy: FixedProductMarketMaker_OrderBy;
  orderDirection: OrderDirection;
};

export const orderFilters: OrderFilter[] = [
  {
    name: 'Most active',
    key: 'active',
    orderBy: FixedProductMarketMaker_OrderBy.UsdRunningDailyVolume,
    orderDirection: OrderDirection.Desc,
  },
  {
    name: 'New',
    key: 'new',
    orderBy: FixedProductMarketMaker_OrderBy.CreationTimestamp,
    orderDirection: OrderDirection.Desc,
  },
  {
    name: 'High volume',
    key: 'high-volume',
    orderBy: FixedProductMarketMaker_OrderBy.UsdVolume,
    orderDirection: OrderDirection.Desc,
  },
  {
    name: 'Low volume',
    key: 'low-volume',
    orderBy: FixedProductMarketMaker_OrderBy.UsdVolume,
    orderDirection: OrderDirection.Asc,
  },
  {
    name: 'High liquidity',
    key: 'high-liquidity',
    orderBy: FixedProductMarketMaker_OrderBy.ScaledCollateralVolume,
    orderDirection: OrderDirection.Desc,
  },
  {
    name: 'Low liquidity',
    key: 'low-liquidity',
    orderBy: FixedProductMarketMaker_OrderBy.ScaledCollateralVolume,
    orderDirection: OrderDirection.Asc,
  },
  {
    name: 'Closing soon',
    key: 'closing',
    orderBy: FixedProductMarketMaker_OrderBy.OpeningTimestamp,
    orderDirection: OrderDirection.Asc,
  },
];

export type StateFilter = {
  name: string;
  key: string;
  when: FixedProductMarketMaker_Filter;
};

export const stateFilters: StateFilter[] = [
  {
    name: 'Open',
    key: 'open',
    when: {
      openingTimestamp_gt: nowTimestamp,
      scaledLiquidityParameter_gt: 0,
    },
  },
  {
    name: 'Closed',
    key: 'closed',
    when: {
      answerFinalizedTimestamp_lt: nowTimestamp,
    },
  },
  {
    name: 'Finalizing',
    key: 'finalizing',
    when: {
      resolutionTimestamp: null,
      answerFinalizedTimestamp_gt: nowTimestamp,
      answerFinalizedTimestamp_not: null,
      openingTimestamp_lt: nowTimestamp,
      isPendingArbitration: false,
      currentAnswer_not: null,
    },
  },
  {
    name: 'Pending',
    key: 'pending',
    when: {
      openingTimestamp_lt: nowTimestamp,
      isPendingArbitration: false,
      currentAnswer: null,
    },
  },
  {
    name: 'In Dispute',
    key: 'dispute',
    when: {
      isPendingArbitration: true,
    },
  },
];

export type CreatorFilter = {
  name: string;
  key: string;
  when: {
    creator_in?: string[];
  };
};

export const creatorFilters: CreatorFilter[] = [
  {
    name: 'All markets',
    key: 'all',
    when: {},
  },
  {
    name: 'AI markets',
    key: 'ai',
    when: { creator_in: AI_AGENTS_ALLOWLIST },
  },
];

export type TokenFilter = {
  name: string;
  key: string;
  when: {
    collateralToken_in?: string[];
  };
};

export const tokenFilters: TokenFilter[] = [
  {
    name: 'All tokens',
    key: 'all',
    when: {},
  },
  {
    name: 'WXDAI',
    key: 'wxdai',
    when: { collateralToken_in: [WXDAI.address] },
  },
  {
    name: 'sDAI',
    key: 'sdai',
    when: { collateralToken_in: [SDAI.address] },
  },
];
