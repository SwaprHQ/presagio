import { LatestResultArgs, ParameterType, RunQueryArgs } from '@duneanalytics/client-sdk';
import { duneClient } from '@/utils';
import { Categories } from '@/constants';

const DUNE_OPEN_MARKETS_INFO_QUERY_ID = 3781367;

const presagioCategories = Object.values(Categories).join(',');

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
    filters: `category in (${presagioCategories})`,
    columns: ['category'],
    sort_by: 'category asc',
  };

  const duneResult = await duneClient.getLatestResult(options);

  return duneResult.result?.rows;
};
