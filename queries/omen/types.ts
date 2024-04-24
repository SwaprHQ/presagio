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

export type Account = {
  __typename?: "Account";
  fpmmParticipations?: Maybe<Array<FpmmParticipation>>;
  fpmmPoolMemberships?: Maybe<Array<FpmmPoolMembership>>;
  id: Scalars["ID"]["output"];
  tradeNonce: Scalars["BigInt"]["output"];
};

export type AccountFpmmParticipationsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<FpmmParticipation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<FpmmParticipation_Filter>;
};

export type AccountFpmmPoolMembershipsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<FpmmPoolMembership_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<FpmmPoolMembership_Filter>;
};

export type Account_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Account_Filter>>>;
  fpmmParticipations_?: InputMaybe<FpmmParticipation_Filter>;
  fpmmPoolMemberships_?: InputMaybe<FpmmPoolMembership_Filter>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Account_Filter>>>;
  tradeNonce?: InputMaybe<Scalars["BigInt"]["input"]>;
  tradeNonce_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tradeNonce_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tradeNonce_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tradeNonce_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tradeNonce_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tradeNonce_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  tradeNonce_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum Account_OrderBy {
  FpmmParticipations = "fpmmParticipations",
  FpmmPoolMemberships = "fpmmPoolMemberships",
  Id = "id",
  TradeNonce = "tradeNonce",
}

export type Action = {
  __typename?: "Action";
  addr: Scalars["Bytes"]["output"];
  data: Scalars["Bytes"]["output"];
  dataFlow: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  operation: Scalars["BigInt"]["output"];
  termsOkCheck: Scalars["Boolean"]["output"];
  value: Scalars["BigInt"]["output"];
};

export type Action_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  addr?: InputMaybe<Scalars["Bytes"]["input"]>;
  addr_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  addr_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  addr_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  addr_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  addr_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  addr_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  addr_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  addr_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  addr_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<Action_Filter>>>;
  data?: InputMaybe<Scalars["Bytes"]["input"]>;
  dataFlow?: InputMaybe<Scalars["BigInt"]["input"]>;
  dataFlow_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  dataFlow_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  dataFlow_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  dataFlow_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  dataFlow_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  dataFlow_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  dataFlow_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  data_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  data_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  data_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  data_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  data_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  data_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  data_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  data_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  data_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  operation?: InputMaybe<Scalars["BigInt"]["input"]>;
  operation_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  operation_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  operation_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  operation_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  operation_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  operation_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  operation_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Action_Filter>>>;
  termsOkCheck?: InputMaybe<Scalars["Boolean"]["input"]>;
  termsOkCheck_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  termsOkCheck_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  termsOkCheck_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  value?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  value_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum Action_OrderBy {
  Addr = "addr",
  Data = "data",
  DataFlow = "dataFlow",
  Id = "id",
  Operation = "operation",
  TermsOkCheck = "termsOkCheck",
  Value = "value",
}

export enum Aggregation_Interval {
  Day = "day",
  Hour = "hour",
}

export type Answer = {
  __typename?: "Answer";
  answer: Scalars["Bytes"]["output"];
  bondAggregate: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  question: Question;
};

export type Answer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Answer_Filter>>>;
  answer?: InputMaybe<Scalars["Bytes"]["input"]>;
  answer_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  answer_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  answer_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  answer_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  answer_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  answer_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  answer_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  answer_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  answer_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  bondAggregate?: InputMaybe<Scalars["BigInt"]["input"]>;
  bondAggregate_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  bondAggregate_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  bondAggregate_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  bondAggregate_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  bondAggregate_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  bondAggregate_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  bondAggregate_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Answer_Filter>>>;
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
};

export enum Answer_OrderBy {
  Answer = "answer",
  BondAggregate = "bondAggregate",
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

export type Condition = {
  __typename?: "Condition";
  fixedProductMarketMakers: Array<FixedProductMarketMaker>;
  id: Scalars["ID"]["output"];
  oracle: Scalars["Bytes"]["output"];
  outcomeSlotCount: Scalars["Int"]["output"];
  payouts?: Maybe<Array<Scalars["BigDecimal"]["output"]>>;
  question?: Maybe<Question>;
  questionId: Scalars["Bytes"]["output"];
  resolutionTimestamp?: Maybe<Scalars["BigInt"]["output"]>;
  scalarHigh?: Maybe<Scalars["BigInt"]["output"]>;
  scalarLow?: Maybe<Scalars["BigInt"]["output"]>;
};

export type ConditionFixedProductMarketMakersArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<FixedProductMarketMaker_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<FixedProductMarketMaker_Filter>;
};

export type Condition_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Condition_Filter>>>;
  fixedProductMarketMakers_?: InputMaybe<FixedProductMarketMaker_Filter>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Condition_Filter>>>;
  oracle?: InputMaybe<Scalars["Bytes"]["input"]>;
  oracle_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  oracle_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  oracle_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  oracle_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  oracle_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  oracle_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  oracle_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  oracle_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  oracle_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  outcomeSlotCount?: InputMaybe<Scalars["Int"]["input"]>;
  outcomeSlotCount_gt?: InputMaybe<Scalars["Int"]["input"]>;
  outcomeSlotCount_gte?: InputMaybe<Scalars["Int"]["input"]>;
  outcomeSlotCount_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  outcomeSlotCount_lt?: InputMaybe<Scalars["Int"]["input"]>;
  outcomeSlotCount_lte?: InputMaybe<Scalars["Int"]["input"]>;
  outcomeSlotCount_not?: InputMaybe<Scalars["Int"]["input"]>;
  outcomeSlotCount_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  payouts?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  payouts_contains?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  payouts_contains_nocase?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  payouts_not?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  payouts_not_contains?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  payouts_not_contains_nocase?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  question?: InputMaybe<Scalars["String"]["input"]>;
  questionId?: InputMaybe<Scalars["Bytes"]["input"]>;
  questionId_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  questionId_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  questionId_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  questionId_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  questionId_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  questionId_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  questionId_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  questionId_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  questionId_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
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
  resolutionTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  resolutionTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  resolutionTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  resolutionTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  resolutionTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  resolutionTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  resolutionTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  resolutionTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
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

export enum Condition_OrderBy {
  FixedProductMarketMakers = "fixedProductMarketMakers",
  Id = "id",
  Oracle = "oracle",
  OutcomeSlotCount = "outcomeSlotCount",
  Payouts = "payouts",
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
  ResolutionTimestamp = "resolutionTimestamp",
  ScalarHigh = "scalarHigh",
  ScalarLow = "scalarLow",
}

export type FixedProductMarketMaker = {
  __typename?: "FixedProductMarketMaker";
  answerFinalizedTimestamp?: Maybe<Scalars["BigInt"]["output"]>;
  arbitrationOccurred?: Maybe<Scalars["Boolean"]["output"]>;
  arbitrator?: Maybe<Scalars["Bytes"]["output"]>;
  category?: Maybe<Scalars["String"]["output"]>;
  collateralToken: Scalars["Bytes"]["output"];
  collateralVolume: Scalars["BigInt"]["output"];
  collateralVolumeBeforeLastActiveDayByHour: Array<Scalars["BigInt"]["output"]>;
  condition?: Maybe<Condition>;
  conditions: Array<Condition>;
  creationTimestamp: Scalars["BigInt"]["output"];
  creator: Scalars["Bytes"]["output"];
  curatedByDxDao: Scalars["Boolean"]["output"];
  curatedByDxDaoOrKleros: Scalars["Boolean"]["output"];
  currentAnswer?: Maybe<Scalars["Bytes"]["output"]>;
  currentAnswerBond?: Maybe<Scalars["BigInt"]["output"]>;
  currentAnswerTimestamp?: Maybe<Scalars["BigInt"]["output"]>;
  data?: Maybe<Scalars["String"]["output"]>;
  fee: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  indexedOnQuestion: Scalars["Boolean"]["output"];
  isPendingArbitration?: Maybe<Scalars["Boolean"]["output"]>;
  klerosTCRregistered: Scalars["Boolean"]["output"];
  language?: Maybe<Scalars["String"]["output"]>;
  lastActiveDay: Scalars["BigInt"]["output"];
  lastActiveDayAndRunningDailyVolume: Scalars["BigInt"]["output"];
  lastActiveDayAndScaledRunningDailyVolume: Scalars["BigInt"]["output"];
  lastActiveHour: Scalars["BigInt"]["output"];
  liquidityMeasure: Scalars["BigInt"]["output"];
  liquidityParameter: Scalars["BigInt"]["output"];
  openingTimestamp?: Maybe<Scalars["BigInt"]["output"]>;
  outcomeSlotCount?: Maybe<Scalars["Int"]["output"]>;
  outcomeTokenAmounts: Array<Scalars["BigInt"]["output"]>;
  outcomeTokenMarginalPrices?: Maybe<Array<Scalars["BigDecimal"]["output"]>>;
  outcomes?: Maybe<Array<Scalars["String"]["output"]>>;
  participants?: Maybe<Array<FpmmParticipation>>;
  payouts?: Maybe<Array<Scalars["BigDecimal"]["output"]>>;
  poolMembers?: Maybe<Array<FpmmPoolMembership>>;
  question?: Maybe<Question>;
  resolutionTimestamp?: Maybe<Scalars["BigInt"]["output"]>;
  runningDailyVolume: Scalars["BigInt"]["output"];
  runningDailyVolumeByHour: Array<Scalars["BigInt"]["output"]>;
  scalarHigh?: Maybe<Scalars["BigInt"]["output"]>;
  scalarLow?: Maybe<Scalars["BigInt"]["output"]>;
  scaledCollateralVolume: Scalars["BigDecimal"]["output"];
  scaledLiquidityMeasure: Scalars["BigDecimal"]["output"];
  scaledLiquidityParameter: Scalars["BigDecimal"]["output"];
  scaledRunningDailyVolume: Scalars["BigDecimal"]["output"];
  sort24HourVolume0: Scalars["BigDecimal"]["output"];
  sort24HourVolume1: Scalars["BigDecimal"]["output"];
  sort24HourVolume2: Scalars["BigDecimal"]["output"];
  sort24HourVolume3: Scalars["BigDecimal"]["output"];
  sort24HourVolume4: Scalars["BigDecimal"]["output"];
  sort24HourVolume5: Scalars["BigDecimal"]["output"];
  sort24HourVolume6: Scalars["BigDecimal"]["output"];
  sort24HourVolume7: Scalars["BigDecimal"]["output"];
  sort24HourVolume8: Scalars["BigDecimal"]["output"];
  sort24HourVolume9: Scalars["BigDecimal"]["output"];
  sort24HourVolume10: Scalars["BigDecimal"]["output"];
  sort24HourVolume11: Scalars["BigDecimal"]["output"];
  sort24HourVolume12: Scalars["BigDecimal"]["output"];
  sort24HourVolume13: Scalars["BigDecimal"]["output"];
  sort24HourVolume14: Scalars["BigDecimal"]["output"];
  sort24HourVolume15: Scalars["BigDecimal"]["output"];
  sort24HourVolume16: Scalars["BigDecimal"]["output"];
  sort24HourVolume17: Scalars["BigDecimal"]["output"];
  sort24HourVolume18: Scalars["BigDecimal"]["output"];
  sort24HourVolume19: Scalars["BigDecimal"]["output"];
  sort24HourVolume20: Scalars["BigDecimal"]["output"];
  sort24HourVolume21: Scalars["BigDecimal"]["output"];
  sort24HourVolume22: Scalars["BigDecimal"]["output"];
  sort24HourVolume23: Scalars["BigDecimal"]["output"];
  submissionIDs: Array<KlerosSubmission>;
  templateId?: Maybe<Scalars["BigInt"]["output"]>;
  timeout?: Maybe<Scalars["BigInt"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  usdLiquidityMeasure: Scalars["BigDecimal"]["output"];
  usdLiquidityParameter: Scalars["BigDecimal"]["output"];
  usdRunningDailyVolume: Scalars["BigDecimal"]["output"];
  usdRunningDailyVolumeByHour: Array<Scalars["BigDecimal"]["output"]>;
  usdVolume: Scalars["BigDecimal"]["output"];
  usdVolumeBeforeLastActiveDayByHour: Array<Scalars["BigDecimal"]["output"]>;
};

export type FixedProductMarketMakerConditionsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Condition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Condition_Filter>;
};

export type FixedProductMarketMakerParticipantsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<FpmmParticipation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<FpmmParticipation_Filter>;
};

export type FixedProductMarketMakerPoolMembersArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<FpmmPoolMembership_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<FpmmPoolMembership_Filter>;
};

export type FixedProductMarketMakerSubmissionIDsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<KlerosSubmission_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<KlerosSubmission_Filter>;
};

