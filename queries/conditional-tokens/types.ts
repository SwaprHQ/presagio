import { GraphQLClient, RequestOptions } from "graphql-request";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
type GraphQLClientRequestHeaders = RequestOptions["requestHeaders"];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  BigDecimal: { input: any; output: any };
  BigInt: { input: any; output: any };
  Bytes: { input: any; output: any };
  Int8: { input: any; output: any };
  Timestamp: { input: any; output: any };
};

export enum Aggregation_Interval {
  Day = "day",
  Hour = "hour",
}

export type BlockChangedFilter = {
  number_gte: Scalars["Int"]["input"];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars["Bytes"]["input"]>;
  number?: InputMaybe<Scalars["Int"]["input"]>;
  number_gte?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Category = {
  __typename?: "Category";
  id: Scalars["ID"]["output"];
  numClosedConditions: Scalars["Int"]["output"];
  numConditions: Scalars["Int"]["output"];
  numOpenConditions: Scalars["Int"]["output"];
};

export type Category_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Category_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  numClosedConditions?: InputMaybe<Scalars["Int"]["input"]>;
  numClosedConditions_gt?: InputMaybe<Scalars["Int"]["input"]>;
  numClosedConditions_gte?: InputMaybe<Scalars["Int"]["input"]>;
  numClosedConditions_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  numClosedConditions_lt?: InputMaybe<Scalars["Int"]["input"]>;
  numClosedConditions_lte?: InputMaybe<Scalars["Int"]["input"]>;
  numClosedConditions_not?: InputMaybe<Scalars["Int"]["input"]>;
  numClosedConditions_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  numConditions?: InputMaybe<Scalars["Int"]["input"]>;
  numConditions_gt?: InputMaybe<Scalars["Int"]["input"]>;
  numConditions_gte?: InputMaybe<Scalars["Int"]["input"]>;
  numConditions_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  numConditions_lt?: InputMaybe<Scalars["Int"]["input"]>;
  numConditions_lte?: InputMaybe<Scalars["Int"]["input"]>;
  numConditions_not?: InputMaybe<Scalars["Int"]["input"]>;
  numConditions_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  numOpenConditions?: InputMaybe<Scalars["Int"]["input"]>;
  numOpenConditions_gt?: InputMaybe<Scalars["Int"]["input"]>;
  numOpenConditions_gte?: InputMaybe<Scalars["Int"]["input"]>;
  numOpenConditions_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  numOpenConditions_lt?: InputMaybe<Scalars["Int"]["input"]>;
  numOpenConditions_lte?: InputMaybe<Scalars["Int"]["input"]>;
  numOpenConditions_not?: InputMaybe<Scalars["Int"]["input"]>;
  numOpenConditions_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Category_Filter>>>;
};

export enum Category_OrderBy {
  Id = "id",
  NumClosedConditions = "numClosedConditions",
  NumConditions = "numConditions",
  NumOpenConditions = "numOpenConditions",
}

export type CollateralToken = {
  __typename?: "CollateralToken";
  activeAmount: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  mergedAmount: Scalars["BigInt"]["output"];
  positions?: Maybe<Array<Position>>;
  redeemedAmount: Scalars["BigInt"]["output"];
  splitAmount: Scalars["BigInt"]["output"];
};

export type CollateralTokenPositionsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Position_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Position_Filter>;
};

export type CollateralToken_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  activeAmount?: InputMaybe<Scalars["BigInt"]["input"]>;
  activeAmount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  activeAmount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  activeAmount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  activeAmount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  activeAmount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  activeAmount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  activeAmount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<CollateralToken_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  mergedAmount?: InputMaybe<Scalars["BigInt"]["input"]>;
  mergedAmount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  mergedAmount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  mergedAmount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  mergedAmount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  mergedAmount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  mergedAmount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  mergedAmount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<CollateralToken_Filter>>>;
  positions_?: InputMaybe<Position_Filter>;
  redeemedAmount?: InputMaybe<Scalars["BigInt"]["input"]>;
  redeemedAmount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  redeemedAmount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  redeemedAmount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  redeemedAmount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  redeemedAmount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  redeemedAmount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  redeemedAmount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  splitAmount?: InputMaybe<Scalars["BigInt"]["input"]>;
  splitAmount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  splitAmount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  splitAmount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  splitAmount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  splitAmount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  splitAmount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  splitAmount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum CollateralToken_OrderBy {
  ActiveAmount = "activeAmount",
  Id = "id",
  MergedAmount = "mergedAmount",
  Positions = "positions",
  RedeemedAmount = "redeemedAmount",
  SplitAmount = "splitAmount",
}

export type Collection = {
  __typename?: "Collection";
  conditionIds: Array<Scalars["ID"]["output"]>;
  conditionIdsStr: Scalars["String"]["output"];
  conditions: Array<Condition>;
  id: Scalars["ID"]["output"];
  indexSets: Array<Scalars["BigInt"]["output"]>;
  multiplicities: Array<Scalars["Int"]["output"]>;
  positions?: Maybe<Array<Position>>;
};

export type CollectionConditionsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Condition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Condition_Filter>;
};

export type CollectionPositionsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Position_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Position_Filter>;
};

export type Collection_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Collection_Filter>>>;
  conditionIds?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  conditionIdsStr?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_contains?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_gt?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_gte?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  conditionIdsStr_lt?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_lte?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_not?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  conditionIdsStr_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_not_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  conditionIdsStr_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  conditionIds_contains?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  conditionIds_contains_nocase?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  conditionIds_not?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  conditionIds_not_contains?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  conditionIds_not_contains_nocase?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  conditions?: InputMaybe<Array<Scalars["String"]["input"]>>;
  conditions_?: InputMaybe<Condition_Filter>;
  conditions_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  conditions_contains_nocase?: InputMaybe<Array<Scalars["String"]["input"]>>;
  conditions_not?: InputMaybe<Array<Scalars["String"]["input"]>>;
  conditions_not_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  conditions_not_contains_nocase?: InputMaybe<
    Array<Scalars["String"]["input"]>
  >;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  indexSets?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  indexSets_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  indexSets_contains_nocase?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  indexSets_not?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  indexSets_not_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  indexSets_not_contains_nocase?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  multiplicities?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  multiplicities_contains?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  multiplicities_contains_nocase?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  multiplicities_not?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  multiplicities_not_contains?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  multiplicities_not_contains_nocase?: InputMaybe<
    Array<Scalars["Int"]["input"]>
  >;
  or?: InputMaybe<Array<InputMaybe<Collection_Filter>>>;
  positions_?: InputMaybe<Position_Filter>;
};

