import { GNOSIS_SCAN_URL } from '@/constants';

export const getExplorerAddressUrl = (address: string) => {
  return `${GNOSIS_SCAN_URL}/address/${address}`;
};

export const getExplorerTxUrl = (txHash: string) => {
  return `${GNOSIS_SCAN_URL}/tx/${txHash}`;
};

export const shortenAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;
