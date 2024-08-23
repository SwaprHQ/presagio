import { formatEther } from 'viem';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formattedNumberDollars = (number: number) => formatter.format(number);

export const formatEtherWithFixedDecimals = (wei: bigint, fixedDecimals: number = 5) => {
  const formattedEther = formatEther(wei);
  return formatValueWithFixedDecimals(formattedEther, fixedDecimals);
};

export const formatValueWithFixedDecimals = (
  value: number | string,
  fixedDecimals: number = 5
) => {
  const isAnInteger = Number(value) % 1 === 0;
  const smallestNumber = 1 / 10 ** fixedDecimals;
  const smallNumberString = `<${smallestNumber.toFixed(fixedDecimals)}`;
  const isVerySmallNumber = Number(value) < smallestNumber;

  if (isAnInteger) return value;
  if (isVerySmallNumber) return smallNumberString;

  return Number(value).toFixed(fixedDecimals);
};