export enum Collection_OrderBy {
  ConditionIds = "conditionIds",
  ConditionIdsStr = "conditionIdsStr",
  Conditions = "conditions",
  Id = "id",
  IndexSets = "indexSets",
  Multiplicities = "multiplicities",
  Positions = "positions",
}

export type Condition = {
  __typename?: "Condition";
  collections?: Maybe<Array<Collection>>;
  conditionId: Scalars["String"]["output"];
  createBlockNumber: Scalars["BigInt"]["output"];
  createTimestamp: Scalars["BigInt"]["output"];
  createTransaction: Scalars["Bytes"]["output"];
  creator: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  oracle: Scalars["String"]["output"];
  outcomeSlotCount: Scalars["Int"]["output"];
  outcomes?: Maybe<Array<Scalars["String"]["output"]>>;
  payoutDenominator?: Maybe<Scalars["BigInt"]["output"]>;
  payoutNumerators?: Maybe<Array<Scalars["BigInt"]["output"]>>;
  payouts?: Maybe<Array<Scalars["BigDecimal"]["output"]>>;
  positions?: Maybe<Array<Position>>;
  question?: Maybe<Question>;
  questionId: Scalars["String"]["output"];
  resolveBlockNumber?: Maybe<Scalars["BigInt"]["output"]>;
  resolveTimestamp?: Maybe<Scalars["BigInt"]["output"]>;
  resolveTransaction?: Maybe<Scalars["Bytes"]["output"]>;
  resolved: Scalars["Boolean"]["output"];
  scalarHigh?: Maybe<Scalars["BigInt"]["output"]>;
  scalarLow?: Maybe<Scalars["BigInt"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
};

export type ConditionCollectionsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Collection_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Collection_Filter>;
};

export type ConditionPositionsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Position_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Position_Filter>;
};

