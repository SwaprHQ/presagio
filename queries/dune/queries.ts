import { LatestResultArgs, ParameterType, RunQueryArgs } from '@duneanalytics/client-sdk';
import { duneClient } from '@/utils';
import { Categories } from '@/constants';

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

export const getAgentsLeaderboardData = async () => {
  const options: RunQueryArgs = {
    queryId: DUNE_AGENTS_LEADERBOARD_QUERY_ID,
  };

  const duneResult = await duneClient.getLatestResult(options);

  return duneResult.result?.rows;
};

export const getAgentsTotalsData = async () => {
  const options: RunQueryArgs = {
    queryId: DUNE_AGENTS_TOTALS_QUERY_ID,
  };

  const duneResult = await duneClient.getLatestResult(options);

  return duneResult.result?.rows;
};
