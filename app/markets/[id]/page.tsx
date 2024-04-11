import { QueryClient } from "@tanstack/react-query";
import {
  FixedProductMarketMaker_OrderBy,
  OrderDirection,
  getMarkets,
} from "@/queries/omen";
import { MarketDetails } from "./MarketDetails";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const queryClient = new QueryClient();
  const markets = await queryClient.fetchQuery({
    queryKey: ["getMarkets"],
    queryFn: async () =>
      getMarkets({
        first: 10,
        skip: 0,
        orderBy: FixedProductMarketMaker_OrderBy.CreationTimestamp,
        orderDirection: OrderDirection.Desc,
      }),
  });

  return markets.fixedProductMarketMakers.map(({ id }) => ({
    id,
  }));
}

export default async function MarketsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main className="w-full px-6 mt-12 flex flex-col items-center">
      <MarketDetails id={params.id} />
    </main>
  );
}
