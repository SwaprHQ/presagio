"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  FixedProductMarketMaker_OrderBy,
  OrderDirection,
  getMarkets,
} from "@/queries/omen";
import { CardMarket, LoadingCardMarket } from "@/app/components";

export default function HomePage() {
  const { data: markets, isLoading } = useQuery({
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
          {isLoading
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(index => (
                <LoadingCardMarket key={index} />
              ))
            : markets?.fixedProductMarketMakers.map(market => (
                <Link key={market.id} href={`markets?id=${market.id}`}>
                  <CardMarket market={market} />
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
}