export type Condition_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Condition_Filter>>>;
  collections_?: InputMaybe<Collection_Filter>;
  conditionId?: InputMaybe<Scalars["String"]["input"]>;
  conditionId_contains?: InputMaybe<Scalars["String"]["input"]>;
  conditionId_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  conditionId_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  conditionId_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  conditionId_gt?: InputMaybe<Scalars["String"]["input"]>;
  conditionId_gte?: InputMaybe<Scalars["String"]["input"]>;
  conditionId_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  conditionId_lt?: InputMaybe<Scalars["String"]["input"]>;
  conditionId_lte?: InputMaybe<Scalars["String"]["input"]>;
  conditionId_not?: InputMaybe<Scalars["String"]["input"]>;
  conditionId_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  conditionId_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  conditionId_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  conditionId_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  conditionId_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  conditionId_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  conditionId_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  conditionId_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  conditionId_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  createBlockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  createBlockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createBlockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createBlockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createBlockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createBlockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createBlockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  createBlockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  createTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  createTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createTransaction?: InputMaybe<Scalars["Bytes"]["input"]>;
  createTransaction_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  createTransaction_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  createTransaction_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  createTransaction_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  createTransaction_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  createTransaction_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  createTransaction_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  createTransaction_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  createTransaction_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  creator?: InputMaybe<Scalars["String"]["input"]>;
  creator_contains?: InputMaybe<Scalars["String"]["input"]>;
  creator_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  creator_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  creator_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  creator_gt?: InputMaybe<Scalars["String"]["input"]>;
  creator_gte?: InputMaybe<Scalars["String"]["input"]>;
  creator_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  creator_lt?: InputMaybe<Scalars["String"]["input"]>;
  creator_lte?: InputMaybe<Scalars["String"]["input"]>;
  creator_not?: InputMaybe<Scalars["String"]["input"]>;
  creator_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  creator_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  creator_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  creator_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  creator_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  creator_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  creator_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  creator_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  creator_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Condition_Filter>>>;
  oracle?: InputMaybe<Scalars["String"]["input"]>;
  oracle_contains?: InputMaybe<Scalars["String"]["input"]>;
  oracle_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  oracle_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  oracle_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  oracle_gt?: InputMaybe<Scalars["String"]["input"]>;
  oracle_gte?: InputMaybe<Scalars["String"]["input"]>;
  oracle_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  oracle_lt?: InputMaybe<Scalars["String"]["input"]>;
  oracle_lte?: InputMaybe<Scalars["String"]["input"]>;
  oracle_not?: InputMaybe<Scalars["String"]["input"]>;
  oracle_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  oracle_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  oracle_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  oracle_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  oracle_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  oracle_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  oracle_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  oracle_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  oracle_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  outcomeSlotCount?: InputMaybe<Scalars["Int"]["input"]>;
  outcomeSlotCount_gt?: InputMaybe<Scalars["Int"]["input"]>;
  outcomeSlotCount_gte?: InputMaybe<Scalars["Int"]["input"]>;
  outcomeSlotCount_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  outcomeSlotCount_lt?: InputMaybe<Scalars["Int"]["input"]>;
  outcomeSlotCount_lte?: InputMaybe<Scalars["Int"]["input"]>;
  outcomeSlotCount_not?: InputMaybe<Scalars["Int"]["input"]>;
  outcomeSlotCount_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  outcomes?: InputMaybe<Array<Scalars["String"]["input"]>>;
  outcomes_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  outcomes_contains_nocase?: InputMaybe<Array<Scalars["String"]["input"]>>;
  outcomes_not?: InputMaybe<Array<Scalars["String"]["input"]>>;
  outcomes_not_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  outcomes_not_contains_nocase?: InputMaybe<Array<Scalars["String"]["input"]>>;
  payoutDenominator?: InputMaybe<Scalars["BigInt"]["input"]>;
  payoutDenominator_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  payoutDenominator_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  payoutDenominator_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  payoutDenominator_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  payoutDenominator_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  payoutDenominator_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  payoutDenominator_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  payoutNumerators?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  payoutNumerators_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  payoutNumerators_contains_nocase?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  payoutNumerators_not?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  payoutNumerators_not_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  payoutNumerators_not_contains_nocase?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  payouts?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  payouts_contains?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  payouts_contains_nocase?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  payouts_not?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  payouts_not_contains?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  payouts_not_contains_nocase?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  positions_?: InputMaybe<Position_Filter>;
  question?: InputMaybe<Scalars["String"]["input"]>;
  questionId?: InputMaybe<Scalars["String"]["input"]>;
  questionId_contains?: InputMaybe<Scalars["String"]["input"]>;
  questionId_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  questionId_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  questionId_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  questionId_gt?: InputMaybe<Scalars["String"]["input"]>;
  questionId_gte?: InputMaybe<Scalars["String"]["input"]>;
  questionId_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  questionId_lt?: InputMaybe<Scalars["String"]["input"]>;
  questionId_lte?: InputMaybe<Scalars["String"]["input"]>;
  questionId_not?: InputMaybe<Scalars["String"]["input"]>;
  questionId_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  questionId_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  questionId_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  questionId_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  questionId_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  questionId_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  questionId_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  questionId_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  questionId_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  question_?: InputMaybe<Question_Filter>;
  question_contains?: InputMaybe<Scalars["String"]["input"]>;
  question_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  question_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  question_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  question_gt?: InputMaybe<Scalars["String"]["input"]>;
  question_gte?: InputMaybe<Scalars["String"]["input"]>;
  question_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  question_lt?: InputMaybe<Scalars["String"]["input"]>;
  question_lte?: InputMaybe<Scalars["String"]["input"]>;
  question_not?: InputMaybe<Scalars["String"]["input"]>;
  question_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  question_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  question_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  question_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  question_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  question_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  question_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  question_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  question_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  resolveBlockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  resolveBlockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  resolveBlockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  resolveBlockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  resolveBlockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  resolveBlockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  resolveBlockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  resolveBlockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  resolveTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  resolveTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  resolveTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  resolveTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  resolveTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  resolveTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  resolveTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  resolveTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  resolveTransaction?: InputMaybe<Scalars["Bytes"]["input"]>;
  resolveTransaction_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  resolveTransaction_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  resolveTransaction_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  resolveTransaction_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  resolveTransaction_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  resolveTransaction_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  resolveTransaction_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  resolveTransaction_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  resolveTransaction_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  resolved?: InputMaybe<Scalars["Boolean"]["input"]>;
  resolved_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  resolved_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  resolved_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  scalarHigh?: InputMaybe<Scalars["BigInt"]["input"]>;
  scalarHigh_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  scalarHigh_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  scalarHigh_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  scalarHigh_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  scalarHigh_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  scalarHigh_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  scalarHigh_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  scalarLow?: InputMaybe<Scalars["BigInt"]["input"]>;
  scalarLow_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  scalarLow_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  scalarLow_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  scalarLow_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  scalarLow_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  scalarLow_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  scalarLow_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  title_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  title_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  title_gt?: InputMaybe<Scalars["String"]["input"]>;
  title_gte?: InputMaybe<Scalars["String"]["input"]>;
  title_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  title_lt?: InputMaybe<Scalars["String"]["input"]>;
  title_lte?: InputMaybe<Scalars["String"]["input"]>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  title_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  title_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  title_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  title_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  title_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  title_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum Condition_OrderBy {
  Collections = "collections",
  ConditionId = "conditionId",
  CreateBlockNumber = "createBlockNumber",
  CreateTimestamp = "createTimestamp",
  CreateTransaction = "createTransaction",
  Creator = "creator",
  Id = "id",
  Oracle = "oracle",
  OutcomeSlotCount = "outcomeSlotCount",
  Outcomes = "outcomes",
  PayoutDenominator = "payoutDenominator",
  PayoutNumerators = "payoutNumerators",
  Payouts = "payouts",
  Positions = "positions",
  Question = "question",
  QuestionId = "questionId",
  QuestionAnswerFinalizedTimestamp = "question__answerFinalizedTimestamp",
  QuestionArbitrationOccurred = "question__arbitrationOccurred",
  QuestionArbitrator = "question__arbitrator",
  QuestionCategory = "question__category",
  QuestionCurrentAnswer = "question__currentAnswer",
  QuestionCurrentAnswerBond = "question__currentAnswerBond",
  QuestionCurrentAnswerTimestamp = "question__currentAnswerTimestamp",
  QuestionData = "question__data",
  QuestionIsPendingArbitration = "question__isPendingArbitration",
  QuestionLanguage = "question__language",
  QuestionOpeningTimestamp = "question__openingTimestamp",
  QuestionTemplateId = "question__templateId",
  QuestionTimeout = "question__timeout",
  QuestionTitle = "question__title",
  ResolveBlockNumber = "resolveBlockNumber",
  ResolveTimestamp = "resolveTimestamp",
  ResolveTransaction = "resolveTransaction",
  Resolved = "resolved",
  ScalarHigh = "scalarHigh",
  ScalarLow = "scalarLow",
  Title = "title",
}

export type Global = {
  __typename?: "Global";
  id: Scalars["ID"]["output"];
  numCollections: Scalars["Int"]["output"];
  numConditions: Scalars["Int"]["output"];
  numPositions: Scalars["Int"]["output"];
};

