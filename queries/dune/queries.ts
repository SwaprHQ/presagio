import { LatestResultArgs, ParameterType, RunQueryArgs } from '@duneanalytics/client-sdk';
import { Address } from 'viem';
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

  return (
    duneResult.result?.rows?.map(row => ({
      address: row.address as Address,
      label: row.label as string,
      total_volume: row.total_volume as number,
      profit_loss: row.profit_loss as number,
      success_rate: row.success_rate as number,
      total_wins: row.total_wins as number,
      total_bets: row.total_bets as number,
    })) ?? []
  );
};

export const getAgentsTotalsData = async () => {
  const options: RunQueryArgs = {
    queryId: DUNE_AGENTS_TOTALS_QUERY_ID,
  };

  const duneResult = await duneClient.getLatestResult(options);

  const firstRow = duneResult.result?.rows?.[0];

  return firstRow
    ? {
        total_bets: firstRow.total_bets as number,
        total_wins: firstRow.total_wins as number,
        total_profit_loss: firstRow.total_profit_loss as number,
        avg_success_rate: firstRow.avg_success_rate as number,
        total_volume: firstRow.total_volume as number,
      }
    : null;
};
