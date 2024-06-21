import { gql, request } from 'graphql-request';
import {
  FixedProductMarketMaker_Filter,
  FpmmTrade_Filter,
  Query,
  QueryAccountArgs,
  QueryConditionArgs,
  QueryFixedProductMarketMakerArgs,
  QueryFixedProductMarketMakersArgs,
  QueryFpmmTradesArgs,
} from './types';
import { OMEN_SUBGRAPH_URL } from '@/constants';

const getMarketQuery = gql`
  query GetMarket($id: ID!) {
    fixedProductMarketMaker(id: $id) {
      id
      creator
      collateralToken
      fee
      collateralVolume
      outcomeTokenAmounts
      outcomeTokenMarginalPrices
      condition {
        id
        payouts
        oracle
        __typename
      }
      templateId
      title
      outcomes
      category
      language
      lastActiveDay
      runningDailyVolume
      arbitrator
      creationTimestamp
      openingTimestamp
      timeout
      resolutionTimestamp
      currentAnswer
      currentAnswerTimestamp
      currentAnswerBond
      answerFinalizedTimestamp
      scaledLiquidityParameter
      runningDailyVolumeByHour
      isPendingArbitration
      arbitrationOccurred
      runningDailyVolumeByHour
      curatedByDxDao
      curatedByDxDaoOrKleros
      question {
        id
        data
        currentAnswer
        answers {
          answer
          bondAggregate
          __typename
        }
        __typename
      }
      klerosTCRregistered
      curatedByDxDaoOrKleros
      curatedByDxDao
      submissionIDs {
        id
        status
        __typename
      }
      scalarLow
      scalarHigh
      usdVolume
      __typename
    }
  }
`;

const marketDataFragment = gql`
  fragment marketData on FixedProductMarketMaker {
    id
    collateralVolume
    collateralToken
    creationTimestamp
    lastActiveDay
    outcomeTokenAmounts
    runningDailyVolumeByHour
    scaledLiquidityParameter
    title
    outcomes
    openingTimestamp
    arbitrator
    category
    templateId
    scaledLiquidityParameter
    curatedByDxDao
    klerosTCRregistered
    outcomeTokenMarginalPrices
    condition {
      id
      oracle
      scalarLow
      scalarHigh
      __typename
    }
    question {
      id
      data
      currentAnswer
      outcomes
      answers {
        answer
        bondAggregate
        __typename
      }
      __typename
    }
    outcomes
    outcomeTokenMarginalPrices
    usdVolume
    __typename
  }
`;

const getMarketsQuery = gql`
  query GetMarkets(
    $first: Int!
    $skip: Int!
    $orderBy: String
    $orderDirection: String
    $title_contains_nocase: String
    $creator_in: [String]
    $category_contains: String
  ) {
    fixedProductMarketMakers(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: {
        outcomeSlotCount: 2
        title_contains_nocase: $title_contains_nocase
        creator_in: $creator_in
        category_contains: $category_contains
      }
    ) {
      ...marketData
      __typename
    }
  }

  ${marketDataFragment}
`;

export const getMarketsOpenQuery = gql`
  query GetMarkets(
    $first: Int!
    $skip: Int!
    $orderBy: String
    $orderDirection: String
    $title_contains_nocase: String
    $creator_in: [String]
    $category_contains: String
    $openingTimestamp_gt: Int
  ) {
    fixedProductMarketMakers(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: {
        outcomeSlotCount: 2
        title_contains_nocase: $title_contains_nocase
        creator_in: $creator_in
        category_contains: $category_contains
        openingTimestamp_gt: $openingTimestamp_gt
      }
    ) {
      ...marketData
      __typename
    }
  }

  ${marketDataFragment}
`;

export const getMarketsPendingQuery = gql`
  query GetMarkets(
    $first: Int!
    $skip: Int!
    $orderBy: String
    $orderDirection: String
    $title_contains_nocase: String
    $creator_in: [String]
    $category_contains: String
    $openingTimestamp_lt: Int
    $isPendingArbitration: Boolean
    $currentAnswer: Bytes
  ) {
    fixedProductMarketMakers(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: {
        outcomeSlotCount: 2
        title_contains_nocase: $title_contains_nocase
        creator_in: $creator_in
        category_contains: $category_contains
        openingTimestamp_lt: $openingTimestamp_lt
        isPendingArbitration: $isPendingArbitration
        currentAnswer: $currentAnswer
      }
    ) {
      ...marketData
      __typename
    }
  }

  ${marketDataFragment}
`;