export type Global_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Global_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  numCollections?: InputMaybe<Scalars["Int"]["input"]>;
  numCollections_gt?: InputMaybe<Scalars["Int"]["input"]>;
  numCollections_gte?: InputMaybe<Scalars["Int"]["input"]>;
  numCollections_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  numCollections_lt?: InputMaybe<Scalars["Int"]["input"]>;
  numCollections_lte?: InputMaybe<Scalars["Int"]["input"]>;
  numCollections_not?: InputMaybe<Scalars["Int"]["input"]>;
  numCollections_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  numConditions?: InputMaybe<Scalars["Int"]["input"]>;
  numConditions_gt?: InputMaybe<Scalars["Int"]["input"]>;
  numConditions_gte?: InputMaybe<Scalars["Int"]["input"]>;
  numConditions_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  numConditions_lt?: InputMaybe<Scalars["Int"]["input"]>;
  numConditions_lte?: InputMaybe<Scalars["Int"]["input"]>;
  numConditions_not?: InputMaybe<Scalars["Int"]["input"]>;
  numConditions_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  numPositions?: InputMaybe<Scalars["Int"]["input"]>;
  numPositions_gt?: InputMaybe<Scalars["Int"]["input"]>;
  numPositions_gte?: InputMaybe<Scalars["Int"]["input"]>;
  numPositions_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  numPositions_lt?: InputMaybe<Scalars["Int"]["input"]>;
  numPositions_lte?: InputMaybe<Scalars["Int"]["input"]>;
  numPositions_not?: InputMaybe<Scalars["Int"]["input"]>;
  numPositions_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Global_Filter>>>;
};

export enum Global_OrderBy {
  Id = "id",
  NumCollections = "numCollections",
  NumConditions = "numConditions",
  NumPositions = "numPositions",
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = "asc",
  Desc = "desc",
}

export type Position = {
  __typename?: "Position";
  activeValue: Scalars["BigInt"]["output"];
  collateralToken: CollateralToken;
  collateralTokenAddress: Scalars["String"]["output"];
  collection: Collection;
  conditionIds: Array<Scalars["ID"]["output"]>;
  conditionIdsStr: Scalars["String"]["output"];
  conditions: Array<Condition>;
  createTimestamp: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  indexSets: Array<Scalars["BigInt"]["output"]>;
  lifetimeValue: Scalars["BigInt"]["output"];
  multiplicities: Array<Scalars["Int"]["output"]>;
  positionId: Scalars["String"]["output"];
  wrappedTokenAddress?: Maybe<Scalars["String"]["output"]>;
  wrappedTokens: Array<WrappedToken>;
};

export type PositionConditionsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Condition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Condition_Filter>;
};

export type PositionWrappedTokensArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<WrappedToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<WrappedToken_Filter>;
};

export type Position_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  activeValue?: InputMaybe<Scalars["BigInt"]["input"]>;
  activeValue_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  activeValue_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  activeValue_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  activeValue_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  activeValue_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  activeValue_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  activeValue_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<Position_Filter>>>;
  collateralToken?: InputMaybe<Scalars["String"]["input"]>;
  collateralTokenAddress?: InputMaybe<Scalars["String"]["input"]>;
  collateralTokenAddress_contains?: InputMaybe<Scalars["String"]["input"]>;
  collateralTokenAddress_contains_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  collateralTokenAddress_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  collateralTokenAddress_ends_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  collateralTokenAddress_gt?: InputMaybe<Scalars["String"]["input"]>;
  collateralTokenAddress_gte?: InputMaybe<Scalars["String"]["input"]>;
  collateralTokenAddress_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  collateralTokenAddress_lt?: InputMaybe<Scalars["String"]["input"]>;
  collateralTokenAddress_lte?: InputMaybe<Scalars["String"]["input"]>;
  collateralTokenAddress_not?: InputMaybe<Scalars["String"]["input"]>;
  collateralTokenAddress_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  collateralTokenAddress_not_contains_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  collateralTokenAddress_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  collateralTokenAddress_not_ends_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  collateralTokenAddress_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  collateralTokenAddress_not_starts_with?: InputMaybe<
    Scalars["String"]["input"]
  >;
  collateralTokenAddress_not_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  collateralTokenAddress_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  collateralTokenAddress_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  collateralToken_?: InputMaybe<CollateralToken_Filter>;
  collateralToken_contains?: InputMaybe<Scalars["String"]["input"]>;
  collateralToken_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  collateralToken_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  collateralToken_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  collateralToken_gt?: InputMaybe<Scalars["String"]["input"]>;
  collateralToken_gte?: InputMaybe<Scalars["String"]["input"]>;
  collateralToken_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  collateralToken_lt?: InputMaybe<Scalars["String"]["input"]>;
  collateralToken_lte?: InputMaybe<Scalars["String"]["input"]>;
  collateralToken_not?: InputMaybe<Scalars["String"]["input"]>;
  collateralToken_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  collateralToken_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  collateralToken_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  collateralToken_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  collateralToken_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  collateralToken_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  collateralToken_not_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  collateralToken_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  collateralToken_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  collection?: InputMaybe<Scalars["String"]["input"]>;
  collection_?: InputMaybe<Collection_Filter>;
  collection_contains?: InputMaybe<Scalars["String"]["input"]>;
  collection_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  collection_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  collection_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  collection_gt?: InputMaybe<Scalars["String"]["input"]>;
  collection_gte?: InputMaybe<Scalars["String"]["input"]>;
  collection_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  collection_lt?: InputMaybe<Scalars["String"]["input"]>;
  collection_lte?: InputMaybe<Scalars["String"]["input"]>;
  collection_not?: InputMaybe<Scalars["String"]["input"]>;
  collection_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  collection_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  collection_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  collection_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  collection_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  collection_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  collection_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  collection_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  collection_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  conditionIds?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  conditionIdsStr?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_contains?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_gt?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_gte?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  conditionIdsStr_lt?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_lte?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_not?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  conditionIdsStr_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_not_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  conditionIdsStr_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  conditionIdsStr_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  conditionIds_contains?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  conditionIds_contains_nocase?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  conditionIds_not?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  conditionIds_not_contains?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  conditionIds_not_contains_nocase?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  conditions?: InputMaybe<Array<Scalars["String"]["input"]>>;
  conditions_?: InputMaybe<Condition_Filter>;
  conditions_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  conditions_contains_nocase?: InputMaybe<Array<Scalars["String"]["input"]>>;
  conditions_not?: InputMaybe<Array<Scalars["String"]["input"]>>;
  conditions_not_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  conditions_not_contains_nocase?: InputMaybe<
    Array<Scalars["String"]["input"]>
  >;
  createTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  createTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  createTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  indexSets?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  indexSets_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  indexSets_contains_nocase?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  indexSets_not?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  indexSets_not_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  indexSets_not_contains_nocase?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  lifetimeValue?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifetimeValue_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifetimeValue_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifetimeValue_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  lifetimeValue_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifetimeValue_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifetimeValue_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifetimeValue_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  multiplicities?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  multiplicities_contains?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  multiplicities_contains_nocase?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  multiplicities_not?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  multiplicities_not_contains?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  multiplicities_not_contains_nocase?: InputMaybe<
    Array<Scalars["Int"]["input"]>
  >;
  or?: InputMaybe<Array<InputMaybe<Position_Filter>>>;
  positionId?: InputMaybe<Scalars["String"]["input"]>;
  positionId_contains?: InputMaybe<Scalars["String"]["input"]>;
  positionId_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  positionId_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  positionId_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  positionId_gt?: InputMaybe<Scalars["String"]["input"]>;
  positionId_gte?: InputMaybe<Scalars["String"]["input"]>;
  positionId_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  positionId_lt?: InputMaybe<Scalars["String"]["input"]>;
  positionId_lte?: InputMaybe<Scalars["String"]["input"]>;
  positionId_not?: InputMaybe<Scalars["String"]["input"]>;
  positionId_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  positionId_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  positionId_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  positionId_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  positionId_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  positionId_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  positionId_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  positionId_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  positionId_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  wrappedTokenAddress?: InputMaybe<Scalars["String"]["input"]>;
  wrappedTokenAddress_contains?: InputMaybe<Scalars["String"]["input"]>;
  wrappedTokenAddress_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  wrappedTokenAddress_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  wrappedTokenAddress_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  wrappedTokenAddress_gt?: InputMaybe<Scalars["String"]["input"]>;
  wrappedTokenAddress_gte?: InputMaybe<Scalars["String"]["input"]>;
  wrappedTokenAddress_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  wrappedTokenAddress_lt?: InputMaybe<Scalars["String"]["input"]>;
  wrappedTokenAddress_lte?: InputMaybe<Scalars["String"]["input"]>;
  wrappedTokenAddress_not?: InputMaybe<Scalars["String"]["input"]>;
  wrappedTokenAddress_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  wrappedTokenAddress_not_contains_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  wrappedTokenAddress_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  wrappedTokenAddress_not_ends_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  wrappedTokenAddress_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  wrappedTokenAddress_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  wrappedTokenAddress_not_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  wrappedTokenAddress_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  wrappedTokenAddress_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  wrappedTokens_?: InputMaybe<WrappedToken_Filter>;
};

