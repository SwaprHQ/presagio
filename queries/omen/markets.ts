import { gql, request } from 'graphql-request';
import {
  FixedProductMarketMaker_Filter,
  FixedProductMarketMaker_OrderBy,
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
import { getUserPositions } from '../conditional-tokens';
import { Market, Position, UserBet } from '@/entities';

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
      scaledLiquidityMeasure
      scaledCollateralVolume
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
    title
    outcomes
    openingTimestamp
    arbitrator
    category
    templateId
    scaledLiquidityParameter
    scaledLiquidityMeasure
    scaledCollateralVolume
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
    resolutionTimestamp
    usdRunningDailyVolume
    usdVolume
    currentAnswer
    currentAnswerTimestamp
    fee
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
    $id: String
    $title_contains_nocase: String
    $creator_in: [String]
    $category_contains: String
    $openingTimestamp_gt: Int
    $openingTimestamp_lt: Int
    $isPendingArbitration: Boolean
    $currentAnswer: Bytes
    $currentAnswer_not: Bytes
    $answerFinalizedTimestamp_lt: Int
    $answerFinalizedTimestamp_gt: Int
    $openingTimestamp_lte: Int
    $scaledLiquidityParameter_gt: Int
    $resolutionTimestamp: Int
    $currentAnswerTimestamp_gt: Int
    $collateralToken_in: [String]
    ) {
    fixedProductMarketMakers(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: {
        outcomeSlotCount: 2
        ${params.title_contains_nocase ? 'title_contains_nocase: $title_contains_nocase' : ''}
        ${params.id ? 'id: $id' : ''}
        ${params.creator_in ? 'creator_in: $creator_in' : ''}
        ${params.category_contains ? 'category_contains: $category_contains' : ''}
        ${params.openingTimestamp_gt ? 'openingTimestamp_gt: $openingTimestamp_gt' : ''}
        ${params.openingTimestamp_lt ? 'openingTimestamp_lt: $openingTimestamp_lt' : ''}
        ${params.isPendingArbitration !== undefined ? 'isPendingArbitration: $isPendingArbitration' : ''}
        ${params.currentAnswer !== undefined ? 'currentAnswer: $currentAnswer' : ''}
        ${params.currentAnswer_not !== undefined ? 'currentAnswer_not: $currentAnswer_not' : ''}
        ${params.answerFinalizedTimestamp_lt ? 'answerFinalizedTimestamp_lt: $answerFinalizedTimestamp_lt' : ''}
        ${params.answerFinalizedTimestamp_gt ? 'answerFinalizedTimestamp_gt: $answerFinalizedTimestamp_gt' : ''}
        ${params.openingTimestamp_lte ? 'openingTimestamp_lte: $openingTimestamp_lte' : ''}
        ${params.scaledLiquidityParameter_gt !== undefined ? 'scaledLiquidityParameter_gt: $scaledLiquidityParameter_gt' : ''}
        ${params.resolutionTimestamp !== undefined ? 'resolutionTimestamp: $resolutionTimestamp' : ''}
        ${params.currentAnswerTimestamp_gt !== undefined ? 'currentAnswerTimestamp_gt: $currentAnswerTimestamp_gt' : ''}
        ${params.collateralToken_in !== undefined ? 'collateralToken_in: $collateralToken_in' : ''}
        ${!params.category_contains ? 'category_not_in: ["test", "jobs"]' : ''}
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
        creator
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

type PrimaryOrderBy =
  | FixedProductMarketMaker_OrderBy.UsdRunningDailyVolume
  | FixedProductMarketMaker_OrderBy.CreationTimestamp
  | FixedProductMarketMaker_OrderBy.UsdVolume
  | FixedProductMarketMaker_OrderBy.ScaledCollateralVolume
  | FixedProductMarketMaker_OrderBy.OpeningTimestamp;
const getMarkets = async (
  params: QueryFixedProductMarketMakersArgs & FixedProductMarketMaker_Filter
) => {
  const response = await request<Pick<Query, 'fixedProductMarketMakers'>>(
    OMEN_SUBGRAPH_URL,
    getMarketsQuery(params),
    params
  );

  /**
   * The Graph doesn't allow to order by multiple fields.
   *
   * This fn applies a secondary sort criteria if we get a primary sort result that
   * has multiple markets with the same sorted value.
   * This sort will only work for UsdRunningDailyVolume ordering.
   */
  const sortedResults =
    params.orderBy === FixedProductMarketMaker_OrderBy.UsdRunningDailyVolume
      ? response.fixedProductMarketMakers?.sort((a, b) => {
          const orderBy = params.orderBy as PrimaryOrderBy;

          if (b[orderBy] !== a[orderBy]) {
            return Number(b[orderBy]) - Number(a[orderBy]);
          }

          if (orderBy === FixedProductMarketMaker_OrderBy.UsdRunningDailyVolume) {
            return Number(b.usdVolume) - Number(a.usdVolume);
          }

          return Number(b.usdRunningDailyVolume) - Number(a.usdRunningDailyVolume);
        })
      : response.fixedProductMarketMakers;

  return { fixedProductMarketMakers: sortedResults };
};

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
    // We need to fetch + 1 tx to be able to merge tx and trades
    transactionsFirst: params.first ? params.first + 1 : 0,
  };

  return request<Pick<Query, 'fpmmTrades' | 'fpmmTransactions'>>(
    OMEN_SUBGRAPH_URL,
    getMarketTradesAndTransactionsQuery,
    modifiedParams
  );
};

const sortByNewestBet = (a: UserBet, b: UserBet) => {
  return (
    b.fpmmTrades[b.fpmmTrades.length - 1]?.creationTimestamp -
    a.fpmmTrades[a.fpmmTrades.length - 1]?.creationTimestamp
  );
};

const getUserBets = async (address?: string) => {
  if (!address) return [];

  const userPositionsData = await getUserPositions({ id: address.toLowerCase() });
  const userPositions = userPositionsData?.userPositions ?? [];

  const userBets = await Promise.allSettled(
    userPositions.map(async (userPosition): Promise<UserBet | undefined> => {
      try {
        const position = new Position(userPosition.position);
        const outcomeIndex = position.getOutcomeIndex();

        const omenConditionData = await getConditionMarket({
          id: position.conditionId,
        });
        const omenCondition = omenConditionData?.conditions[0];
        const market = new Market(omenCondition?.fixedProductMarketMakers[0]);

        if (!market) return undefined;

        const trades = await getMarketUserTrades({
          creator: address.toLowerCase(),
          fpmm: market.fpmm.id,
          outcomeIndex_in: [outcomeIndex],
        });

        return {
          ...userPosition,
          fpmm: market.fpmm,
          condition: position.condition,
          fpmmTrades: trades?.fpmmTrades || [],
        };
      } catch (error) {
        console.error(error);
      }
    })
  ).then(results =>
    results
      .filter(
        (result): result is PromiseFulfilledResult<UserBet> =>
          result.status === 'fulfilled' &&
          result.value !== undefined &&
          result.value.fpmmTrades.length > 0
      )
      .map(result => result.value)
      .sort(sortByNewestBet)
  );

  return userBets;
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
  getUserBets,
};
