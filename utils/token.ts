export const shortenAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

export const getGnosisAddressExplorerLink = (address: string) =>
  `https://gnosisscan.io/address/${address}`;