export enum Position_OrderBy {
  ActiveValue = "activeValue",
  CollateralToken = "collateralToken",
  CollateralTokenAddress = "collateralTokenAddress",
  CollateralTokenActiveAmount = "collateralToken__activeAmount",
  CollateralTokenId = "collateralToken__id",
  CollateralTokenMergedAmount = "collateralToken__mergedAmount",
  CollateralTokenRedeemedAmount = "collateralToken__redeemedAmount",
  CollateralTokenSplitAmount = "collateralToken__splitAmount",
  Collection = "collection",
  CollectionConditionIdsStr = "collection__conditionIdsStr",
  CollectionId = "collection__id",
  ConditionIds = "conditionIds",
  ConditionIdsStr = "conditionIdsStr",
  Conditions = "conditions",
  CreateTimestamp = "createTimestamp",
  Id = "id",
  IndexSets = "indexSets",
  LifetimeValue = "lifetimeValue",
  Multiplicities = "multiplicities",
  PositionId = "positionId",
  WrappedTokenAddress = "wrappedTokenAddress",
  WrappedTokens = "wrappedTokens",
}

export type Query = {
  __typename?: "Query";
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  categories: Array<Category>;
  category?: Maybe<Category>;
  collateralToken?: Maybe<CollateralToken>;
  collateralTokens: Array<CollateralToken>;
  collection?: Maybe<Collection>;
  collections: Array<Collection>;
  condition?: Maybe<Condition>;
  conditions: Array<Condition>;
  global?: Maybe<Global>;
  globals: Array<Global>;
  position?: Maybe<Position>;
  positions: Array<Position>;
  question?: Maybe<Question>;
  questions: Array<Question>;
  scalarQuestionLink?: Maybe<ScalarQuestionLink>;
  scalarQuestionLinks: Array<ScalarQuestionLink>;
  user?: Maybe<User>;
  userPosition?: Maybe<UserPosition>;
  userPositions: Array<UserPosition>;
  users: Array<User>;
  wrappedToken?: Maybe<WrappedToken>;
  wrappedTokens: Array<WrappedToken>;
};

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type QueryCategoriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Category_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Category_Filter>;
};

export type QueryCategoryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCollateralTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCollateralTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CollateralToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CollateralToken_Filter>;
};

export type QueryCollectionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCollectionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Collection_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Collection_Filter>;
};

export type QueryConditionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryConditionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Condition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Condition_Filter>;
};

export type QueryGlobalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryGlobalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Global_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Global_Filter>;
};

export type QueryPositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Position_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Position_Filter>;
};

export type QueryQuestionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryQuestionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Question_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Question_Filter>;
};

export type QueryScalarQuestionLinkArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryScalarQuestionLinksArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ScalarQuestionLink_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ScalarQuestionLink_Filter>;
};

export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryUserPositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryUserPositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<UserPosition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UserPosition_Filter>;
};

export type QueryUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type QueryWrappedTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryWrappedTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<WrappedToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WrappedToken_Filter>;
};