export const getMarketsClosedQuery = gql`
  query GetMarkets(
    $first: Int!
    $skip: Int!
    $orderBy: String
    $orderDirection: String
    $title_contains_nocase: String
    $creator_in: [String]
    $category_contains: String
    $answerFinalizedTimestamp_lt: Int
  ) {
    fixedProductMarketMakers(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: {
        outcomeSlotCount: 2
        title_contains_nocase: $title_contains_nocase
        creator_in: $creator_in
        category_contains: $category_contains
        answerFinalizedTimestamp_lt: $answerFinalizedTimestamp_lt
      }
    ) {
      ...marketData
      __typename
    }
  }

  ${marketDataFragment}
`;

export const getMarketsDisputeQuery = gql`
  query GetMarkets(
    $first: Int!
    $skip: Int!
    $orderBy: String
    $orderDirection: String
    $title_contains_nocase: String
    $creator_in: [String]
    $category_contains: String
    $isPendingArbitration: Boolean
  ) {
    fixedProductMarketMakers(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: {
        outcomeSlotCount: 2
        title_contains_nocase: $title_contains_nocase
        creator_in: $creator_in
        category_contains: $category_contains
        isPendingArbitration: $isPendingArbitration
      }
    ) {
      ...marketData
      __typename
    }
  }

  ${marketDataFragment}
`;

export const getMarketsClosingQuery = gql`
  query GetMarkets(
    $first: Int!
    $skip: Int!
    $orderBy: String
    $orderDirection: String
    $title_contains_nocase: String
    $creator_in: [String]
    $category_contains: String
    $openingTimestamp_gt: Int
    $openingTimestamp_lte: Int
  ) {
    fixedProductMarketMakers(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: {
        outcomeSlotCount: 2
        title_contains_nocase: $title_contains_nocase
        creator_in: $creator_in
        category_contains: $category_contains
        openingTimestamp_gt: $openingTimestamp_gt
        openingTimestamp_lte: $openingTimestamp_lte
      }
    ) {
      ...marketData
      __typename
    }
  }

  ${marketDataFragment}
`;

const getAccountMarketsQuery = gql`
  query GetMyMarkets(
    $id: String!
    $first: Int!
    $skip: Int!
    $orderBy: String
    $orderDirection: String
  ) {
    account(id: $id) {
      fpmmParticipations(
        first: $first
        skip: $skip
        orderBy: $orderBy
        orderDirection: $orderDirection
      ) {
        fpmm: fpmm {
          ...marketData
          __typename
        }
        __typename
      }
      __typename
    }
  }

  ${marketDataFragment}
`;

const getConditionMarketQuery = gql`
  query OmenConditionsQuery($id: ID!) {
    conditions(where: { id: $id }) {
      fixedProductMarketMakers {
        ...marketData
      }
    }
  }

  ${marketDataFragment}
`;

const getMarketUserTradesQuery = gql`
  query GetMarketUserTrades($creator: ID!, $fpmm: ID!, $outcomeIndex_in: [BigInt!]) {
    fpmmTrades(
      where: { fpmm: $fpmm, creator: $creator, outcomeIndex_in: $outcomeIndex_in }
    ) {
      creator {
        id
      }
      title
      outcomeIndex
      id
      feeAmount
      collateralAmount
      collateralAmountUSD
      collateralToken
      outcomeTokenMarginalPrice
      outcomeTokensTraded
      oldOutcomeTokenMarginalPrice
      transactionHash
      creationTimestamp
      type
    }
  }
`;

const getMarket = async (params: QueryFixedProductMarketMakerArgs) =>
  request<Pick<Query, 'fixedProductMarketMaker'>>(
    OMEN_SUBGRAPH_URL,
    getMarketQuery,
    params
  );

const getMarkets = async (
  params: QueryFixedProductMarketMakersArgs & FixedProductMarketMaker_Filter,
  query: string = getMarketsQuery
) => request<Pick<Query, 'fixedProductMarketMakers'>>(OMEN_SUBGRAPH_URL, query, params);

const getAccountMarkets = async (
  params: QueryAccountArgs & QueryFixedProductMarketMakersArgs
) => request<Pick<Query, 'account'>>(OMEN_SUBGRAPH_URL, getAccountMarketsQuery, params);

const getConditionMarket = async (params: QueryConditionArgs) =>
  request<Pick<Query, 'conditions'>>(OMEN_SUBGRAPH_URL, getConditionMarketQuery, params);

const getMarketUserTrades = async (params: QueryFpmmTradesArgs & FpmmTrade_Filter) =>
  request<Pick<Query, 'fpmmTrades'>>(OMEN_SUBGRAPH_URL, getMarketUserTradesQuery, params);

export {
  getMarket,
  getMarkets,
  getAccountMarkets,
  getConditionMarket,
  getMarketUserTrades,
};
