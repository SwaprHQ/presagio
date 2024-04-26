"use client";

import { CardBet, LoadingCardBet } from "@/app/components/CardBet";
import NoWalletState from "@/app/my-bets/NoWalletState";
import { getUserPositions } from "@/queries/conditional-tokens";
import { UserPosition } from "@/queries/conditional-tokens/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { PropsWithChildren } from "react";
import {
  Button,
  TabBody,
  TabGroup,
  TabHeader,
  TabPanel,
  TabStyled,
} from "swapr-ui";
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

  const userPositions = data?.userPositions ?? [];
  const emptyData = data && data.userPositions.length == 0;

  const filterActiveBets = (userPositions: UserPosition[]) =>
    userPositions?.filter(
      position => position.position.conditions[0].resolved === false
    );

  const filterClompleteBets = (userPositions: UserPosition[]) =>
    userPositions?.filter(position => position.position.conditions[0].resolved);

  if (!address) return <NoWalletState />;

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
                <TabBetCounter>{userPositions?.length ?? "-"}</TabBetCounter>
              </TabStyled>
              <TabStyled>
                Active
                <TabBetCounter>
                  {filterActiveBets(userPositions).length ?? "-"}
                </TabBetCounter>
              </TabStyled>
              <TabStyled>
                Unredeemed
                <TabBetCounter>0</TabBetCounter>
              </TabStyled>
              <TabStyled>
                Complete
                <TabBetCounter>
                  {filterClompleteBets(userPositions).length ?? "-"}
                </TabBetCounter>
              </TabStyled>
            </TabHeader>

            <TabBody className="mt-8">
              <TabPanel className="space-y-4">
                {isLoading ? (
                  <LoadingBets />
                ) : emptyData ? (
                  <EmptyState />
                ) : (
                  userPositions.map((position: UserPosition) => (
                    <CardBet userPosition={position} key={position.id} />
                  ))
                )}
              </TabPanel>
              <TabPanel>
                {isLoading ? (
                  <LoadingBets />
                ) : filterClompleteBets.length === 0 ? (
                  <div className="bg-surface-surface-1 p-6 rounded-12 space-y-4">
                    <p>No active bets</p>
                  </div>
                ) : (
                  filterActiveBets(userPositions).map(
                    (position: UserPosition) => (
                      <CardBet userPosition={position} key={position.id} />
                    )
                  )
                )}
              </TabPanel>
              <TabPanel>
                <div className="bg-surface-surface-1 p-6 rounded-12 space-y-4">
                  <p>No redeemable bets</p>
                </div>
              </TabPanel>
              <TabPanel className="space-y-4">
                {isLoading ? (
                  <LoadingBets />
                ) : filterClompleteBets.length === 0 ? (
                  <div className="bg-surface-surface-1 p-6 rounded-12 space-y-4">
                    <p>No complete bets</p>
                  </div>
                ) : (
                  filterClompleteBets(userPositions).map(
                    (position: UserPosition) => (
                      <CardBet userPosition={position} key={position.id} />
                    )
                  )
                )}
              </TabPanel>
            </TabBody>
          </TabGroup>
        </div>
      </div>
    </div>
  );
}

const TabBetCounter = ({ children }: PropsWithChildren) => (
  <div className="bg-surface-surface-0 text-2xs border border-outline-low-em rounded-6 p-1 px-1.5 ml-2">
    {children}
  </div>
);

const LoadingBets = () =>
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(index => <LoadingCardBet key={index} />);

const EmptyState = () => (
  <div className="bg-surface-primary-accent-1 p-6 rounded-12 space-y-4">
    <p>You didn&apos;t do any bet yet. Checkout the markets and place a bet.</p>
    <Link href="/" className="block">
      <Button>Check markets</Button>
    </Link>
  </div>
);