export type Question = {
  __typename?: "Question";
  answerFinalizedTimestamp?: Maybe<Scalars["BigInt"]["output"]>;
  arbitrationOccurred: Scalars["Boolean"]["output"];
  arbitrator: Scalars["String"]["output"];
  category?: Maybe<Scalars["String"]["output"]>;
  conditions: Array<Condition>;
  currentAnswer?: Maybe<Scalars["Bytes"]["output"]>;
  currentAnswerBond?: Maybe<Scalars["BigInt"]["output"]>;
  currentAnswerTimestamp?: Maybe<Scalars["BigInt"]["output"]>;
  data: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  isPendingArbitration: Scalars["Boolean"]["output"];
  language?: Maybe<Scalars["String"]["output"]>;
  openingTimestamp: Scalars["BigInt"]["output"];
  outcomes?: Maybe<Array<Scalars["String"]["output"]>>;
  templateId: Scalars["BigInt"]["output"];
  timeout: Scalars["BigInt"]["output"];
  title?: Maybe<Scalars["String"]["output"]>;
};

export type QuestionConditionsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Condition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Condition_Filter>;
};

export type Question_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Question_Filter>>>;
  answerFinalizedTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  answerFinalizedTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  answerFinalizedTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  answerFinalizedTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  answerFinalizedTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  answerFinalizedTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  answerFinalizedTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  answerFinalizedTimestamp_not_in?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  arbitrationOccurred?: InputMaybe<Scalars["Boolean"]["input"]>;
  arbitrationOccurred_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  arbitrationOccurred_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  arbitrationOccurred_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  arbitrator?: InputMaybe<Scalars["String"]["input"]>;
  arbitrator_contains?: InputMaybe<Scalars["String"]["input"]>;
  arbitrator_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  arbitrator_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  arbitrator_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  arbitrator_gt?: InputMaybe<Scalars["String"]["input"]>;
  arbitrator_gte?: InputMaybe<Scalars["String"]["input"]>;
  arbitrator_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  arbitrator_lt?: InputMaybe<Scalars["String"]["input"]>;
  arbitrator_lte?: InputMaybe<Scalars["String"]["input"]>;
  arbitrator_not?: InputMaybe<Scalars["String"]["input"]>;
  arbitrator_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  arbitrator_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  arbitrator_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  arbitrator_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  arbitrator_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  arbitrator_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  arbitrator_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  arbitrator_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  arbitrator_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  category?: InputMaybe<Scalars["String"]["input"]>;
  category_contains?: InputMaybe<Scalars["String"]["input"]>;
  category_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  category_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  category_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  category_gt?: InputMaybe<Scalars["String"]["input"]>;
  category_gte?: InputMaybe<Scalars["String"]["input"]>;
  category_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  category_lt?: InputMaybe<Scalars["String"]["input"]>;
  category_lte?: InputMaybe<Scalars["String"]["input"]>;
  category_not?: InputMaybe<Scalars["String"]["input"]>;
  category_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  category_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  category_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  category_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  category_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  category_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  category_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  category_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  category_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  conditions_?: InputMaybe<Condition_Filter>;
  currentAnswer?: InputMaybe<Scalars["Bytes"]["input"]>;
  currentAnswerBond?: InputMaybe<Scalars["BigInt"]["input"]>;
  currentAnswerBond_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  currentAnswerBond_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  currentAnswerBond_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  currentAnswerBond_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  currentAnswerBond_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  currentAnswerBond_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  currentAnswerBond_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  currentAnswerTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  currentAnswerTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  currentAnswerTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  currentAnswerTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  currentAnswerTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  currentAnswerTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  currentAnswerTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  currentAnswerTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  currentAnswer_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  currentAnswer_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  currentAnswer_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  currentAnswer_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  currentAnswer_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  currentAnswer_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  currentAnswer_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  currentAnswer_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  currentAnswer_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  data?: InputMaybe<Scalars["String"]["input"]>;
  data_contains?: InputMaybe<Scalars["String"]["input"]>;
  data_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  data_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  data_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  data_gt?: InputMaybe<Scalars["String"]["input"]>;
  data_gte?: InputMaybe<Scalars["String"]["input"]>;
  data_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  data_lt?: InputMaybe<Scalars["String"]["input"]>;
  data_lte?: InputMaybe<Scalars["String"]["input"]>;
  data_not?: InputMaybe<Scalars["String"]["input"]>;
  data_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  data_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  data_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  data_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  data_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  data_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  data_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  data_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  data_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  isPendingArbitration?: InputMaybe<Scalars["Boolean"]["input"]>;
  isPendingArbitration_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  isPendingArbitration_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  isPendingArbitration_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  language?: InputMaybe<Scalars["String"]["input"]>;
  language_contains?: InputMaybe<Scalars["String"]["input"]>;
  language_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  language_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  language_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  language_gt?: InputMaybe<Scalars["String"]["input"]>;
  language_gte?: InputMaybe<Scalars["String"]["input"]>;
  language_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  language_lt?: InputMaybe<Scalars["String"]["input"]>;
  language_lte?: InputMaybe<Scalars["String"]["input"]>;
  language_not?: InputMaybe<Scalars["String"]["input"]>;
  language_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  language_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  language_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  language_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  language_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  language_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  language_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  language_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  language_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  openingTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  openingTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  openingTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  openingTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  openingTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  openingTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  openingTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  openingTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Question_Filter>>>;
  outcomes?: InputMaybe<Array<Scalars["String"]["input"]>>;
  outcomes_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  outcomes_contains_nocase?: InputMaybe<Array<Scalars["String"]["input"]>>;
  outcomes_not?: InputMaybe<Array<Scalars["String"]["input"]>>;
  outcomes_not_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  outcomes_not_contains_nocase?: InputMaybe<Array<Scalars["String"]["input"]>>;
  templateId?: InputMaybe<Scalars["BigInt"]["input"]>;
  templateId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  templateId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  templateId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  templateId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  templateId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  templateId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  templateId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timeout?: InputMaybe<Scalars["BigInt"]["input"]>;
  timeout_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timeout_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timeout_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timeout_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timeout_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timeout_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timeout_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  title_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  title_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  title_gt?: InputMaybe<Scalars["String"]["input"]>;
  title_gte?: InputMaybe<Scalars["String"]["input"]>;
  title_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  title_lt?: InputMaybe<Scalars["String"]["input"]>;
  title_lte?: InputMaybe<Scalars["String"]["input"]>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  title_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  title_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  title_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  title_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  title_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  title_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum Question_OrderBy {
  AnswerFinalizedTimestamp = "answerFinalizedTimestamp",
  ArbitrationOccurred = "arbitrationOccurred",
  Arbitrator = "arbitrator",
  Category = "category",
  Conditions = "conditions",
  CurrentAnswer = "currentAnswer",
  CurrentAnswerBond = "currentAnswerBond",
  CurrentAnswerTimestamp = "currentAnswerTimestamp",
  Data = "data",
  Id = "id",
  IsPendingArbitration = "isPendingArbitration",
  Language = "language",
  OpeningTimestamp = "openingTimestamp",
  Outcomes = "outcomes",
  TemplateId = "templateId",
  Timeout = "timeout",
  Title = "title",
}