export type FixedProductMarketMaker_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FixedProductMarketMaker_Filter>>>;
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
  arbitrator?: InputMaybe<Scalars["Bytes"]["input"]>;
  arbitrator_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  arbitrator_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  arbitrator_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  arbitrator_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  arbitrator_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  arbitrator_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  arbitrator_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  arbitrator_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  arbitrator_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
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
  collateralToken?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  collateralToken_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  collateralVolume?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralVolumeBeforeLastActiveDayByHour?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  collateralVolumeBeforeLastActiveDayByHour_contains?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  collateralVolumeBeforeLastActiveDayByHour_contains_nocase?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  collateralVolumeBeforeLastActiveDayByHour_not?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  collateralVolumeBeforeLastActiveDayByHour_not_contains?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  collateralVolumeBeforeLastActiveDayByHour_not_contains_nocase?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  collateralVolume_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralVolume_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralVolume_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  collateralVolume_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralVolume_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralVolume_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralVolume_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  condition?: InputMaybe<Scalars["String"]["input"]>;
  condition_?: InputMaybe<Condition_Filter>;
  condition_contains?: InputMaybe<Scalars["String"]["input"]>;
  condition_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  condition_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  condition_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  condition_gt?: InputMaybe<Scalars["String"]["input"]>;
  condition_gte?: InputMaybe<Scalars["String"]["input"]>;
  condition_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  condition_lt?: InputMaybe<Scalars["String"]["input"]>;
  condition_lte?: InputMaybe<Scalars["String"]["input"]>;
  condition_not?: InputMaybe<Scalars["String"]["input"]>;
  condition_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  condition_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  condition_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  condition_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  condition_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  condition_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  condition_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  condition_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  condition_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  conditions?: InputMaybe<Array<Scalars["String"]["input"]>>;
  conditions_?: InputMaybe<Condition_Filter>;
  conditions_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  conditions_contains_nocase?: InputMaybe<Array<Scalars["String"]["input"]>>;
  conditions_not?: InputMaybe<Array<Scalars["String"]["input"]>>;
  conditions_not_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  conditions_not_contains_nocase?: InputMaybe<
    Array<Scalars["String"]["input"]>
  >;
  creationTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  creationTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  creator?: InputMaybe<Scalars["Bytes"]["input"]>;
  creator_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  creator_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  creator_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  creator_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  creator_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  creator_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  creator_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  creator_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  creator_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  curatedByDxDao?: InputMaybe<Scalars["Boolean"]["input"]>;
  curatedByDxDaoOrKleros?: InputMaybe<Scalars["Boolean"]["input"]>;
  curatedByDxDaoOrKleros_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  curatedByDxDaoOrKleros_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  curatedByDxDaoOrKleros_not_in?: InputMaybe<
    Array<Scalars["Boolean"]["input"]>
  >;
  curatedByDxDao_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  curatedByDxDao_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  curatedByDxDao_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
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
  fee?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  fee_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  indexedOnQuestion?: InputMaybe<Scalars["Boolean"]["input"]>;
  indexedOnQuestion_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  indexedOnQuestion_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  indexedOnQuestion_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  isPendingArbitration?: InputMaybe<Scalars["Boolean"]["input"]>;
  isPendingArbitration_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  isPendingArbitration_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  isPendingArbitration_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  klerosTCRregistered?: InputMaybe<Scalars["Boolean"]["input"]>;
  klerosTCRregistered_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  klerosTCRregistered_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  klerosTCRregistered_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
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
  lastActiveDay?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastActiveDayAndRunningDailyVolume?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastActiveDayAndRunningDailyVolume_gt?: InputMaybe<
    Scalars["BigInt"]["input"]
  >;
  lastActiveDayAndRunningDailyVolume_gte?: InputMaybe<
    Scalars["BigInt"]["input"]
  >;
  lastActiveDayAndRunningDailyVolume_in?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  lastActiveDayAndRunningDailyVolume_lt?: InputMaybe<
    Scalars["BigInt"]["input"]
  >;
  lastActiveDayAndRunningDailyVolume_lte?: InputMaybe<
    Scalars["BigInt"]["input"]
  >;
  lastActiveDayAndRunningDailyVolume_not?: InputMaybe<
    Scalars["BigInt"]["input"]
  >;
  lastActiveDayAndRunningDailyVolume_not_in?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  lastActiveDayAndScaledRunningDailyVolume?: InputMaybe<
    Scalars["BigInt"]["input"]
  >;
  lastActiveDayAndScaledRunningDailyVolume_gt?: InputMaybe<
    Scalars["BigInt"]["input"]
  >;
  lastActiveDayAndScaledRunningDailyVolume_gte?: InputMaybe<
    Scalars["BigInt"]["input"]
  >;
  lastActiveDayAndScaledRunningDailyVolume_in?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  lastActiveDayAndScaledRunningDailyVolume_lt?: InputMaybe<
    Scalars["BigInt"]["input"]
  >;
  lastActiveDayAndScaledRunningDailyVolume_lte?: InputMaybe<
    Scalars["BigInt"]["input"]
  >;
  lastActiveDayAndScaledRunningDailyVolume_not?: InputMaybe<
    Scalars["BigInt"]["input"]
  >;
  lastActiveDayAndScaledRunningDailyVolume_not_in?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  lastActiveDay_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastActiveDay_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastActiveDay_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  lastActiveDay_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastActiveDay_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastActiveDay_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastActiveDay_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  lastActiveHour?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastActiveHour_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastActiveHour_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastActiveHour_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  lastActiveHour_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastActiveHour_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastActiveHour_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastActiveHour_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  liquidityMeasure?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityMeasure_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityMeasure_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityMeasure_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  liquidityMeasure_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityMeasure_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityMeasure_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityMeasure_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  liquidityParameter?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityParameter_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityParameter_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityParameter_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  liquidityParameter_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityParameter_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityParameter_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityParameter_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  openingTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  openingTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  openingTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  openingTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  openingTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  openingTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  openingTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  openingTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<FixedProductMarketMaker_Filter>>>;
  outcomeSlotCount?: InputMaybe<Scalars["Int"]["input"]>;
  outcomeSlotCount_gt?: InputMaybe<Scalars["Int"]["input"]>;
  outcomeSlotCount_gte?: InputMaybe<Scalars["Int"]["input"]>;
  outcomeSlotCount_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  outcomeSlotCount_lt?: InputMaybe<Scalars["Int"]["input"]>;
  outcomeSlotCount_lte?: InputMaybe<Scalars["Int"]["input"]>;
  outcomeSlotCount_not?: InputMaybe<Scalars["Int"]["input"]>;
  outcomeSlotCount_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  outcomeTokenAmounts?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  outcomeTokenAmounts_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  outcomeTokenAmounts_contains_nocase?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  outcomeTokenAmounts_not?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  outcomeTokenAmounts_not_contains?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  outcomeTokenAmounts_not_contains_nocase?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  outcomeTokenMarginalPrices?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  outcomeTokenMarginalPrices_contains?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  outcomeTokenMarginalPrices_contains_nocase?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  outcomeTokenMarginalPrices_not?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  outcomeTokenMarginalPrices_not_contains?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  outcomeTokenMarginalPrices_not_contains_nocase?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  outcomes?: InputMaybe<Array<Scalars["String"]["input"]>>;
  outcomes_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  outcomes_contains_nocase?: InputMaybe<Array<Scalars["String"]["input"]>>;
  outcomes_not?: InputMaybe<Array<Scalars["String"]["input"]>>;
  outcomes_not_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  outcomes_not_contains_nocase?: InputMaybe<Array<Scalars["String"]["input"]>>;
  participants_?: InputMaybe<FpmmParticipation_Filter>;
  payouts?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  payouts_contains?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  payouts_contains_nocase?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  payouts_not?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  payouts_not_contains?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  payouts_not_contains_nocase?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  poolMembers_?: InputMaybe<FpmmPoolMembership_Filter>;
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
  resolutionTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  resolutionTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  resolutionTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  resolutionTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  resolutionTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  resolutionTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  resolutionTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  resolutionTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  runningDailyVolume?: InputMaybe<Scalars["BigInt"]["input"]>;
  runningDailyVolumeByHour?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  runningDailyVolumeByHour_contains?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  runningDailyVolumeByHour_contains_nocase?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  runningDailyVolumeByHour_not?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  runningDailyVolumeByHour_not_contains?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  runningDailyVolumeByHour_not_contains_nocase?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  runningDailyVolume_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  runningDailyVolume_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  runningDailyVolume_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  runningDailyVolume_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  runningDailyVolume_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  runningDailyVolume_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  runningDailyVolume_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
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
  scaledCollateralVolume?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  scaledCollateralVolume_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  scaledCollateralVolume_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  scaledCollateralVolume_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  scaledCollateralVolume_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  scaledCollateralVolume_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  scaledCollateralVolume_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  scaledCollateralVolume_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  scaledLiquidityMeasure?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  scaledLiquidityMeasure_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  scaledLiquidityMeasure_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  scaledLiquidityMeasure_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  scaledLiquidityMeasure_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  scaledLiquidityMeasure_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  scaledLiquidityMeasure_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  scaledLiquidityMeasure_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  scaledLiquidityParameter?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  scaledLiquidityParameter_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  scaledLiquidityParameter_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  scaledLiquidityParameter_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  scaledLiquidityParameter_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  scaledLiquidityParameter_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  scaledLiquidityParameter_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  scaledLiquidityParameter_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  scaledRunningDailyVolume?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  scaledRunningDailyVolume_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  scaledRunningDailyVolume_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  scaledRunningDailyVolume_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  scaledRunningDailyVolume_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  scaledRunningDailyVolume_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  scaledRunningDailyVolume_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  scaledRunningDailyVolume_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  sort24HourVolume0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume0_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume1_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume2?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume2_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume2_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume2_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume2_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume2_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume2_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume2_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume3?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume3_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume3_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume3_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume3_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume3_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume3_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume3_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume4?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume4_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume4_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume4_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume4_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume4_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume4_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume4_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume5?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume5_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume5_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume5_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume5_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume5_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume5_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume5_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume6?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume6_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume6_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume6_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume6_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume6_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume6_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume6_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume7?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume7_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume7_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume7_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume7_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume7_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume7_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume7_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume8?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume8_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume8_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume8_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume8_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume8_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume8_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume8_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume9?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume9_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume9_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume9_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume9_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume9_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume9_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume9_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume10?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume10_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume10_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume10_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume10_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume10_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume10_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume10_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume11?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume11_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume11_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume11_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume11_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume11_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume11_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume11_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume12?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume12_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume12_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume12_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume12_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume12_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume12_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume12_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume13?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume13_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume13_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume13_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume13_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume13_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume13_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume13_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume14?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume14_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume14_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume14_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume14_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume14_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume14_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume14_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume15?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume15_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume15_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume15_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume15_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume15_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume15_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume15_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume16?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume16_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume16_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume16_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume16_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume16_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume16_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume16_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume17?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume17_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume17_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume17_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume17_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume17_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume17_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume17_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume18?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume18_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume18_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume18_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume18_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume18_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume18_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume18_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume19?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume19_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume19_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume19_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume19_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume19_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume19_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume19_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume20?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume20_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume20_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume20_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume20_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume20_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume20_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume20_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume21?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume21_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume21_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume21_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume21_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume21_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume21_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume21_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume22?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume22_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume22_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume22_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume22_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume22_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume22_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume22_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume23?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume23_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume23_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume23_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sort24HourVolume23_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume23_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume23_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sort24HourVolume23_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  submissionIDs?: InputMaybe<Array<Scalars["String"]["input"]>>;
  submissionIDs_?: InputMaybe<KlerosSubmission_Filter>;
  submissionIDs_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  submissionIDs_contains_nocase?: InputMaybe<Array<Scalars["String"]["input"]>>;
  submissionIDs_not?: InputMaybe<Array<Scalars["String"]["input"]>>;
  submissionIDs_not_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  submissionIDs_not_contains_nocase?: InputMaybe<
    Array<Scalars["String"]["input"]>
  >;
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
  usdLiquidityMeasure?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdLiquidityMeasure_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdLiquidityMeasure_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdLiquidityMeasure_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  usdLiquidityMeasure_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdLiquidityMeasure_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdLiquidityMeasure_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdLiquidityMeasure_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  usdLiquidityParameter?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdLiquidityParameter_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdLiquidityParameter_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdLiquidityParameter_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  usdLiquidityParameter_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdLiquidityParameter_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdLiquidityParameter_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdLiquidityParameter_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  usdRunningDailyVolume?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdRunningDailyVolumeByHour?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  usdRunningDailyVolumeByHour_contains?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  usdRunningDailyVolumeByHour_contains_nocase?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  usdRunningDailyVolumeByHour_not?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  usdRunningDailyVolumeByHour_not_contains?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  usdRunningDailyVolumeByHour_not_contains_nocase?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  usdRunningDailyVolume_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdRunningDailyVolume_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdRunningDailyVolume_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  usdRunningDailyVolume_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdRunningDailyVolume_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdRunningDailyVolume_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdRunningDailyVolume_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  usdVolume?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdVolumeBeforeLastActiveDayByHour?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  usdVolumeBeforeLastActiveDayByHour_contains?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  usdVolumeBeforeLastActiveDayByHour_contains_nocase?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  usdVolumeBeforeLastActiveDayByHour_not?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  usdVolumeBeforeLastActiveDayByHour_not_contains?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  usdVolumeBeforeLastActiveDayByHour_not_contains_nocase?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  usdVolume_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdVolume_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdVolume_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  usdVolume_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdVolume_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdVolume_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdVolume_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
};

