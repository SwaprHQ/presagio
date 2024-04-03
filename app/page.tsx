"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  FixedProductMarketMaker,
  FixedProductMarketMaker_OrderBy,
  OrderDirection,
  getMarkets,
} from "@/queries/omen";
import { CardMarket } from "@/app/components";

export default function AppPage() {
  const { data: markets } = useQuery({
    queryKey: ["getMarkets"],
    queryFn: async () =>
      getMarkets({
        first: 10,
        skip: 0,
        orderBy: FixedProductMarketMaker_OrderBy.CreationTimestamp,
        orderDirection: OrderDirection.Desc,
      }),
  });

  return (
    <div className="px-6 mt-12 space-y-12 md:flex md:flex-col md:items-center">
      <div>
        <h1 className="mb-12 text-2xl font-semibold text-white">
          🔮 All markets
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  2xl:max-w-[1424px] 2xl:grid-cols-4 gap-4">
          {markets?.fixedProductMarketMakers &&
            markets.fixedProductMarketMakers.map(market => (
              <Link key={market.id} href={`markets/${market.id}`}>
                <CardMarket market={market} />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
