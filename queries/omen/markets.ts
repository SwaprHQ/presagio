import { gql, request } from 'graphql-request';
import {
  FixedProductMarketMaker_Filter,
  FpmmTrade_Filter,
  FpmmTransaction_Filter,
  Query,
  QueryAccountArgs,
  QueryConditionArgs,
  QueryFixedProductMarketMakerArgs,
  QueryFixedProductMarketMakersArgs,
  QueryFpmmTradesArgs,
  QueryFpmmTransactionsArgs,
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

const getMarketsQuery = (
  params: QueryFixedProductMarketMakersArgs & FixedProductMarketMaker_Filter
) => gql`
  query GetMarkets(
    $first: Int!
    $skip: Int!
    $orderBy: String
    $orderDirection: String
    $title_contains_nocase: String
    $creator_in: [String]
    $category_contains: String
    $openingTimestamp_gt: Int
    $openingTimestamp_lt: Int
    $isPendingArbitration: Boolean
    $currentAnswer: Bytes
    $answerFinalizedTimestamp_lt: Int
    $openingTimestamp_lte: Int
  ) {
    fixedProductMarketMakers(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: {
        outcomeSlotCount: 2
        ${params.title_contains_nocase ? 'title_contains_nocase: $title_contains_nocase' : ''}
        ${params.creator_in ? 'creator_in: $creator_in' : ''}
        ${params.category_contains ? 'category_contains: $category_contains' : ''}
        ${params.openingTimestamp_gt ? 'openingTimestamp_gt: $openingTimestamp_gt' : ''}
        ${params.openingTimestamp_lt ? 'openingTimestamp_lt: $openingTimestamp_lt' : ''}
        ${params.isPendingArbitration ? 'isPendingArbitration: $isPendingArbitration' : ''}
        ${params.currentAnswer ? 'currentAnswer: $currentAnswer' : ''}
        ${params.answerFinalizedTimestamp_lt ? 'answerFinalizedTimestamp_lt: $answerFinalizedTimestamp_lt' : ''}
        ${params.openingTimestamp_lte ? 'openingTimestamp_lte: $openingTimestamp_lte' : ''}
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

const getMarketTransactionsQuery = gql`
  query getMarketTransactions(
    $fpmm: ID!
    $first: Int!
    $skip: Int!
    $orderBy: String
    $orderDirection: String
  ) {
    fpmmTransactions(
      where: { fpmm: $fpmm }
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      id
      user {
        id
        __typename
      }
      fpmm {
        collateralToken
        __typename
      }
      fpmmType
      transactionType
      collateralTokenAmount
      sharesOrPoolTokenAmount
      creationTimestamp
      transactionHash
      additionalSharesCost
      __typename
    }
  }
`;

const getMarketTradesQuery = gql`
  query GetMarketUserTrades(
    $first: Int!
    $fpmm: ID!
    $skip: Int
    $orderBy: String
    $orderDirection: String
  ) {
    fpmmTrades(
      where: { fpmm: $fpmm }
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      creationTimestamp
      id
      outcomeIndex
      outcomeTokensTraded
      transactionHash
      fpmm {
        outcomes
      }
      creator {
        id
      }
    }
  }
`;

const getMarketTradesAndTransactionsQuery = gql`
  query GetMarketUserTradesAndTransactions(
    $tradesFirst: Int!
    $transactionsFirst: Int!
    $fpmm: ID!
    $skip: Int
    $orderBy: String
    $orderDirection: String
  ) {
    fpmmTrades(
      first: $tradesFirst
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: { fpmm: $fpmm }
    ) {
      creationTimestamp
      id
      outcomeIndex
      outcomeTokensTraded
      transactionHash
      fpmm {
        outcomes
      }
      creator {
        id
      }
    }
    fpmmTransactions(
      first: $transactionsFirst
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: { fpmm: $fpmm }
    ) {
      id
      user {
        id
        __typename
      }
      fpmm {
        collateralToken
        __typename
      }
      fpmmType
      transactionType
      collateralTokenAmount
      sharesOrPoolTokenAmount
      creationTimestamp
      transactionHash
      additionalSharesCost
      __typename
    }
  }
`;

const getMarketTransactions = async (
  params: QueryFpmmTransactionsArgs & FpmmTransaction_Filter
) =>
  request<Pick<Query, 'fpmmTransactions'>>(
    OMEN_SUBGRAPH_URL,
    getMarketTransactionsQuery,
    params
  );

const getMarket = async (params: QueryFixedProductMarketMakerArgs) =>
  request<Pick<Query, 'fixedProductMarketMaker'>>(
    OMEN_SUBGRAPH_URL,
    getMarketQuery,
    params
  );

const getMarkets = async (
  params: QueryFixedProductMarketMakersArgs & FixedProductMarketMaker_Filter
) =>
  request<Pick<Query, 'fixedProductMarketMakers'>>(
    OMEN_SUBGRAPH_URL,
    getMarketsQuery(params),
    params
  );

const getAccountMarkets = async (
  params: QueryAccountArgs & QueryFixedProductMarketMakersArgs
) => request<Pick<Query, 'account'>>(OMEN_SUBGRAPH_URL, getAccountMarketsQuery, params);

const getConditionMarket = async (params: QueryConditionArgs) =>
  request<Pick<Query, 'conditions'>>(OMEN_SUBGRAPH_URL, getConditionMarketQuery, params);

const getMarketUserTrades = async (params: QueryFpmmTradesArgs & FpmmTrade_Filter) =>
  request<Pick<Query, 'fpmmTrades'>>(OMEN_SUBGRAPH_URL, getMarketUserTradesQuery, params);

const getMarketTrades = async (params: QueryFpmmTradesArgs & FpmmTrade_Filter) =>
  request<Pick<Query, 'fpmmTrades'>>(OMEN_SUBGRAPH_URL, getMarketTradesQuery, params);

const getMarketTradesAndTransactions = async (
  params: (QueryFpmmTradesArgs | QueryFpmmTransactionsArgs) &
    (FpmmTrade_Filter | FpmmTransaction_Filter)
) => {
  const modifiedParams = {
    ...params,
    tradesFirst: params.first || 0,
    // Txs can have more results than trades (liquidity events)
    // We need to fetch + 2 txs to be able to merge tx and trades
    transactionsFirst: params.first ? params.first + 2 : 0,
  };

  return request<Pick<Query, 'fpmmTrades' | 'fpmmTransactions'>>(
    OMEN_SUBGRAPH_URL,
    getMarketTradesAndTransactionsQuery,
    modifiedParams
  );
};

export {
  getMarket,
  getMarkets,
  getAccountMarkets,
  getConditionMarket,
  getMarketUserTrades,
  getMarketTransactions,
  getMarketTrades,
  getMarketTradesAndTransactions,
};