export enum FixedProductMarketMaker_OrderBy {
  AnswerFinalizedTimestamp = "answerFinalizedTimestamp",
  ArbitrationOccurred = "arbitrationOccurred",
  Arbitrator = "arbitrator",
  Category = "category",
  CollateralToken = "collateralToken",
  CollateralVolume = "collateralVolume",
  CollateralVolumeBeforeLastActiveDayByHour = "collateralVolumeBeforeLastActiveDayByHour",
  Condition = "condition",
  ConditionId = "condition__id",
  ConditionOracle = "condition__oracle",
  ConditionOutcomeSlotCount = "condition__outcomeSlotCount",
  ConditionQuestionId = "condition__questionId",
  ConditionResolutionTimestamp = "condition__resolutionTimestamp",
  ConditionScalarHigh = "condition__scalarHigh",
  ConditionScalarLow = "condition__scalarLow",
  Conditions = "conditions",
  CreationTimestamp = "creationTimestamp",
  Creator = "creator",
  CuratedByDxDao = "curatedByDxDao",
  CuratedByDxDaoOrKleros = "curatedByDxDaoOrKleros",
  CurrentAnswer = "currentAnswer",
  CurrentAnswerBond = "currentAnswerBond",
  CurrentAnswerTimestamp = "currentAnswerTimestamp",
  Data = "data",
  Fee = "fee",
  Id = "id",
  IndexedOnQuestion = "indexedOnQuestion",
  IsPendingArbitration = "isPendingArbitration",
  KlerosTcRregistered = "klerosTCRregistered",
  Language = "language",
  LastActiveDay = "lastActiveDay",
  LastActiveDayAndRunningDailyVolume = "lastActiveDayAndRunningDailyVolume",
  LastActiveDayAndScaledRunningDailyVolume = "lastActiveDayAndScaledRunningDailyVolume",
  LastActiveHour = "lastActiveHour",
  LiquidityMeasure = "liquidityMeasure",
  LiquidityParameter = "liquidityParameter",
  OpeningTimestamp = "openingTimestamp",
  OutcomeSlotCount = "outcomeSlotCount",
  OutcomeTokenAmounts = "outcomeTokenAmounts",
  OutcomeTokenMarginalPrices = "outcomeTokenMarginalPrices",
  Outcomes = "outcomes",
  Participants = "participants",
  Payouts = "payouts",
  PoolMembers = "poolMembers",
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
  ResolutionTimestamp = "resolutionTimestamp",
  RunningDailyVolume = "runningDailyVolume",
  RunningDailyVolumeByHour = "runningDailyVolumeByHour",
  ScalarHigh = "scalarHigh",
  ScalarLow = "scalarLow",
  ScaledCollateralVolume = "scaledCollateralVolume",
  ScaledLiquidityMeasure = "scaledLiquidityMeasure",
  ScaledLiquidityParameter = "scaledLiquidityParameter",
  ScaledRunningDailyVolume = "scaledRunningDailyVolume",
  Sort24HourVolume0 = "sort24HourVolume0",
  Sort24HourVolume1 = "sort24HourVolume1",
  Sort24HourVolume2 = "sort24HourVolume2",
  Sort24HourVolume3 = "sort24HourVolume3",
  Sort24HourVolume4 = "sort24HourVolume4",
  Sort24HourVolume5 = "sort24HourVolume5",
  Sort24HourVolume6 = "sort24HourVolume6",
  Sort24HourVolume7 = "sort24HourVolume7",
  Sort24HourVolume8 = "sort24HourVolume8",
  Sort24HourVolume9 = "sort24HourVolume9",
  Sort24HourVolume10 = "sort24HourVolume10",
  Sort24HourVolume11 = "sort24HourVolume11",
  Sort24HourVolume12 = "sort24HourVolume12",
  Sort24HourVolume13 = "sort24HourVolume13",
  Sort24HourVolume14 = "sort24HourVolume14",
  Sort24HourVolume15 = "sort24HourVolume15",
  Sort24HourVolume16 = "sort24HourVolume16",
  Sort24HourVolume17 = "sort24HourVolume17",
  Sort24HourVolume18 = "sort24HourVolume18",
  Sort24HourVolume19 = "sort24HourVolume19",
  Sort24HourVolume20 = "sort24HourVolume20",
  Sort24HourVolume21 = "sort24HourVolume21",
  Sort24HourVolume22 = "sort24HourVolume22",
  Sort24HourVolume23 = "sort24HourVolume23",
  SubmissionIDs = "submissionIDs",
  TemplateId = "templateId",
  Timeout = "timeout",
  Title = "title",
  UsdLiquidityMeasure = "usdLiquidityMeasure",
  UsdLiquidityParameter = "usdLiquidityParameter",
  UsdRunningDailyVolume = "usdRunningDailyVolume",
  UsdRunningDailyVolumeByHour = "usdRunningDailyVolumeByHour",
  UsdVolume = "usdVolume",
  UsdVolumeBeforeLastActiveDayByHour = "usdVolumeBeforeLastActiveDayByHour",
}

export type FpmmLiquidity = {
  __typename?: "FpmmLiquidity";
  additionalLiquidityParameter: Scalars["BigInt"]["output"];
  additionalSharesCost: Scalars["BigInt"]["output"];
  collateralRemovedFromFeePool?: Maybe<Scalars["BigInt"]["output"]>;
  collateralTokenAmount: Scalars["BigInt"]["output"];
  creationTimestamp: Scalars["BigInt"]["output"];
  fpmm: FixedProductMarketMaker;
  funder: Account;
  id: Scalars["ID"]["output"];
  outcomeTokenAmounts?: Maybe<Array<Scalars["BigInt"]["output"]>>;
  sharesAmount: Scalars["BigInt"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
  type: LiquidityType;
};

export type FpmmLiquidity_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  additionalLiquidityParameter?: InputMaybe<Scalars["BigInt"]["input"]>;
  additionalLiquidityParameter_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  additionalLiquidityParameter_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  additionalLiquidityParameter_in?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  additionalLiquidityParameter_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  additionalLiquidityParameter_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  additionalLiquidityParameter_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  additionalLiquidityParameter_not_in?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  additionalSharesCost?: InputMaybe<Scalars["BigInt"]["input"]>;
  additionalSharesCost_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  additionalSharesCost_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  additionalSharesCost_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  additionalSharesCost_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  additionalSharesCost_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  additionalSharesCost_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  additionalSharesCost_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<FpmmLiquidity_Filter>>>;
  collateralRemovedFromFeePool?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralRemovedFromFeePool_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralRemovedFromFeePool_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralRemovedFromFeePool_in?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  collateralRemovedFromFeePool_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralRemovedFromFeePool_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralRemovedFromFeePool_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralRemovedFromFeePool_not_in?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  collateralTokenAmount?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralTokenAmount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralTokenAmount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralTokenAmount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  collateralTokenAmount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralTokenAmount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralTokenAmount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralTokenAmount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  creationTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  creationTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  fpmm?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_?: InputMaybe<FixedProductMarketMaker_Filter>;
  fpmm_contains?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_gt?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_gte?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  fpmm_lt?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_lte?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  fpmm_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  funder?: InputMaybe<Scalars["String"]["input"]>;
  funder_?: InputMaybe<Account_Filter>;
  funder_contains?: InputMaybe<Scalars["String"]["input"]>;
  funder_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  funder_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  funder_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  funder_gt?: InputMaybe<Scalars["String"]["input"]>;
  funder_gte?: InputMaybe<Scalars["String"]["input"]>;
  funder_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  funder_lt?: InputMaybe<Scalars["String"]["input"]>;
  funder_lte?: InputMaybe<Scalars["String"]["input"]>;
  funder_not?: InputMaybe<Scalars["String"]["input"]>;
  funder_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  funder_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  funder_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  funder_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  funder_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  funder_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  funder_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  funder_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  funder_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<FpmmLiquidity_Filter>>>;
  outcomeTokenAmounts?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  outcomeTokenAmounts_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  outcomeTokenAmounts_contains_nocase?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  outcomeTokenAmounts_not?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  outcomeTokenAmounts_not_contains?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  outcomeTokenAmounts_not_contains_nocase?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  sharesAmount?: InputMaybe<Scalars["BigInt"]["input"]>;
  sharesAmount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  sharesAmount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  sharesAmount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  sharesAmount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  sharesAmount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  sharesAmount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  sharesAmount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  type?: InputMaybe<LiquidityType>;
  type_in?: InputMaybe<Array<LiquidityType>>;
  type_not?: InputMaybe<LiquidityType>;
  type_not_in?: InputMaybe<Array<LiquidityType>>;
};

export enum FpmmLiquidity_OrderBy {
  AdditionalLiquidityParameter = "additionalLiquidityParameter",
  AdditionalSharesCost = "additionalSharesCost",
  CollateralRemovedFromFeePool = "collateralRemovedFromFeePool",
  CollateralTokenAmount = "collateralTokenAmount",
  CreationTimestamp = "creationTimestamp",
  Fpmm = "fpmm",
  FpmmAnswerFinalizedTimestamp = "fpmm__answerFinalizedTimestamp",
  FpmmArbitrationOccurred = "fpmm__arbitrationOccurred",
  FpmmArbitrator = "fpmm__arbitrator",
  FpmmCategory = "fpmm__category",
  FpmmCollateralToken = "fpmm__collateralToken",
  FpmmCollateralVolume = "fpmm__collateralVolume",
  FpmmCreationTimestamp = "fpmm__creationTimestamp",
  FpmmCreator = "fpmm__creator",
  FpmmCuratedByDxDao = "fpmm__curatedByDxDao",
  FpmmCuratedByDxDaoOrKleros = "fpmm__curatedByDxDaoOrKleros",
  FpmmCurrentAnswer = "fpmm__currentAnswer",
  FpmmCurrentAnswerBond = "fpmm__currentAnswerBond",
  FpmmCurrentAnswerTimestamp = "fpmm__currentAnswerTimestamp",
  FpmmData = "fpmm__data",
  FpmmFee = "fpmm__fee",
  FpmmId = "fpmm__id",
  FpmmIndexedOnQuestion = "fpmm__indexedOnQuestion",
  FpmmIsPendingArbitration = "fpmm__isPendingArbitration",
  FpmmKlerosTcRregistered = "fpmm__klerosTCRregistered",
  FpmmLanguage = "fpmm__language",
  FpmmLastActiveDay = "fpmm__lastActiveDay",
  FpmmLastActiveDayAndRunningDailyVolume = "fpmm__lastActiveDayAndRunningDailyVolume",
  FpmmLastActiveDayAndScaledRunningDailyVolume = "fpmm__lastActiveDayAndScaledRunningDailyVolume",
  FpmmLastActiveHour = "fpmm__lastActiveHour",
  FpmmLiquidityMeasure = "fpmm__liquidityMeasure",
  FpmmLiquidityParameter = "fpmm__liquidityParameter",
  FpmmOpeningTimestamp = "fpmm__openingTimestamp",
  FpmmOutcomeSlotCount = "fpmm__outcomeSlotCount",
  FpmmResolutionTimestamp = "fpmm__resolutionTimestamp",
  FpmmRunningDailyVolume = "fpmm__runningDailyVolume",
  FpmmScalarHigh = "fpmm__scalarHigh",
  FpmmScalarLow = "fpmm__scalarLow",
  FpmmScaledCollateralVolume = "fpmm__scaledCollateralVolume",
  FpmmScaledLiquidityMeasure = "fpmm__scaledLiquidityMeasure",
  FpmmScaledLiquidityParameter = "fpmm__scaledLiquidityParameter",
  FpmmScaledRunningDailyVolume = "fpmm__scaledRunningDailyVolume",
  FpmmSort24HourVolume0 = "fpmm__sort24HourVolume0",
  FpmmSort24HourVolume1 = "fpmm__sort24HourVolume1",
  FpmmSort24HourVolume2 = "fpmm__sort24HourVolume2",
  FpmmSort24HourVolume3 = "fpmm__sort24HourVolume3",
  FpmmSort24HourVolume4 = "fpmm__sort24HourVolume4",
  FpmmSort24HourVolume5 = "fpmm__sort24HourVolume5",
  FpmmSort24HourVolume6 = "fpmm__sort24HourVolume6",
  FpmmSort24HourVolume7 = "fpmm__sort24HourVolume7",
  FpmmSort24HourVolume8 = "fpmm__sort24HourVolume8",
  FpmmSort24HourVolume9 = "fpmm__sort24HourVolume9",
  FpmmSort24HourVolume10 = "fpmm__sort24HourVolume10",
  FpmmSort24HourVolume11 = "fpmm__sort24HourVolume11",
  FpmmSort24HourVolume12 = "fpmm__sort24HourVolume12",
  FpmmSort24HourVolume13 = "fpmm__sort24HourVolume13",
  FpmmSort24HourVolume14 = "fpmm__sort24HourVolume14",
  FpmmSort24HourVolume15 = "fpmm__sort24HourVolume15",
  FpmmSort24HourVolume16 = "fpmm__sort24HourVolume16",
  FpmmSort24HourVolume17 = "fpmm__sort24HourVolume17",
  FpmmSort24HourVolume18 = "fpmm__sort24HourVolume18",
  FpmmSort24HourVolume19 = "fpmm__sort24HourVolume19",
  FpmmSort24HourVolume20 = "fpmm__sort24HourVolume20",
  FpmmSort24HourVolume21 = "fpmm__sort24HourVolume21",
  FpmmSort24HourVolume22 = "fpmm__sort24HourVolume22",
  FpmmSort24HourVolume23 = "fpmm__sort24HourVolume23",
  FpmmTemplateId = "fpmm__templateId",
  FpmmTimeout = "fpmm__timeout",
  FpmmTitle = "fpmm__title",
  FpmmUsdLiquidityMeasure = "fpmm__usdLiquidityMeasure",
  FpmmUsdLiquidityParameter = "fpmm__usdLiquidityParameter",
  FpmmUsdRunningDailyVolume = "fpmm__usdRunningDailyVolume",
  FpmmUsdVolume = "fpmm__usdVolume",
  Funder = "funder",
  FunderId = "funder__id",
  FunderTradeNonce = "funder__tradeNonce",
  Id = "id",
  OutcomeTokenAmounts = "outcomeTokenAmounts",
  SharesAmount = "sharesAmount",
  TransactionHash = "transactionHash",
  Type = "type",
}

