import { LatestResultArgs, ParameterType, RunQueryArgs } from '@duneanalytics/client-sdk';
import { Address } from 'viem';
import { duneClient } from '@/utils';
import { Categories, DUNE_API_KEY } from '@/constants';

const DUNE_OPEN_MARKETS_INFO_QUERY_ID = 3781367;
const DUNE_AGENTS_LEADERBOARD_QUERY_ID = 4537160;
const DUNE_AGENTS_TOTALS_QUERY_ID = 4537552;

const marketCategories = Object.values(Categories).join(',');

export const getAIAgents = async () => {
  const DUNE_AGENTS_INFO_QUERY_ID = 3582994;

  const options: LatestResultArgs = {
    queryId: DUNE_AGENTS_INFO_QUERY_ID,
    parameters: [{ type: ParameterType.NUMBER, value: '1', name: 'limit' }],
  };

  const duneResult = await duneClient.getLatestResult(options);

  return duneResult.result?.rows;
};

export const getOpenMarkets = async () => {
  const options: RunQueryArgs = {
    queryId: DUNE_OPEN_MARKETS_INFO_QUERY_ID,
    filters: `category in (${marketCategories})`,
    columns: ['category'],
    sort_by: 'category asc',
  };

  const duneResult = await duneClient.getLatestResult(options);

  return duneResult.result?.rows;
};

type AgentsLeaderboard = {
  address: Address;
  label: string;
  total_volume: number;
  profit_loss: number;
  success_rate: number;
  total_wins: number;
  total_bets: number;
};

export const getAgentsLeaderboardData = async ({
  page = 1,
  pageSize = 50,
  sort_by = 'profit_loss desc',
}) => {
  const limit = pageSize;
  const offset = (page - 1) * pageSize;
  const url = `https://api.dune.com/api/v1/query/${DUNE_AGENTS_LEADERBOARD_QUERY_ID}/results?limit=${limit}&offset=${offset}&sort_by=${sort_by}`;

  const headers = {
    'X-Dune-API-Key': DUNE_API_KEY,
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return {
      data: data.result?.rows as AgentsLeaderboard[],
      totalRows: data.result?.metadata?.total_row_count ?? 0,
    };
  } catch (error) {
    console.error('Failed to fetch Dune results:', error);
    return null;
  }
};

type AgentsLeaderboardTotals = {
  total_bets: number;
  total_wins: number;
  total_profit_loss: number;
  avg_success_rate: number;
  total_volume: number;
};

export const getAgentsTotalsData = async () => {
  const options: RunQueryArgs = {
    queryId: DUNE_AGENTS_TOTALS_QUERY_ID,
  };

  const duneResult = await duneClient.getLatestResult(options);

  const firstRow = duneResult.result?.rows?.[0];

  return firstRow ? (firstRow as AgentsLeaderboardTotals) : null;
};
