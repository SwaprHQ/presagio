import { GNOSIS_SCAN_URL } from '@/constants';

export const getExplorerUrl = (txHash: string, isTx: boolean = true) => {
  return `${GNOSIS_SCAN_URL}/${isTx ? 'tx' : 'address'}/${txHash}`;
};

export const shortenAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;