export type FpmmParticipation = {
  __typename?: "FpmmParticipation";
  arbitrator?: Maybe<Scalars["Bytes"]["output"]>;
  category?: Maybe<Scalars["String"]["output"]>;
  collateralToken: Scalars["Bytes"]["output"];
  creationTimestamp: Scalars["BigInt"]["output"];
  fee: Scalars["BigInt"]["output"];
  fpmm: FixedProductMarketMaker;
  id: Scalars["ID"]["output"];
  language?: Maybe<Scalars["String"]["output"]>;
  openingTimestamp?: Maybe<Scalars["BigInt"]["output"]>;
  participant: Account;
  timeout?: Maybe<Scalars["BigInt"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
};

export type FpmmParticipation_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FpmmParticipation_Filter>>>;
  arbitrator?: InputMaybe<Scalars["Bytes"]["input"]>;
  arbitrator_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  arbitrator_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  arbitrator_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  arbitrator_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  arbitrator_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  arbitrator_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  arbitrator_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  arbitrator_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  arbitrator_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
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
  collateralToken?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  collateralToken_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  creationTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  creationTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  fee?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  fee_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  fpmm?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_?: InputMaybe<FixedProductMarketMaker_Filter>;
  fpmm_contains?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_gt?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_gte?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  fpmm_lt?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_lte?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  fpmm_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
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
  or?: InputMaybe<Array<InputMaybe<FpmmParticipation_Filter>>>;
  participant?: InputMaybe<Scalars["String"]["input"]>;
  participant_?: InputMaybe<Account_Filter>;
  participant_contains?: InputMaybe<Scalars["String"]["input"]>;
  participant_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  participant_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  participant_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  participant_gt?: InputMaybe<Scalars["String"]["input"]>;
  participant_gte?: InputMaybe<Scalars["String"]["input"]>;
  participant_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  participant_lt?: InputMaybe<Scalars["String"]["input"]>;
  participant_lte?: InputMaybe<Scalars["String"]["input"]>;
  participant_not?: InputMaybe<Scalars["String"]["input"]>;
  participant_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  participant_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  participant_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  participant_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  participant_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  participant_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  participant_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  participant_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  participant_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
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

export enum FpmmParticipation_OrderBy {
  Arbitrator = "arbitrator",
  Category = "category",
  CollateralToken = "collateralToken",
  CreationTimestamp = "creationTimestamp",
  Fee = "fee",
  Fpmm = "fpmm",
  FpmmAnswerFinalizedTimestamp = "fpmm__answerFinalizedTimestamp",
  FpmmArbitrationOccurred = "fpmm__arbitrationOccurred",
  FpmmArbitrator = "fpmm__arbitrator",
  FpmmCategory = "fpmm__category",
  FpmmCollateralToken = "fpmm__collateralToken",
  FpmmCollateralVolume = "fpmm__collateralVolume",
  FpmmCreationTimestamp = "fpmm__creationTimestamp",
  FpmmCreator = "fpmm__creator",
  FpmmCuratedByDxDao = "fpmm__curatedByDxDao",
  FpmmCuratedByDxDaoOrKleros = "fpmm__curatedByDxDaoOrKleros",
  FpmmCurrentAnswer = "fpmm__currentAnswer",
  FpmmCurrentAnswerBond = "fpmm__currentAnswerBond",
  FpmmCurrentAnswerTimestamp = "fpmm__currentAnswerTimestamp",
  FpmmData = "fpmm__data",
  FpmmFee = "fpmm__fee",
  FpmmId = "fpmm__id",
  FpmmIndexedOnQuestion = "fpmm__indexedOnQuestion",
  FpmmIsPendingArbitration = "fpmm__isPendingArbitration",
  FpmmKlerosTcRregistered = "fpmm__klerosTCRregistered",
  FpmmLanguage = "fpmm__language",
  FpmmLastActiveDay = "fpmm__lastActiveDay",
  FpmmLastActiveDayAndRunningDailyVolume = "fpmm__lastActiveDayAndRunningDailyVolume",
  FpmmLastActiveDayAndScaledRunningDailyVolume = "fpmm__lastActiveDayAndScaledRunningDailyVolume",
  FpmmLastActiveHour = "fpmm__lastActiveHour",
  FpmmLiquidityMeasure = "fpmm__liquidityMeasure",
  FpmmLiquidityParameter = "fpmm__liquidityParameter",
  FpmmOpeningTimestamp = "fpmm__openingTimestamp",
  FpmmOutcomeSlotCount = "fpmm__outcomeSlotCount",
  FpmmResolutionTimestamp = "fpmm__resolutionTimestamp",
  FpmmRunningDailyVolume = "fpmm__runningDailyVolume",
  FpmmScalarHigh = "fpmm__scalarHigh",
  FpmmScalarLow = "fpmm__scalarLow",
  FpmmScaledCollateralVolume = "fpmm__scaledCollateralVolume",
  FpmmScaledLiquidityMeasure = "fpmm__scaledLiquidityMeasure",
  FpmmScaledLiquidityParameter = "fpmm__scaledLiquidityParameter",
  FpmmScaledRunningDailyVolume = "fpmm__scaledRunningDailyVolume",
  FpmmSort24HourVolume0 = "fpmm__sort24HourVolume0",
  FpmmSort24HourVolume1 = "fpmm__sort24HourVolume1",
  FpmmSort24HourVolume2 = "fpmm__sort24HourVolume2",
  FpmmSort24HourVolume3 = "fpmm__sort24HourVolume3",
  FpmmSort24HourVolume4 = "fpmm__sort24HourVolume4",
  FpmmSort24HourVolume5 = "fpmm__sort24HourVolume5",
  FpmmSort24HourVolume6 = "fpmm__sort24HourVolume6",
  FpmmSort24HourVolume7 = "fpmm__sort24HourVolume7",
  FpmmSort24HourVolume8 = "fpmm__sort24HourVolume8",
  FpmmSort24HourVolume9 = "fpmm__sort24HourVolume9",
  FpmmSort24HourVolume10 = "fpmm__sort24HourVolume10",
  FpmmSort24HourVolume11 = "fpmm__sort24HourVolume11",
  FpmmSort24HourVolume12 = "fpmm__sort24HourVolume12",
  FpmmSort24HourVolume13 = "fpmm__sort24HourVolume13",
  FpmmSort24HourVolume14 = "fpmm__sort24HourVolume14",
  FpmmSort24HourVolume15 = "fpmm__sort24HourVolume15",
  FpmmSort24HourVolume16 = "fpmm__sort24HourVolume16",
  FpmmSort24HourVolume17 = "fpmm__sort24HourVolume17",
  FpmmSort24HourVolume18 = "fpmm__sort24HourVolume18",
  FpmmSort24HourVolume19 = "fpmm__sort24HourVolume19",
  FpmmSort24HourVolume20 = "fpmm__sort24HourVolume20",
  FpmmSort24HourVolume21 = "fpmm__sort24HourVolume21",
  FpmmSort24HourVolume22 = "fpmm__sort24HourVolume22",
  FpmmSort24HourVolume23 = "fpmm__sort24HourVolume23",
  FpmmTemplateId = "fpmm__templateId",
  FpmmTimeout = "fpmm__timeout",
  FpmmTitle = "fpmm__title",
  FpmmUsdLiquidityMeasure = "fpmm__usdLiquidityMeasure",
  FpmmUsdLiquidityParameter = "fpmm__usdLiquidityParameter",
  FpmmUsdRunningDailyVolume = "fpmm__usdRunningDailyVolume",
  FpmmUsdVolume = "fpmm__usdVolume",
  Id = "id",
  Language = "language",
  OpeningTimestamp = "openingTimestamp",
  Participant = "participant",
  ParticipantId = "participant__id",
  ParticipantTradeNonce = "participant__tradeNonce",
  Timeout = "timeout",
  Title = "title",
}

export type FpmmPoolMembership = {
  __typename?: "FpmmPoolMembership";
  amount: Scalars["BigInt"]["output"];
  funder: Account;
  id: Scalars["ID"]["output"];
  pool: FixedProductMarketMaker;
};

export type FpmmPoolMembership_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  amount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<FpmmPoolMembership_Filter>>>;
  funder?: InputMaybe<Scalars["String"]["input"]>;
  funder_?: InputMaybe<Account_Filter>;
  funder_contains?: InputMaybe<Scalars["String"]["input"]>;
  funder_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  funder_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  funder_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  funder_gt?: InputMaybe<Scalars["String"]["input"]>;
  funder_gte?: InputMaybe<Scalars["String"]["input"]>;
  funder_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  funder_lt?: InputMaybe<Scalars["String"]["input"]>;
  funder_lte?: InputMaybe<Scalars["String"]["input"]>;
  funder_not?: InputMaybe<Scalars["String"]["input"]>;
  funder_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  funder_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  funder_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  funder_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  funder_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  funder_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  funder_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  funder_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  funder_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<FpmmPoolMembership_Filter>>>;
  pool?: InputMaybe<Scalars["String"]["input"]>;
  pool_?: InputMaybe<FixedProductMarketMaker_Filter>;
  pool_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_gt?: InputMaybe<Scalars["String"]["input"]>;
  pool_gte?: InputMaybe<Scalars["String"]["input"]>;
  pool_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_lt?: InputMaybe<Scalars["String"]["input"]>;
  pool_lte?: InputMaybe<Scalars["String"]["input"]>;
  pool_not?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum FpmmPoolMembership_OrderBy {
  Amount = "amount",
  Funder = "funder",
  FunderId = "funder__id",
  FunderTradeNonce = "funder__tradeNonce",
  Id = "id",
  Pool = "pool",
  PoolAnswerFinalizedTimestamp = "pool__answerFinalizedTimestamp",
  PoolArbitrationOccurred = "pool__arbitrationOccurred",
  PoolArbitrator = "pool__arbitrator",
  PoolCategory = "pool__category",
  PoolCollateralToken = "pool__collateralToken",
  PoolCollateralVolume = "pool__collateralVolume",
  PoolCreationTimestamp = "pool__creationTimestamp",
  PoolCreator = "pool__creator",
  PoolCuratedByDxDao = "pool__curatedByDxDao",
  PoolCuratedByDxDaoOrKleros = "pool__curatedByDxDaoOrKleros",
  PoolCurrentAnswer = "pool__currentAnswer",
  PoolCurrentAnswerBond = "pool__currentAnswerBond",
  PoolCurrentAnswerTimestamp = "pool__currentAnswerTimestamp",
  PoolData = "pool__data",
  PoolFee = "pool__fee",
  PoolId = "pool__id",
  PoolIndexedOnQuestion = "pool__indexedOnQuestion",
  PoolIsPendingArbitration = "pool__isPendingArbitration",
  PoolKlerosTcRregistered = "pool__klerosTCRregistered",
  PoolLanguage = "pool__language",
  PoolLastActiveDay = "pool__lastActiveDay",
  PoolLastActiveDayAndRunningDailyVolume = "pool__lastActiveDayAndRunningDailyVolume",
  PoolLastActiveDayAndScaledRunningDailyVolume = "pool__lastActiveDayAndScaledRunningDailyVolume",
  PoolLastActiveHour = "pool__lastActiveHour",
  PoolLiquidityMeasure = "pool__liquidityMeasure",
  PoolLiquidityParameter = "pool__liquidityParameter",
  PoolOpeningTimestamp = "pool__openingTimestamp",
  PoolOutcomeSlotCount = "pool__outcomeSlotCount",
  PoolResolutionTimestamp = "pool__resolutionTimestamp",
  PoolRunningDailyVolume = "pool__runningDailyVolume",
  PoolScalarHigh = "pool__scalarHigh",
  PoolScalarLow = "pool__scalarLow",
  PoolScaledCollateralVolume = "pool__scaledCollateralVolume",
  PoolScaledLiquidityMeasure = "pool__scaledLiquidityMeasure",
  PoolScaledLiquidityParameter = "pool__scaledLiquidityParameter",
  PoolScaledRunningDailyVolume = "pool__scaledRunningDailyVolume",
  PoolSort24HourVolume0 = "pool__sort24HourVolume0",
  PoolSort24HourVolume1 = "pool__sort24HourVolume1",
  PoolSort24HourVolume2 = "pool__sort24HourVolume2",
  PoolSort24HourVolume3 = "pool__sort24HourVolume3",
  PoolSort24HourVolume4 = "pool__sort24HourVolume4",
  PoolSort24HourVolume5 = "pool__sort24HourVolume5",
  PoolSort24HourVolume6 = "pool__sort24HourVolume6",
  PoolSort24HourVolume7 = "pool__sort24HourVolume7",
  PoolSort24HourVolume8 = "pool__sort24HourVolume8",
  PoolSort24HourVolume9 = "pool__sort24HourVolume9",
  PoolSort24HourVolume10 = "pool__sort24HourVolume10",
  PoolSort24HourVolume11 = "pool__sort24HourVolume11",
  PoolSort24HourVolume12 = "pool__sort24HourVolume12",
  PoolSort24HourVolume13 = "pool__sort24HourVolume13",
  PoolSort24HourVolume14 = "pool__sort24HourVolume14",
  PoolSort24HourVolume15 = "pool__sort24HourVolume15",
  PoolSort24HourVolume16 = "pool__sort24HourVolume16",
  PoolSort24HourVolume17 = "pool__sort24HourVolume17",
  PoolSort24HourVolume18 = "pool__sort24HourVolume18",
  PoolSort24HourVolume19 = "pool__sort24HourVolume19",
  PoolSort24HourVolume20 = "pool__sort24HourVolume20",
  PoolSort24HourVolume21 = "pool__sort24HourVolume21",
  PoolSort24HourVolume22 = "pool__sort24HourVolume22",
  PoolSort24HourVolume23 = "pool__sort24HourVolume23",
  PoolTemplateId = "pool__templateId",
  PoolTimeout = "pool__timeout",
  PoolTitle = "pool__title",
  PoolUsdLiquidityMeasure = "pool__usdLiquidityMeasure",
  PoolUsdLiquidityParameter = "pool__usdLiquidityParameter",
  PoolUsdRunningDailyVolume = "pool__usdRunningDailyVolume",
  PoolUsdVolume = "pool__usdVolume",
}

export type FpmmTrade = {
  __typename?: "FpmmTrade";
  collateralAmount: Scalars["BigInt"]["output"];
  collateralAmountUSD: Scalars["BigDecimal"]["output"];
  collateralToken: Scalars["Bytes"]["output"];
  creationTimestamp: Scalars["BigInt"]["output"];
  creator: Account;
  feeAmount: Scalars["BigInt"]["output"];
  fpmm: FixedProductMarketMaker;
  id: Scalars["ID"]["output"];
  oldOutcomeTokenMarginalPrice: Scalars["BigDecimal"]["output"];
  outcomeIndex: Scalars["BigInt"]["output"];
  outcomeTokenMarginalPrice: Scalars["BigDecimal"]["output"];
  outcomeTokensTraded: Scalars["BigInt"]["output"];
  title?: Maybe<Scalars["String"]["output"]>;
  transactionHash: Scalars["Bytes"]["output"];
  type: TradeType;
};

export type FpmmTrade_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FpmmTrade_Filter>>>;
  collateralAmount?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralAmountUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralAmountUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralAmountUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralAmountUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  collateralAmountUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralAmountUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralAmountUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralAmountUSD_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  collateralAmount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralAmount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralAmount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  collateralAmount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralAmount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralAmount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralAmount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  collateralToken?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  collateralToken_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  creationTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  creationTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  creator?: InputMaybe<Scalars["String"]["input"]>;
  creator_?: InputMaybe<Account_Filter>;
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
  feeAmount?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeAmount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  fpmm?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_?: InputMaybe<FixedProductMarketMaker_Filter>;
  fpmm_contains?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_gt?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_gte?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  fpmm_lt?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_lte?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  fpmm_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  oldOutcomeTokenMarginalPrice?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  oldOutcomeTokenMarginalPrice_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  oldOutcomeTokenMarginalPrice_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  oldOutcomeTokenMarginalPrice_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  oldOutcomeTokenMarginalPrice_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  oldOutcomeTokenMarginalPrice_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  oldOutcomeTokenMarginalPrice_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  oldOutcomeTokenMarginalPrice_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  or?: InputMaybe<Array<InputMaybe<FpmmTrade_Filter>>>;
  outcomeIndex?: InputMaybe<Scalars["BigInt"]["input"]>;
  outcomeIndex_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  outcomeIndex_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  outcomeIndex_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  outcomeIndex_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  outcomeIndex_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  outcomeIndex_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  outcomeIndex_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  outcomeTokenMarginalPrice?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  outcomeTokenMarginalPrice_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  outcomeTokenMarginalPrice_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  outcomeTokenMarginalPrice_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  outcomeTokenMarginalPrice_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  outcomeTokenMarginalPrice_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  outcomeTokenMarginalPrice_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  outcomeTokenMarginalPrice_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  outcomeTokensTraded?: InputMaybe<Scalars["BigInt"]["input"]>;
  outcomeTokensTraded_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  outcomeTokensTraded_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  outcomeTokensTraded_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  outcomeTokensTraded_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  outcomeTokensTraded_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  outcomeTokensTraded_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  outcomeTokensTraded_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
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
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  type?: InputMaybe<TradeType>;
  type_in?: InputMaybe<Array<TradeType>>;
  type_not?: InputMaybe<TradeType>;
  type_not_in?: InputMaybe<Array<TradeType>>;
};

