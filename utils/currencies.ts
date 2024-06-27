import { formatEther } from 'viem';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formattedNumberDollars = (number: number) => formatter.format(number);

export const formatEtherWithFixedDecimals = (wei: bigint, fixedDecimals: number = 3) => {
  const sharesFormatted = formatEther(wei);

  return Number(sharesFormatted) % 1 === 0
    ? sharesFormatted
    : Number(sharesFormatted).toFixed(fixedDecimals);
};
