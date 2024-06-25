import {
  FixedProductMarketMaker_Filter,
  FixedProductMarketMaker_OrderBy,
  OrderDirection,
  getMarketsClosedQuery,
  getMarketsClosingQuery,
  getMarketsDisputeQuery,
  getMarketsOpenQuery,
  getMarketsPendingQuery,
} from '@/queries/omen';

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
];

const nowTimestamp = Math.floor(Date.now() / 1000);
const in24HoursTimestamp = Math.floor(
  new Date().setHours(new Date().getHours() + 24) / 1000
);

export type StateFilter = {
  name: string;
  key: string;
  query: string;
  state: FixedProductMarketMaker_Filter;
};

export const stateFilters: StateFilter[] = [
  {
    name: 'Open',
    key: 'open',
    state: {
      openingTimestamp_gt: nowTimestamp,
    },
    query: getMarketsOpenQuery,
  },
  {
    name: 'Closing soon',
    key: 'closing',
    state: {
      openingTimestamp_lte: in24HoursTimestamp,
      openingTimestamp_gt: nowTimestamp,
    },
    query: getMarketsClosingQuery,
  },
  {
    name: 'Closed',
    key: 'closed',
    state: {
      answerFinalizedTimestamp_lt: nowTimestamp,
    },
    query: getMarketsClosedQuery,
  },
  {
    name: 'Pending',
    key: 'pending',
    state: {
      openingTimestamp_lt: nowTimestamp,
      isPendingArbitration: false,
      currentAnswer: null,
    },
    query: getMarketsPendingQuery,
  },
  {
    name: 'In Dispute',
    key: 'dispute',
    state: {
      isPendingArbitration: true,
    },
    query: getMarketsDisputeQuery,
  },
];