export enum FpmmTrade_OrderBy {
  CollateralAmount = "collateralAmount",
  CollateralAmountUsd = "collateralAmountUSD",
  CollateralToken = "collateralToken",
  CreationTimestamp = "creationTimestamp",
  Creator = "creator",
  CreatorId = "creator__id",
  CreatorTradeNonce = "creator__tradeNonce",
  FeeAmount = "feeAmount",
  Fpmm = "fpmm",
  FpmmAnswerFinalizedTimestamp = "fpmm__answerFinalizedTimestamp",
  FpmmArbitrationOccurred = "fpmm__arbitrationOccurred",
  FpmmArbitrator = "fpmm__arbitrator",
  FpmmCategory = "fpmm__category",
  FpmmCollateralToken = "fpmm__collateralToken",
  FpmmCollateralVolume = "fpmm__collateralVolume",
  FpmmCreationTimestamp = "fpmm__creationTimestamp",
  FpmmCreator = "fpmm__creator",
  FpmmCuratedByDxDao = "fpmm__curatedByDxDao",
  FpmmCuratedByDxDaoOrKleros = "fpmm__curatedByDxDaoOrKleros",
  FpmmCurrentAnswer = "fpmm__currentAnswer",
  FpmmCurrentAnswerBond = "fpmm__currentAnswerBond",
  FpmmCurrentAnswerTimestamp = "fpmm__currentAnswerTimestamp",
  FpmmData = "fpmm__data",
  FpmmFee = "fpmm__fee",
  FpmmId = "fpmm__id",
  FpmmIndexedOnQuestion = "fpmm__indexedOnQuestion",
  FpmmIsPendingArbitration = "fpmm__isPendingArbitration",
  FpmmKlerosTcRregistered = "fpmm__klerosTCRregistered",
  FpmmLanguage = "fpmm__language",
  FpmmLastActiveDay = "fpmm__lastActiveDay",
  FpmmLastActiveDayAndRunningDailyVolume = "fpmm__lastActiveDayAndRunningDailyVolume",
  FpmmLastActiveDayAndScaledRunningDailyVolume = "fpmm__lastActiveDayAndScaledRunningDailyVolume",
  FpmmLastActiveHour = "fpmm__lastActiveHour",
  FpmmLiquidityMeasure = "fpmm__liquidityMeasure",
  FpmmLiquidityParameter = "fpmm__liquidityParameter",
  FpmmOpeningTimestamp = "fpmm__openingTimestamp",
  FpmmOutcomeSlotCount = "fpmm__outcomeSlotCount",
  FpmmResolutionTimestamp = "fpmm__resolutionTimestamp",
  FpmmRunningDailyVolume = "fpmm__runningDailyVolume",
  FpmmScalarHigh = "fpmm__scalarHigh",
  FpmmScalarLow = "fpmm__scalarLow",
  FpmmScaledCollateralVolume = "fpmm__scaledCollateralVolume",
  FpmmScaledLiquidityMeasure = "fpmm__scaledLiquidityMeasure",
  FpmmScaledLiquidityParameter = "fpmm__scaledLiquidityParameter",
  FpmmScaledRunningDailyVolume = "fpmm__scaledRunningDailyVolume",
  FpmmSort24HourVolume0 = "fpmm__sort24HourVolume0",
  FpmmSort24HourVolume1 = "fpmm__sort24HourVolume1",
  FpmmSort24HourVolume2 = "fpmm__sort24HourVolume2",
  FpmmSort24HourVolume3 = "fpmm__sort24HourVolume3",
  FpmmSort24HourVolume4 = "fpmm__sort24HourVolume4",
  FpmmSort24HourVolume5 = "fpmm__sort24HourVolume5",
  FpmmSort24HourVolume6 = "fpmm__sort24HourVolume6",
  FpmmSort24HourVolume7 = "fpmm__sort24HourVolume7",
  FpmmSort24HourVolume8 = "fpmm__sort24HourVolume8",
  FpmmSort24HourVolume9 = "fpmm__sort24HourVolume9",
  FpmmSort24HourVolume10 = "fpmm__sort24HourVolume10",
  FpmmSort24HourVolume11 = "fpmm__sort24HourVolume11",
  FpmmSort24HourVolume12 = "fpmm__sort24HourVolume12",
  FpmmSort24HourVolume13 = "fpmm__sort24HourVolume13",
  FpmmSort24HourVolume14 = "fpmm__sort24HourVolume14",
  FpmmSort24HourVolume15 = "fpmm__sort24HourVolume15",
  FpmmSort24HourVolume16 = "fpmm__sort24HourVolume16",
  FpmmSort24HourVolume17 = "fpmm__sort24HourVolume17",
  FpmmSort24HourVolume18 = "fpmm__sort24HourVolume18",
  FpmmSort24HourVolume19 = "fpmm__sort24HourVolume19",
  FpmmSort24HourVolume20 = "fpmm__sort24HourVolume20",
  FpmmSort24HourVolume21 = "fpmm__sort24HourVolume21",
  FpmmSort24HourVolume22 = "fpmm__sort24HourVolume22",
  FpmmSort24HourVolume23 = "fpmm__sort24HourVolume23",
  FpmmTemplateId = "fpmm__templateId",
  FpmmTimeout = "fpmm__timeout",
  FpmmTitle = "fpmm__title",
  FpmmUsdLiquidityMeasure = "fpmm__usdLiquidityMeasure",
  FpmmUsdLiquidityParameter = "fpmm__usdLiquidityParameter",
  FpmmUsdRunningDailyVolume = "fpmm__usdRunningDailyVolume",
  FpmmUsdVolume = "fpmm__usdVolume",
  Id = "id",
  OldOutcomeTokenMarginalPrice = "oldOutcomeTokenMarginalPrice",
  OutcomeIndex = "outcomeIndex",
  OutcomeTokenMarginalPrice = "outcomeTokenMarginalPrice",
  OutcomeTokensTraded = "outcomeTokensTraded",
  Title = "title",
  TransactionHash = "transactionHash",
  Type = "type",
}

export type FpmmTransaction = {
  __typename?: "FpmmTransaction";
  additionalSharesCost?: Maybe<Scalars["BigInt"]["output"]>;
  collateralTokenAmount: Scalars["BigInt"]["output"];
  creationTimestamp: Scalars["BigInt"]["output"];
  fpmm: FixedProductMarketMaker;
  fpmmType: FpmmType;
  id: Scalars["ID"]["output"];
  sharesOrPoolTokenAmount: Scalars["BigInt"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
  transactionType: TransactionType;
  user: Account;
};

export type FpmmTransaction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  additionalSharesCost?: InputMaybe<Scalars["BigInt"]["input"]>;
  additionalSharesCost_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  additionalSharesCost_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  additionalSharesCost_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  additionalSharesCost_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  additionalSharesCost_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  additionalSharesCost_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  additionalSharesCost_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<FpmmTransaction_Filter>>>;
  collateralTokenAmount?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralTokenAmount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralTokenAmount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralTokenAmount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  collateralTokenAmount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralTokenAmount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralTokenAmount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  collateralTokenAmount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  creationTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  creationTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  creationTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  fpmm?: InputMaybe<Scalars["String"]["input"]>;
  fpmmType?: InputMaybe<FpmmType>;
  fpmmType_in?: InputMaybe<Array<FpmmType>>;
  fpmmType_not?: InputMaybe<FpmmType>;
  fpmmType_not_in?: InputMaybe<Array<FpmmType>>;
  fpmm_?: InputMaybe<FixedProductMarketMaker_Filter>;
  fpmm_contains?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_gt?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_gte?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  fpmm_lt?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_lte?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  fpmm_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  fpmm_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<FpmmTransaction_Filter>>>;
  sharesOrPoolTokenAmount?: InputMaybe<Scalars["BigInt"]["input"]>;
  sharesOrPoolTokenAmount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  sharesOrPoolTokenAmount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  sharesOrPoolTokenAmount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  sharesOrPoolTokenAmount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  sharesOrPoolTokenAmount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  sharesOrPoolTokenAmount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  sharesOrPoolTokenAmount_not_in?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionType?: InputMaybe<TransactionType>;
  transactionType_in?: InputMaybe<Array<TransactionType>>;
  transactionType_not?: InputMaybe<TransactionType>;
  transactionType_not_in?: InputMaybe<Array<TransactionType>>;
  user?: InputMaybe<Scalars["String"]["input"]>;
  user_?: InputMaybe<Account_Filter>;
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
};

export enum FpmmTransaction_OrderBy {
  AdditionalSharesCost = "additionalSharesCost",
  CollateralTokenAmount = "collateralTokenAmount",
  CreationTimestamp = "creationTimestamp",
  Fpmm = "fpmm",
  FpmmType = "fpmmType",
  FpmmAnswerFinalizedTimestamp = "fpmm__answerFinalizedTimestamp",
  FpmmArbitrationOccurred = "fpmm__arbitrationOccurred",
  FpmmArbitrator = "fpmm__arbitrator",
  FpmmCategory = "fpmm__category",
  FpmmCollateralToken = "fpmm__collateralToken",
  FpmmCollateralVolume = "fpmm__collateralVolume",
  FpmmCreationTimestamp = "fpmm__creationTimestamp",
  FpmmCreator = "fpmm__creator",
  FpmmCuratedByDxDao = "fpmm__curatedByDxDao",
  FpmmCuratedByDxDaoOrKleros = "fpmm__curatedByDxDaoOrKleros",
  FpmmCurrentAnswer = "fpmm__currentAnswer",
  FpmmCurrentAnswerBond = "fpmm__currentAnswerBond",
  FpmmCurrentAnswerTimestamp = "fpmm__currentAnswerTimestamp",
  FpmmData = "fpmm__data",
  FpmmFee = "fpmm__fee",
  FpmmId = "fpmm__id",
  FpmmIndexedOnQuestion = "fpmm__indexedOnQuestion",
  FpmmIsPendingArbitration = "fpmm__isPendingArbitration",
  FpmmKlerosTcRregistered = "fpmm__klerosTCRregistered",
  FpmmLanguage = "fpmm__language",
  FpmmLastActiveDay = "fpmm__lastActiveDay",
  FpmmLastActiveDayAndRunningDailyVolume = "fpmm__lastActiveDayAndRunningDailyVolume",
  FpmmLastActiveDayAndScaledRunningDailyVolume = "fpmm__lastActiveDayAndScaledRunningDailyVolume",
  FpmmLastActiveHour = "fpmm__lastActiveHour",
  FpmmLiquidityMeasure = "fpmm__liquidityMeasure",
  FpmmLiquidityParameter = "fpmm__liquidityParameter",
  FpmmOpeningTimestamp = "fpmm__openingTimestamp",
  FpmmOutcomeSlotCount = "fpmm__outcomeSlotCount",
  FpmmResolutionTimestamp = "fpmm__resolutionTimestamp",
  FpmmRunningDailyVolume = "fpmm__runningDailyVolume",
  FpmmScalarHigh = "fpmm__scalarHigh",
  FpmmScalarLow = "fpmm__scalarLow",
  FpmmScaledCollateralVolume = "fpmm__scaledCollateralVolume",
  FpmmScaledLiquidityMeasure = "fpmm__scaledLiquidityMeasure",
  FpmmScaledLiquidityParameter = "fpmm__scaledLiquidityParameter",
  FpmmScaledRunningDailyVolume = "fpmm__scaledRunningDailyVolume",
  FpmmSort24HourVolume0 = "fpmm__sort24HourVolume0",
  FpmmSort24HourVolume1 = "fpmm__sort24HourVolume1",
  FpmmSort24HourVolume2 = "fpmm__sort24HourVolume2",
  FpmmSort24HourVolume3 = "fpmm__sort24HourVolume3",
  FpmmSort24HourVolume4 = "fpmm__sort24HourVolume4",
  FpmmSort24HourVolume5 = "fpmm__sort24HourVolume5",
  FpmmSort24HourVolume6 = "fpmm__sort24HourVolume6",
  FpmmSort24HourVolume7 = "fpmm__sort24HourVolume7",
  FpmmSort24HourVolume8 = "fpmm__sort24HourVolume8",
  FpmmSort24HourVolume9 = "fpmm__sort24HourVolume9",
  FpmmSort24HourVolume10 = "fpmm__sort24HourVolume10",
  FpmmSort24HourVolume11 = "fpmm__sort24HourVolume11",
  FpmmSort24HourVolume12 = "fpmm__sort24HourVolume12",
  FpmmSort24HourVolume13 = "fpmm__sort24HourVolume13",
  FpmmSort24HourVolume14 = "fpmm__sort24HourVolume14",
  FpmmSort24HourVolume15 = "fpmm__sort24HourVolume15",
  FpmmSort24HourVolume16 = "fpmm__sort24HourVolume16",
  FpmmSort24HourVolume17 = "fpmm__sort24HourVolume17",
  FpmmSort24HourVolume18 = "fpmm__sort24HourVolume18",
  FpmmSort24HourVolume19 = "fpmm__sort24HourVolume19",
  FpmmSort24HourVolume20 = "fpmm__sort24HourVolume20",
  FpmmSort24HourVolume21 = "fpmm__sort24HourVolume21",
  FpmmSort24HourVolume22 = "fpmm__sort24HourVolume22",
  FpmmSort24HourVolume23 = "fpmm__sort24HourVolume23",
  FpmmTemplateId = "fpmm__templateId",
  FpmmTimeout = "fpmm__timeout",
  FpmmTitle = "fpmm__title",
  FpmmUsdLiquidityMeasure = "fpmm__usdLiquidityMeasure",
  FpmmUsdLiquidityParameter = "fpmm__usdLiquidityParameter",
  FpmmUsdRunningDailyVolume = "fpmm__usdRunningDailyVolume",
  FpmmUsdVolume = "fpmm__usdVolume",
  Id = "id",
  SharesOrPoolTokenAmount = "sharesOrPoolTokenAmount",
  TransactionHash = "transactionHash",
  TransactionType = "transactionType",
  User = "user",
  UserId = "user__id",
  UserTradeNonce = "user__tradeNonce",
}

