import { FixedProductMarketMaker } from '@/queries/omen/types';

export const marketHasDangerousKeyword = (fpmm: FixedProductMarketMaker) =>
  dangerousKeywords.some((keyword: string) => fpmm?.title?.includes(keyword));

export const dangerousKeywords = [
  'arson',
  'assassinated',
  'assassination',
  'assault',
  'attack',
  'behead',
  'bloodshed',
  'bomb',
  'dead',
  'death',
  'decapitate',
  'execution',
  'genocide',
  'homicide',
  'hostage',
  'kidnap',
  'kill',
  'lynch',
  'manslaughter',
  'mass shooting',
  'massacre',
  'murder',
  'rape',
  'slaughter',
  'suicide',
  'stab',
  'strangle',
  'terrorist',
  'torture',
];
