import { FixedProductMarketMaker } from "@/queries/omen";

interface Card {
  market: FixedProductMarketMaker;
}

export const Card = ({ market }: Card) => {
  const closingDate = new Date(+market.openingTimestamp * 1000).toUTCString();

  const outcome0Price = market.outcomeTokenMarginalPrices
    ? (+market.outcomeTokenMarginalPrices[0] * 100).toFixed(2)
    : "-";
  const outcome1Price = market.outcomeTokenMarginalPrices
    ? (+market.outcomeTokenMarginalPrices[1] * 100).toFixed(2)
    : "-";

  return (
    <div className="h-[184px] sm:w-[344px] bg-[#131313] rounded-2xl border border-white/10 p-4">
      <p>{market.title}</p>
      <p>{`${market.outcomes?.[0]}: ${outcome0Price}`}</p>
      <p>{`${market.outcomes?.[1]}: ${outcome1Price}`}</p>
      <p>{(+market.usdVolume).toFixed(2) || "-"}$ Vol.</p>
      <p>Ends at {closingDate}</p>
    </div>
  );
};
