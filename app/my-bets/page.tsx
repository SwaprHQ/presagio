"use client";

import { CardBet, LoadingCardBet } from "@/app/components/CardBet";
import NoBetsStatePage from "@/app/my-bets/NoBetsStatePage";
import NoWalletStatePage from "@/app/my-bets/NoWalletStatePage";

import { getUserPositions } from "@/queries/conditional-tokens";
import { UserPosition } from "@/queries/conditional-tokens/types";
import { useQuery } from "@tanstack/react-query";

import { PropsWithChildren, ReactNode } from "react";
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

  const userPositions = data?.userPositions ?? [];

  const filterActiveBets = userPositions.filter(
    position => position.position.conditions[0].resolved === false
  );
  const filterClompleteBets = userPositions.filter(
    position => position.position.conditions[0].resolved
  );

  if (!address) return <NoWalletStatePage />;
  if (data && data.userPositions.length == 0) return <NoBetsStatePage />;

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
              <BetsListTab bets={userPositions}>All Bets</BetsListTab>
              <BetsListTab bets={filterActiveBets}>Active</BetsListTab>
              <BetsListTab bets={filterClompleteBets}>Unredeemed</BetsListTab>
              <BetsListTab bets={filterClompleteBets}>Complete</BetsListTab>
            </TabHeader>
            <TabBody className="mt-8">
              <BetsListPanel bets={userPositions} isLoading={isLoading} />
              <BetsListPanel
                emptyText="No active bets"
                bets={filterActiveBets}
                isLoading={isLoading}
              />
              <BetsListPanel
                emptyText="No redeemable bets"
                bets={filterClompleteBets}
                isLoading={isLoading}
              />
              <BetsListPanel
                emptyText="No complete bets"
                bets={filterClompleteBets}
                isLoading={isLoading}
              />
            </TabBody>
          </TabGroup>
        </div>
      </div>
    </div>
  );
}

const BetsListTabCounter = ({ children }: PropsWithChildren) => (
  <div className="bg-surface-surface-0 text-2xs border border-outline-low-em rounded-6 p-1 px-1.5 ml-2">
    {children}
  </div>
);

const LoadingBets = () =>
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(index => <LoadingCardBet key={index} />);

interface BetsListPanelProps {
  emptyText?: string;
  bets: UserPosition[];
  isLoading: boolean;
}

interface BetsListTabProps {
  children: ReactNode;
  bets: UserPosition[];
}

const BetsListTab = ({ children, bets }: BetsListTabProps) => {
  const counter = bets?.length ?? "-";
  return (
    <TabStyled>
      {children}
      <BetsListTabCounter>{counter}</BetsListTabCounter>
    </TabStyled>
  );
};

const BetsListPanel = ({
  emptyText = "",
  bets,
  isLoading,
}: BetsListPanelProps) => {
  return (
    <TabPanel className="space-y-4">
      {isLoading && <LoadingBets />}
      {!isLoading &&
        bets.length &&
        bets.map((position: UserPosition) => (
          <CardBet userPosition={position} key={position.id} />
        ))}
      {!isLoading && !bets.length && (
        <div className="p-6 space-y-4 bg-surface-surface-1 rounded-12">
          <p>{emptyText}</p>
        </div>
      )}
    </TabPanel>
  );
};
