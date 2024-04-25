// @ts-nocheck
import { QueryUserPositionArgs } from "@/queries/conditional-tokens/types";
import { gql, request } from "graphql-request";

const CONDITIONAL_TOKENS_SUBGRAPH_URL =
  "https://api.thegraph.com/subgraphs/name/gnosis/conditional-tokens-gc/";

const getUserPositionsQuery = gql`
  query OmenGetMyMarkets($id: ID!) {
    userPositions(where: { user_: { id: $id } }) {
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

const getUserPositions = async (params: QueryUserPositionArgs) =>
  request<Pick<Query, "userPositions">>(
    CONDITIONAL_TOKENS_SUBGRAPH_URL,
    getUserPositionsQuery,
    params
  );

export { getUserPositions };