export enum FpmmType {
  Liquidity = "Liquidity",
  Trade = "Trade",
}

export type GelatoUser = {
  __typename?: "GelatoUser";
  address: Scalars["Bytes"]["output"];
  executor?: Maybe<Scalars["Bytes"]["output"]>;
  id: Scalars["ID"]["output"];
  signUpDate: Scalars["BigInt"]["output"];
};

export type GelatoUser_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  address_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<GelatoUser_Filter>>>;
  executor?: InputMaybe<Scalars["Bytes"]["input"]>;
  executor_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  executor_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  executor_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  executor_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  executor_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  executor_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  executor_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  executor_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  executor_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<GelatoUser_Filter>>>;
  signUpDate?: InputMaybe<Scalars["BigInt"]["input"]>;
  signUpDate_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  signUpDate_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  signUpDate_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  signUpDate_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  signUpDate_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  signUpDate_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  signUpDate_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum GelatoUser_OrderBy {
  Address = "address",
  Executor = "executor",
  Id = "id",
  SignUpDate = "signUpDate",
}

export type Global = {
  __typename?: "Global";
  id: Scalars["ID"]["output"];
  numClosedConditions: Scalars["Int"]["output"];
  numConditions: Scalars["Int"]["output"];
  numOpenConditions: Scalars["Int"]["output"];
  usdPerEth?: Maybe<Scalars["BigDecimal"]["output"]>;
  usdVolume: Scalars["BigDecimal"]["output"];
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
  or?: InputMaybe<Array<InputMaybe<Global_Filter>>>;
  usdPerEth?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdPerEth_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdPerEth_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdPerEth_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  usdPerEth_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdPerEth_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdPerEth_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdPerEth_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  usdVolume?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdVolume_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdVolume_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdVolume_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  usdVolume_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdVolume_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdVolume_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdVolume_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
};

export enum Global_OrderBy {
  Id = "id",
  NumClosedConditions = "numClosedConditions",
  NumConditions = "numConditions",
  NumOpenConditions = "numOpenConditions",
  UsdPerEth = "usdPerEth",
  UsdVolume = "usdVolume",
}

export enum KlerosStatus {
  /** The item is not registered on the TCR and there are no pending requests. */
  Absent = "Absent",
  /** The item is registered on the TCR, but there is a pending removal request. These are sometimes also called removal requests. */
  ClearingRequested = "ClearingRequested",
  /** The item is registered and there are no pending requests. */
  Registered = "Registered",
  /** The item is not registered on the TCR, but there is a pending registration request. */
  RegistrationRequested = "RegistrationRequested",
}

export type KlerosSubmission = {
  __typename?: "KlerosSubmission";
  id: Scalars["ID"]["output"];
  listAddress: Scalars["String"]["output"];
  market: FixedProductMarketMaker;
  status: KlerosStatus;
};

export type KlerosSubmission_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<KlerosSubmission_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  listAddress?: InputMaybe<Scalars["String"]["input"]>;
  listAddress_contains?: InputMaybe<Scalars["String"]["input"]>;
  listAddress_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  listAddress_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  listAddress_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  listAddress_gt?: InputMaybe<Scalars["String"]["input"]>;
  listAddress_gte?: InputMaybe<Scalars["String"]["input"]>;
  listAddress_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  listAddress_lt?: InputMaybe<Scalars["String"]["input"]>;
  listAddress_lte?: InputMaybe<Scalars["String"]["input"]>;
  listAddress_not?: InputMaybe<Scalars["String"]["input"]>;
  listAddress_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  listAddress_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  listAddress_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  listAddress_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  listAddress_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  listAddress_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  listAddress_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  listAddress_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  listAddress_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  market?: InputMaybe<Scalars["String"]["input"]>;
  market_?: InputMaybe<FixedProductMarketMaker_Filter>;
  market_contains?: InputMaybe<Scalars["String"]["input"]>;
  market_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  market_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  market_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  market_gt?: InputMaybe<Scalars["String"]["input"]>;
  market_gte?: InputMaybe<Scalars["String"]["input"]>;
  market_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  market_lt?: InputMaybe<Scalars["String"]["input"]>;
  market_lte?: InputMaybe<Scalars["String"]["input"]>;
  market_not?: InputMaybe<Scalars["String"]["input"]>;
  market_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  market_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  market_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  market_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  market_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  market_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  market_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  market_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  market_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<KlerosSubmission_Filter>>>;
  status?: InputMaybe<KlerosStatus>;
  status_in?: InputMaybe<Array<KlerosStatus>>;
  status_not?: InputMaybe<KlerosStatus>;
  status_not_in?: InputMaybe<Array<KlerosStatus>>;
};

export enum KlerosSubmission_OrderBy {
  Id = "id",
  ListAddress = "listAddress",
  Market = "market",
  MarketAnswerFinalizedTimestamp = "market__answerFinalizedTimestamp",
  MarketArbitrationOccurred = "market__arbitrationOccurred",
  MarketArbitrator = "market__arbitrator",
  MarketCategory = "market__category",
  MarketCollateralToken = "market__collateralToken",
  MarketCollateralVolume = "market__collateralVolume",
  MarketCreationTimestamp = "market__creationTimestamp",
  MarketCreator = "market__creator",
  MarketCuratedByDxDao = "market__curatedByDxDao",
  MarketCuratedByDxDaoOrKleros = "market__curatedByDxDaoOrKleros",
  MarketCurrentAnswer = "market__currentAnswer",
  MarketCurrentAnswerBond = "market__currentAnswerBond",
  MarketCurrentAnswerTimestamp = "market__currentAnswerTimestamp",
  MarketData = "market__data",
  MarketFee = "market__fee",
  MarketId = "market__id",
  MarketIndexedOnQuestion = "market__indexedOnQuestion",
  MarketIsPendingArbitration = "market__isPendingArbitration",
  MarketKlerosTcRregistered = "market__klerosTCRregistered",
  MarketLanguage = "market__language",
  MarketLastActiveDay = "market__lastActiveDay",
  MarketLastActiveDayAndRunningDailyVolume = "market__lastActiveDayAndRunningDailyVolume",
  MarketLastActiveDayAndScaledRunningDailyVolume = "market__lastActiveDayAndScaledRunningDailyVolume",
  MarketLastActiveHour = "market__lastActiveHour",
  MarketLiquidityMeasure = "market__liquidityMeasure",
  MarketLiquidityParameter = "market__liquidityParameter",
  MarketOpeningTimestamp = "market__openingTimestamp",
  MarketOutcomeSlotCount = "market__outcomeSlotCount",
  MarketResolutionTimestamp = "market__resolutionTimestamp",
  MarketRunningDailyVolume = "market__runningDailyVolume",
  MarketScalarHigh = "market__scalarHigh",
  MarketScalarLow = "market__scalarLow",
  MarketScaledCollateralVolume = "market__scaledCollateralVolume",
  MarketScaledLiquidityMeasure = "market__scaledLiquidityMeasure",
  MarketScaledLiquidityParameter = "market__scaledLiquidityParameter",
  MarketScaledRunningDailyVolume = "market__scaledRunningDailyVolume",
  MarketSort24HourVolume0 = "market__sort24HourVolume0",
  MarketSort24HourVolume1 = "market__sort24HourVolume1",
  MarketSort24HourVolume2 = "market__sort24HourVolume2",
  MarketSort24HourVolume3 = "market__sort24HourVolume3",
  MarketSort24HourVolume4 = "market__sort24HourVolume4",
  MarketSort24HourVolume5 = "market__sort24HourVolume5",
  MarketSort24HourVolume6 = "market__sort24HourVolume6",
  MarketSort24HourVolume7 = "market__sort24HourVolume7",
  MarketSort24HourVolume8 = "market__sort24HourVolume8",
  MarketSort24HourVolume9 = "market__sort24HourVolume9",
  MarketSort24HourVolume10 = "market__sort24HourVolume10",
  MarketSort24HourVolume11 = "market__sort24HourVolume11",
  MarketSort24HourVolume12 = "market__sort24HourVolume12",
  MarketSort24HourVolume13 = "market__sort24HourVolume13",
  MarketSort24HourVolume14 = "market__sort24HourVolume14",
  MarketSort24HourVolume15 = "market__sort24HourVolume15",
  MarketSort24HourVolume16 = "market__sort24HourVolume16",
  MarketSort24HourVolume17 = "market__sort24HourVolume17",
  MarketSort24HourVolume18 = "market__sort24HourVolume18",
  MarketSort24HourVolume19 = "market__sort24HourVolume19",
  MarketSort24HourVolume20 = "market__sort24HourVolume20",
  MarketSort24HourVolume21 = "market__sort24HourVolume21",
  MarketSort24HourVolume22 = "market__sort24HourVolume22",
  MarketSort24HourVolume23 = "market__sort24HourVolume23",
  MarketTemplateId = "market__templateId",
  MarketTimeout = "market__timeout",
  MarketTitle = "market__title",
  MarketUsdLiquidityMeasure = "market__usdLiquidityMeasure",
  MarketUsdLiquidityParameter = "market__usdLiquidityParameter",
  MarketUsdRunningDailyVolume = "market__usdRunningDailyVolume",
  MarketUsdVolume = "market__usdVolume",
  Status = "status",
}

export enum LiquidityType {
  Add = "Add",
  Remove = "Remove",
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = "asc",
  Desc = "desc",
}

export type Provider = {
  __typename?: "Provider";
  addr: Scalars["Bytes"]["output"];
  id: Scalars["ID"]["output"];
  module: Scalars["Bytes"]["output"];
  taskCount: Scalars["BigInt"]["output"];
};

export type Provider_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  addr?: InputMaybe<Scalars["Bytes"]["input"]>;
  addr_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  addr_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  addr_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  addr_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  addr_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  addr_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  addr_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  addr_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  addr_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<Provider_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  module?: InputMaybe<Scalars["Bytes"]["input"]>;
  module_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  module_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  module_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  module_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  module_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  module_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  module_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  module_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  module_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Provider_Filter>>>;
  taskCount?: InputMaybe<Scalars["BigInt"]["input"]>;
  taskCount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  taskCount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  taskCount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  taskCount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  taskCount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  taskCount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  taskCount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum Provider_OrderBy {
  Addr = "addr",
  Id = "id",
  Module = "module",
  TaskCount = "taskCount",
}

export type Query = {
  __typename?: "Query";
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  action?: Maybe<Action>;
  actions: Array<Action>;
  answer?: Maybe<Answer>;
  answers: Array<Answer>;
  categories: Array<Category>;
  category?: Maybe<Category>;
  condition?: Maybe<Condition>;
  conditions: Array<Condition>;
  fixedProductMarketMaker?: Maybe<FixedProductMarketMaker>;
  fixedProductMarketMakers: Array<FixedProductMarketMaker>;
  fpmmLiquidities: Array<FpmmLiquidity>;
  fpmmLiquidity?: Maybe<FpmmLiquidity>;
  fpmmParticipation?: Maybe<FpmmParticipation>;
  fpmmParticipations: Array<FpmmParticipation>;
  fpmmPoolMembership?: Maybe<FpmmPoolMembership>;
  fpmmPoolMemberships: Array<FpmmPoolMembership>;
  fpmmTrade?: Maybe<FpmmTrade>;
  fpmmTrades: Array<FpmmTrade>;
  fpmmTransaction?: Maybe<FpmmTransaction>;
  fpmmTransactions: Array<FpmmTransaction>;
  gelatoUser?: Maybe<GelatoUser>;
  gelatoUsers: Array<GelatoUser>;
  global?: Maybe<Global>;
  globals: Array<Global>;
  klerosSubmission?: Maybe<KlerosSubmission>;
  klerosSubmissions: Array<KlerosSubmission>;
  marketSearch: Array<FixedProductMarketMaker>;
  provider?: Maybe<Provider>;
  providers: Array<Provider>;
  question?: Maybe<Question>;
  questions: Array<Question>;
  registeredToken?: Maybe<RegisteredToken>;
  registeredTokens: Array<RegisteredToken>;
  scalarQuestionLink?: Maybe<ScalarQuestionLink>;
  scalarQuestionLinks: Array<ScalarQuestionLink>;
  task?: Maybe<Task>;
  taskCondition?: Maybe<TaskCondition>;
  taskConditions: Array<TaskCondition>;
  taskCycle?: Maybe<TaskCycle>;
  taskCycles: Array<TaskCycle>;
  taskReceipt?: Maybe<TaskReceipt>;
  taskReceiptWrapper?: Maybe<TaskReceiptWrapper>;
  taskReceiptWrappers: Array<TaskReceiptWrapper>;
  taskReceipts: Array<TaskReceipt>;
  tasks: Array<Task>;
  token?: Maybe<Token>;
  tokenList?: Maybe<TokenList>;
  tokenLists: Array<TokenList>;
  tokens: Array<Token>;
  uniswapPair?: Maybe<UniswapPair>;
  uniswapPairs: Array<UniswapPair>;
};

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type QueryAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};

export type QueryActionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryActionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Action_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Action_Filter>;
};

export type QueryAnswerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAnswersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Answer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Answer_Filter>;
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

export type QueryFixedProductMarketMakerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryFixedProductMarketMakersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<FixedProductMarketMaker_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FixedProductMarketMaker_Filter>;
};

export type QueryFpmmLiquiditiesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<FpmmLiquidity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FpmmLiquidity_Filter>;
};

export type QueryFpmmLiquidityArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryFpmmParticipationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryFpmmParticipationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<FpmmParticipation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FpmmParticipation_Filter>;
};

export type QueryFpmmPoolMembershipArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryFpmmPoolMembershipsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<FpmmPoolMembership_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FpmmPoolMembership_Filter>;
};

export type QueryFpmmTradeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryFpmmTradesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<FpmmTrade_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FpmmTrade_Filter>;
};

export type QueryFpmmTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryFpmmTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<FpmmTransaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FpmmTransaction_Filter>;
};

