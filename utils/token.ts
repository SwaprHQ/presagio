import { GNOSIS_SCAN_URL } from '@/constants';

export const shortenAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

export const getGnosisAddressExplorerLink = (address: string) =>
  `${GNOSIS_SCAN_URL}/address/${address}`;