export type ScalarQuestionLink = {
  __typename?: "ScalarQuestionLink";
  conditionQuestionId: Scalars["Bytes"]["output"];
  id: Scalars["ID"]["output"];
  question?: Maybe<Question>;
  realityEthQuestionId: Scalars["Bytes"]["output"];
  scalarHigh: Scalars["BigInt"]["output"];
  scalarLow: Scalars["BigInt"]["output"];
};

export type ScalarQuestionLink_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ScalarQuestionLink_Filter>>>;
  conditionQuestionId?: InputMaybe<Scalars["Bytes"]["input"]>;
  conditionQuestionId_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  conditionQuestionId_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  conditionQuestionId_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  conditionQuestionId_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  conditionQuestionId_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  conditionQuestionId_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  conditionQuestionId_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  conditionQuestionId_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  conditionQuestionId_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<ScalarQuestionLink_Filter>>>;
  question?: InputMaybe<Scalars["String"]["input"]>;
  question_?: InputMaybe<Question_Filter>;
  question_contains?: InputMaybe<Scalars["String"]["input"]>;
  question_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  question_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  question_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  question_gt?: InputMaybe<Scalars["String"]["input"]>;
  question_gte?: InputMaybe<Scalars["String"]["input"]>;
  question_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  question_lt?: InputMaybe<Scalars["String"]["input"]>;
  question_lte?: InputMaybe<Scalars["String"]["input"]>;
  question_not?: InputMaybe<Scalars["String"]["input"]>;
  question_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  question_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  question_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  question_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  question_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  question_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  question_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  question_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  question_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  realityEthQuestionId?: InputMaybe<Scalars["Bytes"]["input"]>;
  realityEthQuestionId_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  realityEthQuestionId_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  realityEthQuestionId_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  realityEthQuestionId_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  realityEthQuestionId_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  realityEthQuestionId_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  realityEthQuestionId_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  realityEthQuestionId_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  realityEthQuestionId_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  scalarHigh?: InputMaybe<Scalars["BigInt"]["input"]>;
  scalarHigh_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  scalarHigh_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  scalarHigh_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  scalarHigh_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  scalarHigh_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  scalarHigh_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  scalarHigh_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  scalarLow?: InputMaybe<Scalars["BigInt"]["input"]>;
  scalarLow_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  scalarLow_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  scalarLow_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  scalarLow_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  scalarLow_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  scalarLow_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  scalarLow_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum ScalarQuestionLink_OrderBy {
  ConditionQuestionId = "conditionQuestionId",
  Id = "id",
  Question = "question",
  QuestionAnswerFinalizedTimestamp = "question__answerFinalizedTimestamp",
  QuestionArbitrationOccurred = "question__arbitrationOccurred",
  QuestionArbitrator = "question__arbitrator",
  QuestionCategory = "question__category",
  QuestionCurrentAnswer = "question__currentAnswer",
  QuestionCurrentAnswerBond = "question__currentAnswerBond",
  QuestionCurrentAnswerTimestamp = "question__currentAnswerTimestamp",
  QuestionData = "question__data",
  QuestionId = "question__id",
  QuestionIsPendingArbitration = "question__isPendingArbitration",
  QuestionLanguage = "question__language",
  QuestionOpeningTimestamp = "question__openingTimestamp",
  QuestionTemplateId = "question__templateId",
  QuestionTimeout = "question__timeout",
  QuestionTitle = "question__title",
  RealityEthQuestionId = "realityEthQuestionId",
  ScalarHigh = "scalarHigh",
  ScalarLow = "scalarLow",
}

export type Subscription = {
  __typename?: "Subscription";
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  categories: Array<Category>;
  category?: Maybe<Category>;
  collateralToken?: Maybe<CollateralToken>;
  collateralTokens: Array<CollateralToken>;
  collection?: Maybe<Collection>;
  collections: Array<Collection>;
  condition?: Maybe<Condition>;
  conditions: Array<Condition>;
  global?: Maybe<Global>;
  globals: Array<Global>;
  position?: Maybe<Position>;
  positions: Array<Position>;
  question?: Maybe<Question>;
  questions: Array<Question>;
  scalarQuestionLink?: Maybe<ScalarQuestionLink>;
  scalarQuestionLinks: Array<ScalarQuestionLink>;
  user?: Maybe<User>;
  userPosition?: Maybe<UserPosition>;
  userPositions: Array<UserPosition>;
  users: Array<User>;
  wrappedToken?: Maybe<WrappedToken>;
  wrappedTokens: Array<WrappedToken>;
};

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type SubscriptionCategoriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Category_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Category_Filter>;
};

export type SubscriptionCategoryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionCollateralTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionCollateralTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CollateralToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CollateralToken_Filter>;
};

export type SubscriptionCollectionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionCollectionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Collection_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Collection_Filter>;
};

export type SubscriptionConditionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionConditionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Condition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Condition_Filter>;
};

export type SubscriptionGlobalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionGlobalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Global_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Global_Filter>;
};

export type SubscriptionPositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Position_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Position_Filter>;
};

export type SubscriptionQuestionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionQuestionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Question_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Question_Filter>;
};

export type SubscriptionScalarQuestionLinkArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionScalarQuestionLinksArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ScalarQuestionLink_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ScalarQuestionLink_Filter>;
};

export type SubscriptionUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionUserPositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionUserPositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<UserPosition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UserPosition_Filter>;
};

export type SubscriptionUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type SubscriptionWrappedTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionWrappedTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<WrappedToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WrappedToken_Filter>;
};

export type User = {
  __typename?: "User";
  firstParticipation: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  lastActive: Scalars["BigInt"]["output"];
  userPositions?: Maybe<Array<UserPosition>>;
};

export type UserUserPositionsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<UserPosition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<UserPosition_Filter>;
};

export type UserPosition = {
  __typename?: "UserPosition";
  balance: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  position: Position;
  totalBalance: Scalars["BigInt"]["output"];
  user: User;
  wrappedBalance: Scalars["BigInt"]["output"];
};

export type UserPosition_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UserPosition_Filter>>>;
  balance?: InputMaybe<Scalars["BigInt"]["input"]>;
  balance_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  balance_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  balance_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  balance_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  balance_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  balance_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  balance_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<UserPosition_Filter>>>;
  position?: InputMaybe<Scalars["String"]["input"]>;
  position_?: InputMaybe<Position_Filter>;
  position_contains?: InputMaybe<Scalars["String"]["input"]>;
  position_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  position_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  position_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  position_gt?: InputMaybe<Scalars["String"]["input"]>;
  position_gte?: InputMaybe<Scalars["String"]["input"]>;
  position_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  position_lt?: InputMaybe<Scalars["String"]["input"]>;
  position_lte?: InputMaybe<Scalars["String"]["input"]>;
  position_not?: InputMaybe<Scalars["String"]["input"]>;
  position_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  position_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  position_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  position_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  position_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  position_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  position_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  position_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  position_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  totalBalance?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalBalance_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalBalance_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalBalance_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalBalance_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalBalance_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalBalance_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalBalance_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  user?: InputMaybe<Scalars["String"]["input"]>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars["String"]["input"]>;
  user_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  user_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  user_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  user_gt?: InputMaybe<Scalars["String"]["input"]>;
  user_gte?: InputMaybe<Scalars["String"]["input"]>;
  user_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  user_lt?: InputMaybe<Scalars["String"]["input"]>;
  user_lte?: InputMaybe<Scalars["String"]["input"]>;
  user_not?: InputMaybe<Scalars["String"]["input"]>;
  user_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  user_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  user_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  user_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  user_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  user_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  user_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  user_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  user_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  wrappedBalance?: InputMaybe<Scalars["BigInt"]["input"]>;
  wrappedBalance_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  wrappedBalance_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  wrappedBalance_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  wrappedBalance_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  wrappedBalance_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  wrappedBalance_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  wrappedBalance_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum UserPosition_OrderBy {
  Balance = "balance",
  Id = "id",
  Position = "position",
  PositionActiveValue = "position__activeValue",
  PositionCollateralTokenAddress = "position__collateralTokenAddress",
  PositionConditionIdsStr = "position__conditionIdsStr",
  PositionCreateTimestamp = "position__createTimestamp",
  PositionId = "position__id",
  PositionLifetimeValue = "position__lifetimeValue",
  PositionPositionId = "position__positionId",
  PositionWrappedTokenAddress = "position__wrappedTokenAddress",
  TotalBalance = "totalBalance",
  User = "user",
  UserFirstParticipation = "user__firstParticipation",
  UserId = "user__id",
  UserLastActive = "user__lastActive",
  WrappedBalance = "wrappedBalance",
}

export type User_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  firstParticipation?: InputMaybe<Scalars["BigInt"]["input"]>;
  firstParticipation_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  firstParticipation_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  firstParticipation_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  firstParticipation_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  firstParticipation_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  firstParticipation_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  firstParticipation_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  lastActive?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastActive_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastActive_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastActive_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  lastActive_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastActive_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastActive_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastActive_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  userPositions_?: InputMaybe<UserPosition_Filter>;
};

export enum User_OrderBy {
  FirstParticipation = "firstParticipation",
  Id = "id",
  LastActive = "lastActive",
  UserPositions = "userPositions",
}

export type WrappedToken = {
  __typename?: "WrappedToken";
  id: Scalars["ID"]["output"];
  position: Position;
};

export type WrappedToken_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<WrappedToken_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<WrappedToken_Filter>>>;
  position?: InputMaybe<Scalars["String"]["input"]>;
  position_?: InputMaybe<Position_Filter>;
  position_contains?: InputMaybe<Scalars["String"]["input"]>;
  position_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  position_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  position_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  position_gt?: InputMaybe<Scalars["String"]["input"]>;
  position_gte?: InputMaybe<Scalars["String"]["input"]>;
  position_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  position_lt?: InputMaybe<Scalars["String"]["input"]>;
  position_lte?: InputMaybe<Scalars["String"]["input"]>;
  position_not?: InputMaybe<Scalars["String"]["input"]>;
  position_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  position_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  position_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  position_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  position_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  position_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  position_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  position_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  position_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum WrappedToken_OrderBy {
  Id = "id",
  Position = "position",
  PositionActiveValue = "position__activeValue",
  PositionCollateralTokenAddress = "position__collateralTokenAddress",
  PositionConditionIdsStr = "position__conditionIdsStr",
  PositionCreateTimestamp = "position__createTimestamp",
  PositionId = "position__id",
  PositionLifetimeValue = "position__lifetimeValue",
  PositionPositionId = "position__positionId",
  PositionWrappedTokenAddress = "position__wrappedTokenAddress",
}

export type _Block_ = {
  __typename?: "_Block_";
  /** The hash of the block */
  hash?: Maybe<Scalars["Bytes"]["output"]>;
  /** The block number */
  number: Scalars["Int"]["output"];
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars["Bytes"]["output"]>;
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars["Int"]["output"]>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: "_Meta_";
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars["String"]["output"];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars["Boolean"]["output"];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = "allow",
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = "deny",
}

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables
) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {};
}
export type Sdk = ReturnType<typeof getSdk>;