export type QueryGelatoUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryGelatoUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<GelatoUser_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<GelatoUser_Filter>;
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

export type QueryKlerosSubmissionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryKlerosSubmissionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<KlerosSubmission_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<KlerosSubmission_Filter>;
};

export type QueryMarketSearchArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  text: Scalars["String"]["input"];
  where?: InputMaybe<FixedProductMarketMaker_Filter>;
};

export type QueryProviderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryProvidersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Provider_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Provider_Filter>;
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

export type QueryRegisteredTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryRegisteredTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<RegisteredToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RegisteredToken_Filter>;
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

export type QueryTaskArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTaskConditionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTaskConditionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TaskCondition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TaskCondition_Filter>;
};

export type QueryTaskCycleArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTaskCyclesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TaskCycle_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TaskCycle_Filter>;
};

export type QueryTaskReceiptArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTaskReceiptWrapperArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTaskReceiptWrappersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TaskReceiptWrapper_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TaskReceiptWrapper_Filter>;
};

export type QueryTaskReceiptsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TaskReceipt_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TaskReceipt_Filter>;
};

export type QueryTasksArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Task_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Task_Filter>;
};

export type QueryTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTokenListArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTokenListsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TokenList_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenList_Filter>;
};

export type QueryTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};

export type QueryUniswapPairArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryUniswapPairsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<UniswapPair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UniswapPair_Filter>;
};

export type Question = {
  __typename?: "Question";
  answerFinalizedTimestamp?: Maybe<Scalars["BigInt"]["output"]>;
  answers?: Maybe<Array<Answer>>;
  arbitrationOccurred: Scalars["Boolean"]["output"];
  arbitrator: Scalars["Bytes"]["output"];
  category?: Maybe<Scalars["String"]["output"]>;
  conditions: Array<Condition>;
  currentAnswer?: Maybe<Scalars["Bytes"]["output"]>;
  currentAnswerBond?: Maybe<Scalars["BigInt"]["output"]>;
  currentAnswerTimestamp?: Maybe<Scalars["BigInt"]["output"]>;
  data: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  indexedFixedProductMarketMakers: Array<FixedProductMarketMaker>;
  isPendingArbitration: Scalars["Boolean"]["output"];
  language?: Maybe<Scalars["String"]["output"]>;
  openingTimestamp: Scalars["BigInt"]["output"];
  outcomes?: Maybe<Array<Scalars["String"]["output"]>>;
  templateId: Scalars["BigInt"]["output"];
  timeout: Scalars["BigInt"]["output"];
  title?: Maybe<Scalars["String"]["output"]>;
};

export type QuestionAnswersArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Answer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Answer_Filter>;
};

export type QuestionConditionsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Condition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Condition_Filter>;
};

export type QuestionIndexedFixedProductMarketMakersArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<FixedProductMarketMaker_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<FixedProductMarketMaker_Filter>;
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
  answers_?: InputMaybe<Answer_Filter>;
  arbitrationOccurred?: InputMaybe<Scalars["Boolean"]["input"]>;
  arbitrationOccurred_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  arbitrationOccurred_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  arbitrationOccurred_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  arbitrator?: InputMaybe<Scalars["Bytes"]["input"]>;
  arbitrator_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  arbitrator_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  arbitrator_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  arbitrator_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  arbitrator_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  arbitrator_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  arbitrator_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  arbitrator_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  arbitrator_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
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
  indexedFixedProductMarketMakers?: InputMaybe<
    Array<Scalars["String"]["input"]>
  >;
  indexedFixedProductMarketMakers_?: InputMaybe<FixedProductMarketMaker_Filter>;
  indexedFixedProductMarketMakers_contains?: InputMaybe<
    Array<Scalars["String"]["input"]>
  >;
  indexedFixedProductMarketMakers_contains_nocase?: InputMaybe<
    Array<Scalars["String"]["input"]>
  >;
  indexedFixedProductMarketMakers_not?: InputMaybe<
    Array<Scalars["String"]["input"]>
  >;
  indexedFixedProductMarketMakers_not_contains?: InputMaybe<
    Array<Scalars["String"]["input"]>
  >;
  indexedFixedProductMarketMakers_not_contains_nocase?: InputMaybe<
    Array<Scalars["String"]["input"]>
  >;
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
  Answers = "answers",
  ArbitrationOccurred = "arbitrationOccurred",
  Arbitrator = "arbitrator",
  Category = "category",
  Conditions = "conditions",
  CurrentAnswer = "currentAnswer",
  CurrentAnswerBond = "currentAnswerBond",
  CurrentAnswerTimestamp = "currentAnswerTimestamp",
  Data = "data",
  Id = "id",
  IndexedFixedProductMarketMakers = "indexedFixedProductMarketMakers",
  IsPendingArbitration = "isPendingArbitration",
  Language = "language",
  OpeningTimestamp = "openingTimestamp",
  Outcomes = "outcomes",
  TemplateId = "templateId",
  Timeout = "timeout",
  Title = "title",
}

export type RegisteredToken = {
  __typename?: "RegisteredToken";
  address: Scalars["Bytes"]["output"];
  decimals: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  symbol: Scalars["String"]["output"];
};

export type RegisteredToken_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  address_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<RegisteredToken_Filter>>>;
  decimals?: InputMaybe<Scalars["Int"]["input"]>;
  decimals_gt?: InputMaybe<Scalars["Int"]["input"]>;
  decimals_gte?: InputMaybe<Scalars["Int"]["input"]>;
  decimals_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  decimals_lt?: InputMaybe<Scalars["Int"]["input"]>;
  decimals_lte?: InputMaybe<Scalars["Int"]["input"]>;
  decimals_not?: InputMaybe<Scalars["Int"]["input"]>;
  decimals_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  name_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  name_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_gt?: InputMaybe<Scalars["String"]["input"]>;
  name_gte?: InputMaybe<Scalars["String"]["input"]>;
  name_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_lt?: InputMaybe<Scalars["String"]["input"]>;
  name_lte?: InputMaybe<Scalars["String"]["input"]>;
  name_not?: InputMaybe<Scalars["String"]["input"]>;
  name_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  name_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  name_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  name_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<RegisteredToken_Filter>>>;
  symbol?: InputMaybe<Scalars["String"]["input"]>;
  symbol_contains?: InputMaybe<Scalars["String"]["input"]>;
  symbol_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  symbol_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  symbol_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  symbol_gt?: InputMaybe<Scalars["String"]["input"]>;
  symbol_gte?: InputMaybe<Scalars["String"]["input"]>;
  symbol_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  symbol_lt?: InputMaybe<Scalars["String"]["input"]>;
  symbol_lte?: InputMaybe<Scalars["String"]["input"]>;
  symbol_not?: InputMaybe<Scalars["String"]["input"]>;
  symbol_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  symbol_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  symbol_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  symbol_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  symbol_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  symbol_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  symbol_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum RegisteredToken_OrderBy {
  Address = "address",
  Decimals = "decimals",
  Id = "id",
  Name = "name",
  Symbol = "symbol",
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
  account?: Maybe<Account>;
  accounts: Array<Account>;
  action?: Maybe<Action>;
  actions: Array<Action>;
  answer?: Maybe<Answer>;
  answers: Array<Answer>;
  categories: Array<Category>;
  category?: Maybe<Category>;
  condition?: Maybe<Condition>;
  conditions: Array<Condition>;
  fixedProductMarketMaker?: Maybe<FixedProductMarketMaker>;
  fixedProductMarketMakers: Array<FixedProductMarketMaker>;
  fpmmLiquidities: Array<FpmmLiquidity>;
  fpmmLiquidity?: Maybe<FpmmLiquidity>;
  fpmmParticipation?: Maybe<FpmmParticipation>;
  fpmmParticipations: Array<FpmmParticipation>;
  fpmmPoolMembership?: Maybe<FpmmPoolMembership>;
  fpmmPoolMemberships: Array<FpmmPoolMembership>;
  fpmmTrade?: Maybe<FpmmTrade>;
  fpmmTrades: Array<FpmmTrade>;
  fpmmTransaction?: Maybe<FpmmTransaction>;
  fpmmTransactions: Array<FpmmTransaction>;
  gelatoUser?: Maybe<GelatoUser>;
  gelatoUsers: Array<GelatoUser>;
  global?: Maybe<Global>;
  globals: Array<Global>;
  klerosSubmission?: Maybe<KlerosSubmission>;
  klerosSubmissions: Array<KlerosSubmission>;
  provider?: Maybe<Provider>;
  providers: Array<Provider>;
  question?: Maybe<Question>;
  questions: Array<Question>;
  registeredToken?: Maybe<RegisteredToken>;
  registeredTokens: Array<RegisteredToken>;
  scalarQuestionLink?: Maybe<ScalarQuestionLink>;
  scalarQuestionLinks: Array<ScalarQuestionLink>;
  task?: Maybe<Task>;
  taskCondition?: Maybe<TaskCondition>;
  taskConditions: Array<TaskCondition>;
  taskCycle?: Maybe<TaskCycle>;
  taskCycles: Array<TaskCycle>;
  taskReceipt?: Maybe<TaskReceipt>;
  taskReceiptWrapper?: Maybe<TaskReceiptWrapper>;
  taskReceiptWrappers: Array<TaskReceiptWrapper>;
  taskReceipts: Array<TaskReceipt>;
  tasks: Array<Task>;
  token?: Maybe<Token>;
  tokenList?: Maybe<TokenList>;
  tokenLists: Array<TokenList>;
  tokens: Array<Token>;
  uniswapPair?: Maybe<UniswapPair>;
  uniswapPairs: Array<UniswapPair>;
};

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type SubscriptionAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};

export type SubscriptionActionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionActionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Action_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Action_Filter>;
};

export type SubscriptionAnswerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionAnswersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Answer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Answer_Filter>;
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

export type SubscriptionFixedProductMarketMakerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionFixedProductMarketMakersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<FixedProductMarketMaker_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FixedProductMarketMaker_Filter>;
};

export type SubscriptionFpmmLiquiditiesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<FpmmLiquidity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FpmmLiquidity_Filter>;
};

export type SubscriptionFpmmLiquidityArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionFpmmParticipationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionFpmmParticipationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<FpmmParticipation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FpmmParticipation_Filter>;
};

export type SubscriptionFpmmPoolMembershipArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionFpmmPoolMembershipsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<FpmmPoolMembership_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FpmmPoolMembership_Filter>;
};

export type SubscriptionFpmmTradeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionFpmmTradesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<FpmmTrade_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FpmmTrade_Filter>;
};

export type SubscriptionFpmmTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionFpmmTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<FpmmTransaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FpmmTransaction_Filter>;
};

export type SubscriptionGelatoUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionGelatoUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<GelatoUser_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<GelatoUser_Filter>;
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

export type SubscriptionKlerosSubmissionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionKlerosSubmissionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<KlerosSubmission_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<KlerosSubmission_Filter>;
};

export type SubscriptionProviderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionProvidersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Provider_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Provider_Filter>;
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

export type SubscriptionRegisteredTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionRegisteredTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<RegisteredToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RegisteredToken_Filter>;
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

export type SubscriptionTaskArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTaskConditionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTaskConditionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TaskCondition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TaskCondition_Filter>;
};

export type SubscriptionTaskCycleArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTaskCyclesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TaskCycle_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TaskCycle_Filter>;
};

export type SubscriptionTaskReceiptArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTaskReceiptWrapperArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTaskReceiptWrappersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TaskReceiptWrapper_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TaskReceiptWrapper_Filter>;
};

export type SubscriptionTaskReceiptsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TaskReceipt_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TaskReceipt_Filter>;
};

export type SubscriptionTasksArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Task_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Task_Filter>;
};

export type SubscriptionTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTokenListArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTokenListsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TokenList_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenList_Filter>;
};

export type SubscriptionTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};

export type SubscriptionUniswapPairArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionUniswapPairsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<UniswapPair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UniswapPair_Filter>;
};

export type Task = {
  __typename?: "Task";
  actions?: Maybe<Array<Action>>;
  conditions?: Maybe<Array<TaskCondition>>;
  id: Scalars["ID"]["output"];
  selfProviderGasLimit: Scalars["BigInt"]["output"];
  selfProviderGasPriceCeil: Scalars["BigInt"]["output"];
};

export type TaskActionsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Action_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Action_Filter>;
};

export type TaskConditionsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TaskCondition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<TaskCondition_Filter>;
};

export type TaskCondition = {
  __typename?: "TaskCondition";
  data: Scalars["Bytes"]["output"];
  id: Scalars["ID"]["output"];
  inst: Scalars["Bytes"]["output"];
};

export type TaskCondition_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TaskCondition_Filter>>>;
  data?: InputMaybe<Scalars["Bytes"]["input"]>;
  data_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  data_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  data_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  data_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  data_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  data_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  data_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  data_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  data_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  inst?: InputMaybe<Scalars["Bytes"]["input"]>;
  inst_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  inst_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  inst_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  inst_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  inst_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  inst_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  inst_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  inst_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  inst_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<TaskCondition_Filter>>>;
};

export enum TaskCondition_OrderBy {
  Data = "data",
  Id = "id",
  Inst = "inst",
}

export type TaskCycle = {
  __typename?: "TaskCycle";
  id: Scalars["ID"]["output"];
  taskReceiptWrappers: Array<TaskReceiptWrapper>;
};

export type TaskCycleTaskReceiptWrappersArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TaskReceiptWrapper_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<TaskReceiptWrapper_Filter>;
};

export type TaskCycle_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TaskCycle_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<TaskCycle_Filter>>>;
  taskReceiptWrappers?: InputMaybe<Array<Scalars["String"]["input"]>>;
  taskReceiptWrappers_?: InputMaybe<TaskReceiptWrapper_Filter>;
  taskReceiptWrappers_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  taskReceiptWrappers_contains_nocase?: InputMaybe<
    Array<Scalars["String"]["input"]>
  >;
  taskReceiptWrappers_not?: InputMaybe<Array<Scalars["String"]["input"]>>;
  taskReceiptWrappers_not_contains?: InputMaybe<
    Array<Scalars["String"]["input"]>
  >;
  taskReceiptWrappers_not_contains_nocase?: InputMaybe<
    Array<Scalars["String"]["input"]>
  >;
};

export enum TaskCycle_OrderBy {
  Id = "id",
  TaskReceiptWrappers = "taskReceiptWrappers",
}

