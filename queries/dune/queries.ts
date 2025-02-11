import { LatestResultArgs, ParameterType, RunQueryArgs } from '@duneanalytics/client-sdk';
import { Address } from 'viem';
import { duneClient } from '@/utils';
import { Categories, DUNE_API_KEY } from '@/constants';
import { AiAgent } from '@/types';

const marketCategories = Object.values(Categories).join(',');

export const getAIAgents = async () => {
  const DUNE_AGENTS_INFO_QUERY_ID = 3582994;

  const options: LatestResultArgs = {
    queryId: DUNE_AGENTS_INFO_QUERY_ID,
    parameters: [{ type: ParameterType.NUMBER, value: '1', name: 'limit' }],
  };

  const duneResult = await duneClient.getLatestResult(options);

  return duneResult.result?.rows as AiAgent[];
};

export const getOpenMarkets = async () => {
  const DUNE_OPEN_MARKETS_INFO_QUERY_ID = 3781367;

  const options: RunQueryArgs = {
    queryId: DUNE_OPEN_MARKETS_INFO_QUERY_ID,
    filters: `category in (${marketCategories})`,
    columns: ['category'],
    sort_by: 'category asc',
  };

  const duneResult = await duneClient.getLatestResult(options);

  return duneResult.result?.rows;
};

type TotalsTradeMetrics = {
  total_positions: number;
  total_returns: number;
  total_wins: number;
  total_volume: number;
  avg_success_rate: number;
  total_profit_loss: number;
};

export const getAgentsTotalsTradeMetricsData = async () => {
  const DUNE_AGENTS_TOTALS_QUERY_ID = 4537552;

  const options: RunQueryArgs = {
    queryId: DUNE_AGENTS_TOTALS_QUERY_ID,
  };

  const duneResult = await duneClient.getLatestResult(options);

  const firstRow = duneResult.result?.rows?.[0];

  return firstRow ? (firstRow as TotalsTradeMetrics) : null;
};

interface DuneUrlParams {
  queryId: number;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  filters?: string;
  baseUrl?: string;
}

const DUNE_API_BASE_URL = 'https://api.dune.com/api/v1';

export const setupDuneQueryUrl = ({
  queryId,
  page = 1,
  pageSize = 50,
  sortBy = 'profit_loss desc',
  filters = '',
  baseUrl = DUNE_API_BASE_URL,
}: DuneUrlParams): string => {
  const limit = pageSize;
  const offset = (page - 1) * pageSize;

  const encodedFilters = filters ? `&filters=${encodeURIComponent(filters)}` : '';
  const encodedSortBy = encodeURIComponent(sortBy);

  return `${baseUrl}/query/${queryId}/results?limit=${limit}&offset=${offset}&sort_by=${encodedSortBy}${encodedFilters}`;
};

interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  filters?: string;
}

interface DuneQueryResult<T> {
  data: T[];
  totalRows: number;
}

export const fetchDuneQueryResults = async <T>({
  queryId,
  page = 1,
  pageSize = 50,
  sortBy = 'profit_loss desc',
  filters = '',
}: PaginationParams & { queryId: number }): Promise<DuneQueryResult<T> | null> => {
  const url = setupDuneQueryUrl({
    queryId,
    page,
    pageSize,
    sortBy,
    filters,
  });

  try {
    const response = await fetch(url, {
      headers: { 'X-Dune-API-Key': DUNE_API_KEY },
    });

    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

    const data = await response.json();

    return {
      data: data.result?.rows as T[],
      totalRows: data.result?.metadata?.total_row_count ?? 0,
    };
  } catch (error) {
    console.error(`Failed to fetch results from Dune query ${queryId}`, error);
    return null;
  }
};

type TradeMetrics = {
  address: Address;
  label: string;
  profit_loss: number;
  total_returns: number;
  total_volume: number;
  success_rate: number;
  total_wins: number;
  total_positions: number;
};

export const getAgentsTradeMetricsData = async ({
  page = 1,
  pageSize = 50,
  sort_by = 'profit_loss desc',
  filters = '',
}) => {
  const DUNE_AGENTS_LEADERBOARD_QUERY_ID = 4565681;

  return fetchDuneQueryResults<TradeMetrics>({
    queryId: DUNE_AGENTS_LEADERBOARD_QUERY_ID,
    page,
    pageSize,
    sortBy: sort_by,
    filters,
  });
};

export const getOmenTradeMetrics = async ({
  page = 1,
  pageSize = 50,
  sort_by = 'profit_loss desc',
  filters = '',
}) => {
  const DUNE_OMEN_TRADE_METRICS = 4576765;

  return fetchDuneQueryResults<TradeMetrics>({
    queryId: DUNE_OMEN_TRADE_METRICS,
    page,
    pageSize,
    sortBy: sort_by,
    filters,
  });
};
