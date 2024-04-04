const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formattedNumberDollars = (number: number) =>
  formatter.format(number);
