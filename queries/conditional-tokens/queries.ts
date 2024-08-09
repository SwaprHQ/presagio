import { CONDITIONAL_TOKENS_SUBGRAPH_URL } from '@/constants';
import {
  Position,
  Query,
  QueryConditionArgs,
  QueryUserPositionArgs,
  QueryUserPositionsArgs,
} from './types';
import { gql, request } from 'graphql-request';

const getUserPositionsQuery = gql`
  query OmenGetMyMarkets($id: ID!) {
    userPositions(
      where: { user_: { id: $id } }
      orderBy: position__createTimestamp
      orderDirection: desc
    ) {
      id
      balance
      totalBalance
      wrappedBalance
      user {
        firstParticipation
        lastActive
      }
      position {
        activeValue
        conditionIdsStr
        indexSets
        multiplicities
        wrappedTokenAddress
        collateralTokenAddress
        createTimestamp
        collateralToken {
          activeAmount
          mergedAmount
          redeemedAmount
          splitAmount
        }
        conditions {
          id
          oracle
          outcomes
          outcomeSlotCount
          payouts
          payoutNumerators
          payoutDenominator
          questionId
          resolved
          resolveTimestamp
          resolveTransaction
          createTimestamp
        }
      }
    }
  }
`;

const getMarketUserPositionsQuery = gql`
  query GetUserPositionsQuery($id: ID!, $conditionIdsStr: String) {
    userPositions(
      where: { user_: { id: $id }, position_: { conditionIdsStr: $conditionIdsStr } }
    ) {
      id
      balance
      totalBalance
      wrappedBalance
      user {
        firstParticipation
        lastActive
      }
      position {
        activeValue
        conditionIdsStr
        indexSets
        multiplicities
        wrappedTokenAddress
        collateralTokenAddress
        collateralToken {
          activeAmount
          mergedAmount
          redeemedAmount
          splitAmount
        }
        conditions {
          id
          oracle
          outcomes
          outcomeSlotCount
          payouts
          payoutNumerators
          payoutDenominator
          questionId
          resolved
          resolveTimestamp
          resolveTransaction
        }
      }
    }
  }
`;

const getConditionQuery = gql`
  query GetCondition($id: ID!) {
    condition(id: $id) {
      conditionId
      createTimestamp
      createTransaction
      creator
      id
      oracle
      outcomeSlotCount
      outcomes
      payoutDenominator
      payoutNumerators
      payouts
      resolved
      title
      resolveTimestamp
      resolveTransaction
      resolveBlockNumber
    }
  }
`;

const getUserPositions = async (params: QueryUserPositionArgs & QueryUserPositionsArgs) =>
  request<Pick<Query, 'userPositions'>>(
    CONDITIONAL_TOKENS_SUBGRAPH_URL,
    getUserPositionsQuery,
    params
  );

const getMarketUserPositions = async (
  params: QueryUserPositionArgs & Pick<Position, 'conditionIdsStr'>
) =>
  request<Pick<Query, 'userPositions'>>(
    CONDITIONAL_TOKENS_SUBGRAPH_URL,
    getMarketUserPositionsQuery,
    params
  );

const getCondition = async (params: QueryConditionArgs) =>
  request<Pick<Query, 'condition'>>(
    CONDITIONAL_TOKENS_SUBGRAPH_URL,
    getConditionQuery,
    params
  );

export { getUserPositions, getMarketUserPositions, getCondition };
