export const getButtonLabel = (
  amount: number,
  defaultLabel: string,
  isEnoughBalance: boolean,
  tokenSymbolText: string
) => {
  if (!amount) return 'Enter amount';
  else if (!isEnoughBalance) return `Insufficient ${tokenSymbolText} balance`;
  else return defaultLabel;
};