export type TaskReceipt = {
  __typename?: "TaskReceipt";
  cycleId: Scalars["BigInt"]["output"];
  expiryDate: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  index: Scalars["BigInt"]["output"];
  provider: Provider;
  submissionsLeft: Scalars["BigInt"]["output"];
  tasks?: Maybe<Array<Task>>;
  userProxy: Scalars["Bytes"]["output"];
};

export type TaskReceiptTasksArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Task_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Task_Filter>;
};

export enum TaskReceiptStatus {
  AwaitingExec = "awaitingExec",
  Canceled = "canceled",
  ExecReverted = "execReverted",
  ExecSuccess = "execSuccess",
  Expired = "expired",
}

export type TaskReceiptWrapper = {
  __typename?: "TaskReceiptWrapper";
  executionDate?: Maybe<Scalars["BigInt"]["output"]>;
  executionHash?: Maybe<Scalars["Bytes"]["output"]>;
  id: Scalars["ID"]["output"];
  selectedExecutor: Scalars["Bytes"]["output"];
  selfProvided: Scalars["Boolean"]["output"];
  status: TaskReceiptStatus;
  submissionDate: Scalars["BigInt"]["output"];
  submissionHash: Scalars["Bytes"]["output"];
  taskReceipt: TaskReceipt;
  user: GelatoUser;
};

export type TaskReceiptWrapper_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TaskReceiptWrapper_Filter>>>;
  executionDate?: InputMaybe<Scalars["BigInt"]["input"]>;
  executionDate_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  executionDate_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  executionDate_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  executionDate_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  executionDate_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  executionDate_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  executionDate_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  executionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  executionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  executionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  executionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  executionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  executionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  executionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  executionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  executionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  executionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<TaskReceiptWrapper_Filter>>>;
  selectedExecutor?: InputMaybe<Scalars["Bytes"]["input"]>;
  selectedExecutor_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  selectedExecutor_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  selectedExecutor_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  selectedExecutor_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  selectedExecutor_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  selectedExecutor_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  selectedExecutor_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  selectedExecutor_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  selectedExecutor_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  selfProvided?: InputMaybe<Scalars["Boolean"]["input"]>;
  selfProvided_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  selfProvided_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  selfProvided_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  status?: InputMaybe<TaskReceiptStatus>;
  status_in?: InputMaybe<Array<TaskReceiptStatus>>;
  status_not?: InputMaybe<TaskReceiptStatus>;
  status_not_in?: InputMaybe<Array<TaskReceiptStatus>>;
  submissionDate?: InputMaybe<Scalars["BigInt"]["input"]>;
  submissionDate_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  submissionDate_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  submissionDate_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  submissionDate_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  submissionDate_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  submissionDate_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  submissionDate_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  submissionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  submissionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  submissionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  submissionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  submissionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  submissionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  submissionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  submissionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  submissionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  submissionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  taskReceipt?: InputMaybe<Scalars["String"]["input"]>;
  taskReceipt_?: InputMaybe<TaskReceipt_Filter>;
  taskReceipt_contains?: InputMaybe<Scalars["String"]["input"]>;
  taskReceipt_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  taskReceipt_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  taskReceipt_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  taskReceipt_gt?: InputMaybe<Scalars["String"]["input"]>;
  taskReceipt_gte?: InputMaybe<Scalars["String"]["input"]>;
  taskReceipt_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  taskReceipt_lt?: InputMaybe<Scalars["String"]["input"]>;
  taskReceipt_lte?: InputMaybe<Scalars["String"]["input"]>;
  taskReceipt_not?: InputMaybe<Scalars["String"]["input"]>;
  taskReceipt_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  taskReceipt_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  taskReceipt_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  taskReceipt_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  taskReceipt_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  taskReceipt_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  taskReceipt_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  taskReceipt_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  taskReceipt_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  user?: InputMaybe<Scalars["String"]["input"]>;
  user_?: InputMaybe<GelatoUser_Filter>;
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
};

export enum TaskReceiptWrapper_OrderBy {
  ExecutionDate = "executionDate",
  ExecutionHash = "executionHash",
  Id = "id",
  SelectedExecutor = "selectedExecutor",
  SelfProvided = "selfProvided",
  Status = "status",
  SubmissionDate = "submissionDate",
  SubmissionHash = "submissionHash",
  TaskReceipt = "taskReceipt",
  TaskReceiptCycleId = "taskReceipt__cycleId",
  TaskReceiptExpiryDate = "taskReceipt__expiryDate",
  TaskReceiptId = "taskReceipt__id",
  TaskReceiptIndex = "taskReceipt__index",
  TaskReceiptSubmissionsLeft = "taskReceipt__submissionsLeft",
  TaskReceiptUserProxy = "taskReceipt__userProxy",
  User = "user",
  UserAddress = "user__address",
  UserExecutor = "user__executor",
  UserId = "user__id",
  UserSignUpDate = "user__signUpDate",
}

export type TaskReceipt_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TaskReceipt_Filter>>>;
  cycleId?: InputMaybe<Scalars["BigInt"]["input"]>;
  cycleId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  cycleId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  cycleId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  cycleId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  cycleId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  cycleId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  cycleId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  expiryDate?: InputMaybe<Scalars["BigInt"]["input"]>;
  expiryDate_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  expiryDate_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  expiryDate_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  expiryDate_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  expiryDate_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  expiryDate_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  expiryDate_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  index?: InputMaybe<Scalars["BigInt"]["input"]>;
  index_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  index_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  index_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  index_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  index_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  index_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  index_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<TaskReceipt_Filter>>>;
  provider?: InputMaybe<Scalars["String"]["input"]>;
  provider_?: InputMaybe<Provider_Filter>;
  provider_contains?: InputMaybe<Scalars["String"]["input"]>;
  provider_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  provider_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  provider_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  provider_gt?: InputMaybe<Scalars["String"]["input"]>;
  provider_gte?: InputMaybe<Scalars["String"]["input"]>;
  provider_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  provider_lt?: InputMaybe<Scalars["String"]["input"]>;
  provider_lte?: InputMaybe<Scalars["String"]["input"]>;
  provider_not?: InputMaybe<Scalars["String"]["input"]>;
  provider_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  provider_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  provider_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  provider_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  provider_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  provider_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  provider_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  provider_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  provider_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  submissionsLeft?: InputMaybe<Scalars["BigInt"]["input"]>;
  submissionsLeft_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  submissionsLeft_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  submissionsLeft_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  submissionsLeft_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  submissionsLeft_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  submissionsLeft_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  submissionsLeft_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tasks?: InputMaybe<Array<Scalars["String"]["input"]>>;
  tasks_?: InputMaybe<Task_Filter>;
  tasks_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  tasks_contains_nocase?: InputMaybe<Array<Scalars["String"]["input"]>>;
  tasks_not?: InputMaybe<Array<Scalars["String"]["input"]>>;
  tasks_not_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  tasks_not_contains_nocase?: InputMaybe<Array<Scalars["String"]["input"]>>;
  userProxy?: InputMaybe<Scalars["Bytes"]["input"]>;
  userProxy_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  userProxy_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  userProxy_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  userProxy_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  userProxy_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  userProxy_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  userProxy_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  userProxy_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  userProxy_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum TaskReceipt_OrderBy {
  CycleId = "cycleId",
  ExpiryDate = "expiryDate",
  Id = "id",
  Index = "index",
  Provider = "provider",
  ProviderAddr = "provider__addr",
  ProviderId = "provider__id",
  ProviderModule = "provider__module",
  ProviderTaskCount = "provider__taskCount",
  SubmissionsLeft = "submissionsLeft",
  Tasks = "tasks",
  UserProxy = "userProxy",
}

export type Task_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  actions?: InputMaybe<Array<Scalars["String"]["input"]>>;
  actions_?: InputMaybe<Action_Filter>;
  actions_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  actions_contains_nocase?: InputMaybe<Array<Scalars["String"]["input"]>>;
  actions_not?: InputMaybe<Array<Scalars["String"]["input"]>>;
  actions_not_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  actions_not_contains_nocase?: InputMaybe<Array<Scalars["String"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<Task_Filter>>>;
  conditions?: InputMaybe<Array<Scalars["String"]["input"]>>;
  conditions_?: InputMaybe<TaskCondition_Filter>;
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
  or?: InputMaybe<Array<InputMaybe<Task_Filter>>>;
  selfProviderGasLimit?: InputMaybe<Scalars["BigInt"]["input"]>;
  selfProviderGasLimit_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  selfProviderGasLimit_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  selfProviderGasLimit_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  selfProviderGasLimit_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  selfProviderGasLimit_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  selfProviderGasLimit_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  selfProviderGasLimit_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  selfProviderGasPriceCeil?: InputMaybe<Scalars["BigInt"]["input"]>;
  selfProviderGasPriceCeil_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  selfProviderGasPriceCeil_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  selfProviderGasPriceCeil_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  selfProviderGasPriceCeil_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  selfProviderGasPriceCeil_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  selfProviderGasPriceCeil_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  selfProviderGasPriceCeil_not_in?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
};

export enum Task_OrderBy {
  Actions = "actions",
  Conditions = "conditions",
  Id = "id",
  SelfProviderGasLimit = "selfProviderGasLimit",
  SelfProviderGasPriceCeil = "selfProviderGasPriceCeil",
}

export type Token = {
  __typename?: "Token";
  ethPerToken?: Maybe<Scalars["BigDecimal"]["output"]>;
  id: Scalars["ID"]["output"];
  scale: Scalars["BigInt"]["output"];
};

export type TokenList = {
  __typename?: "TokenList";
  activeTokenCount: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  listId: Scalars["BigInt"]["output"];
  listName: Scalars["String"]["output"];
  tokens?: Maybe<Array<RegisteredToken>>;
};

export type TokenListTokensArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<RegisteredToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<RegisteredToken_Filter>;
};

export type TokenList_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  activeTokenCount?: InputMaybe<Scalars["BigInt"]["input"]>;
  activeTokenCount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  activeTokenCount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  activeTokenCount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  activeTokenCount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  activeTokenCount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  activeTokenCount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  activeTokenCount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<TokenList_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  listId?: InputMaybe<Scalars["BigInt"]["input"]>;
  listId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  listId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  listId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  listId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  listId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  listId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  listId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  listName?: InputMaybe<Scalars["String"]["input"]>;
  listName_contains?: InputMaybe<Scalars["String"]["input"]>;
  listName_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  listName_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  listName_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  listName_gt?: InputMaybe<Scalars["String"]["input"]>;
  listName_gte?: InputMaybe<Scalars["String"]["input"]>;
  listName_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  listName_lt?: InputMaybe<Scalars["String"]["input"]>;
  listName_lte?: InputMaybe<Scalars["String"]["input"]>;
  listName_not?: InputMaybe<Scalars["String"]["input"]>;
  listName_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  listName_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  listName_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  listName_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  listName_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  listName_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  listName_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  listName_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  listName_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<TokenList_Filter>>>;
  tokens?: InputMaybe<Array<Scalars["String"]["input"]>>;
  tokens_?: InputMaybe<RegisteredToken_Filter>;
  tokens_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  tokens_contains_nocase?: InputMaybe<Array<Scalars["String"]["input"]>>;
  tokens_not?: InputMaybe<Array<Scalars["String"]["input"]>>;
  tokens_not_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  tokens_not_contains_nocase?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export enum TokenList_OrderBy {
  ActiveTokenCount = "activeTokenCount",
  Id = "id",
  ListId = "listId",
  ListName = "listName",
  Tokens = "tokens",
}

export type Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
  ethPerToken?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  ethPerToken_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  ethPerToken_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  ethPerToken_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  ethPerToken_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  ethPerToken_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  ethPerToken_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  ethPerToken_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
  scale?: InputMaybe<Scalars["BigInt"]["input"]>;
  scale_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  scale_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  scale_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  scale_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  scale_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  scale_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  scale_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum Token_OrderBy {
  EthPerToken = "ethPerToken",
  Id = "id",
  Scale = "scale",
}

export enum TradeType {
  Buy = "Buy",
  Sell = "Sell",
}

export enum TransactionType {
  Add = "Add",
  Buy = "Buy",
  Remove = "Remove",
  Sell = "Sell",
}

export type UniswapPair = {
  __typename?: "UniswapPair";
  id: Scalars["ID"]["output"];
  reserve0: Scalars["BigInt"]["output"];
  reserve1: Scalars["BigInt"]["output"];
  token0: Token;
  token1: Token;
};

export type UniswapPair_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UniswapPair_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<UniswapPair_Filter>>>;
  reserve0?: InputMaybe<Scalars["BigInt"]["input"]>;
  reserve0_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  reserve0_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  reserve0_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  reserve0_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  reserve0_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  reserve0_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  reserve0_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  reserve1?: InputMaybe<Scalars["BigInt"]["input"]>;
  reserve1_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  reserve1_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  reserve1_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  reserve1_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  reserve1_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  reserve1_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  reserve1_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  token0?: InputMaybe<Scalars["String"]["input"]>;
  token0_?: InputMaybe<Token_Filter>;
  token0_contains?: InputMaybe<Scalars["String"]["input"]>;
  token0_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token0_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_gt?: InputMaybe<Scalars["String"]["input"]>;
  token0_gte?: InputMaybe<Scalars["String"]["input"]>;
  token0_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token0_lt?: InputMaybe<Scalars["String"]["input"]>;
  token0_lte?: InputMaybe<Scalars["String"]["input"]>;
  token0_not?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token0_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token0_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1?: InputMaybe<Scalars["String"]["input"]>;
  token1_?: InputMaybe<Token_Filter>;
  token1_contains?: InputMaybe<Scalars["String"]["input"]>;
  token1_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token1_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_gt?: InputMaybe<Scalars["String"]["input"]>;
  token1_gte?: InputMaybe<Scalars["String"]["input"]>;
  token1_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token1_lt?: InputMaybe<Scalars["String"]["input"]>;
  token1_lte?: InputMaybe<Scalars["String"]["input"]>;
  token1_not?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token1_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token1_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum UniswapPair_OrderBy {
  Id = "id",
  Reserve0 = "reserve0",
  Reserve1 = "reserve1",
  Token0 = "token0",
  Token0EthPerToken = "token0__ethPerToken",
  Token0Id = "token0__id",
  Token0Scale = "token0__scale",
  Token1 = "token1",
  Token1EthPerToken = "token1__ethPerToken",
  Token1Id = "token1__id",
  Token1Scale = "token1__scale",
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
