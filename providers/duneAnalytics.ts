import { DuneClient } from '@duneanalytics/client-sdk';
import { DUNE_API_KEY } from '@/constants';

export const duneClient = new DuneClient(DUNE_API_KEY);
