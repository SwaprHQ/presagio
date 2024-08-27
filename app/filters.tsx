import {
  FixedProductMarketMaker_Filter,
  FixedProductMarketMaker_OrderBy,
  OrderDirection,
} from '@/queries/omen';
import { AI_AGENTS_ALLOWLIST } from '../constants';

export type OrderFilter = {
  name: string;
  key: string;
  orderBy: FixedProductMarketMaker_OrderBy;
  orderDirection: OrderDirection;
};

export const orderFilters: OrderFilter[] = [
  {
    name: 'New',
    key: 'new',
    orderBy: FixedProductMarketMaker_OrderBy.CreationTimestamp,
    orderDirection: OrderDirection.Desc,
  },
  {
    name: 'Most active',
    key: 'active',
    orderBy: FixedProductMarketMaker_OrderBy.UsdRunningDailyVolume,
    orderDirection: OrderDirection.Desc,
  },
  {
    name: 'High volume',
    key: 'high',
    orderBy: FixedProductMarketMaker_OrderBy.UsdVolume,
    orderDirection: OrderDirection.Desc,
  },
  {
    name: 'Low volume',
    key: 'low',
    orderBy: FixedProductMarketMaker_OrderBy.UsdVolume,
    orderDirection: OrderDirection.Asc,
  },
  {
    name: 'Closing soon',
    key: 'closing',
    orderBy: FixedProductMarketMaker_OrderBy.OpeningTimestamp,
    orderDirection: OrderDirection.Asc,
  },
];

const nowTimestamp = Math.floor(Date.now() / 1000);

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
    name: 'AI markets',
    key: 'ai',
    when: { creator_in: AI_AGENTS_ALLOWLIST },
  },
  {
    name: 'All markets',
    key: 'all',
    when: {},
  },
];
