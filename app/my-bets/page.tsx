"use client";

import { CardBet, LoadingCardBet } from "@/app/components/CardBet";
import {
  FixedProductMarketMaker_OrderBy,
  OrderDirection,
  getMarkets,
} from "@/queries/omen";
import { useQuery } from "@tanstack/react-query";
import { TabBody, TabGroup, TabHeader, TabPanel, TabStyled } from "swapr-ui";

export default function MyBetsPage() {
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
    <div className="w-full px-6 mt-12 space-y-12 md:items-center md:flex md:flex-col">
      <div>
        <h1 className="mb-8 text-2xl font-semibold text-white">My bets</h1>
        <div className="md:w-[760px]">
          <TabGroup
            onChange={(index: number) =>
              console.log("Changed selected tab to:", index)
            }
          >
            <TabHeader className="overflow-x-auto md:overflow-x-visible">
              <TabStyled>
                All bets{" "}
                <div className="bg-surface-surface-0 text-2xs border border-outline-low-em rounded-6 p-1 px-1.5 ml-2">
                  09
                </div>
              </TabStyled>
              <TabStyled>Active</TabStyled>
              <TabStyled>Unredeemed</TabStyled>
              <TabStyled>Complete</TabStyled>
            </TabHeader>

            <TabBody className="mt-8">
              <TabPanel className="space-y-4">
                {isLoading
                  ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(index => (
                      <LoadingCardBet key={index} />
                    ))
                  : markets?.fixedProductMarketMakers &&
                    markets.fixedProductMarketMakers.map(market => (
                      <CardBet market={market} key={market.id} />
                    ))}
              </TabPanel>
              <TabPanel>
                <div className="bg-surface-primary-accent-1 p-5 rounded-4">
                  in development..
                </div>
              </TabPanel>
              <TabPanel>
                <div className="bg-surface-danger-accent-1 p-5 rounded-4">
                  in development..
                </div>
              </TabPanel>
              <TabPanel>
                <div className="bg-surface-warning-accent-1 p-5 rounded-4">
                  Come back in a week!
                </div>
              </TabPanel>
            </TabBody>
          </TabGroup>
        </div>
      </div>
    </div>
  );
}
