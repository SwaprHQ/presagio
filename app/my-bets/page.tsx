"use client";

import { CardBet, LoadingCardBet } from "@/app/components/CardBet";
import { getUserPositions } from "@/queries/conditional-tokens";
import {
  Position,
  User,
  UserPosition,
} from "@/queries/conditional-tokens/types";
import { useQuery } from "@tanstack/react-query";
import { TabBody, TabGroup, TabHeader, TabPanel, TabStyled } from "swapr-ui";
import { useAccount } from "wagmi";

export default function MyBetsPage() {
  const { address } = useAccount();

  const { data, isLoading } = useQuery({
    queryKey: ["getUserPositions"],
    queryFn: async () =>
      getUserPositions({
        id: address?.toLowerCase() as string,
      }),
    enabled: !!address,
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
                All bets
                <div className="bg-surface-surface-0 text-2xs border border-outline-low-em rounded-6 p-1 px-1.5 ml-2">
                  {data?.userPositions.length ?? "-"}
                </div>
              </TabStyled>
              <TabStyled>Active</TabStyled>
              <TabStyled>Unredeemed</TabStyled>
              <TabStyled>Complete</TabStyled>
            </TabHeader>

            <TabBody className="mt-8">
              <TabPanel className="space-y-4">
                {isLoading ? (
                  <LoadingBets />
                ) : (
                  data &&
                  data?.userPositions.map((position: UserPosition) => (
                    <CardBet userPosition={position} key={position.id} />
                  ))
                )}
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

const LoadingBets = () =>
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(index => <LoadingCardBet key={index} />);
