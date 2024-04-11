import { gql, request } from "graphql-request";
import {
  FixedProductMarketMaker_Filter,
  InputMaybe,
  Query,
  QueryAccountArgs,
  QueryFixedProductMarketMakerArgs,
  QueryFixedProductMarketMakersArgs,
} from "./types";

const OMEN_SUBGRAPH_URL =
  "https://api.thegraph.com/subgraphs/name/protofire/omen-xdai";

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

const getMarketsQuery = gql`
  query GetMarkets(
    $first: Int!
    $skip: Int!
    $orderBy: String
    $orderDirection: String
  ) {
    fixedProductMarketMakers(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      ...marketData
      __typename
    }
  }

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

const getMarket = async (params: QueryFixedProductMarketMakerArgs) =>
  request<Pick<Query, "fixedProductMarketMaker">>(
    OMEN_SUBGRAPH_URL,
    getMarketQuery,
    params
  );

const getMarkets = async (params: QueryFixedProductMarketMakersArgs) =>
  request<Pick<Query, "fixedProductMarketMakers">>(
    OMEN_SUBGRAPH_URL,
    getMarketsQuery,
    params
  );

const getAccountMarkets = async (
  params: QueryAccountArgs & QueryFixedProductMarketMakersArgs
) =>
  request<Pick<Query, "account">>(
    OMEN_SUBGRAPH_URL,
    getAccountMarketsQuery,
    params
  );

export { getMarket, getMarkets, getAccountMarkets };
