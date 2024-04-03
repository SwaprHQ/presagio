"use client";

import { Swapbox } from "@/app/components";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getMarket } from "@/queries/omen";

interface SwapboxContainerProps {
  id: string;
}

export const SwapboxContainer = ({ id }: SwapboxContainerProps) => {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["getMarket", id],
    queryFn: async () => getMarket({ id }),
  });

  if (!data || !data.fixedProductMarketMaker) return null;

  const market = data.fixedProductMarketMaker;

  const closingDate = new Date(+market.openingTimestamp * 1000).toUTCString();

  return (
    <div>
      <div
        className="flex items-center mb-3 space-x-2"
        onClick={() => router.back()}
      >
        <div className="p-1 rounded-lg bg-stone-800">{"<"}</div>
        <p className="cursor-pointer hover:underline">Go back</p>
      </div>
      <div className="bg-[#131313] w-full md:w-[464px] h-[520px] rounded-2xl p-12 border border-white/10">
        <h1 className="text-xl font-bold">{market.title}</h1>
        <p>{market.category}</p>
        <p>{`${market.outcomes?.[0]}: ${
          market.outcomeTokenMarginalPrices
            ? (+market.outcomeTokenMarginalPrices[0] * 100).toFixed(2)
            : "-"
        }`}</p>
        <p>{`${market.outcomes?.[1]}: ${
          market.outcomeTokenMarginalPrices
            ? (+market.outcomeTokenMarginalPrices[1] * 100).toFixed(2)
            : "-"
        }`}</p>
        <p>{(+market.usdVolume).toFixed(2) || "-"}$ Vol.</p>
        <p>Ends at {closingDate}</p>
        <Swapbox />
      </div>
    </div>
  );
};
