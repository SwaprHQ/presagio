'use client';

import { LoadingCardBet, MyBetsCardBet } from '@/app/components/CardBet';
import { UserPosition } from '@/queries/conditional-tokens/types';

import { PropsWithChildren, ReactNode } from 'react';
import { TabPanel, TabStyled } from '@swapr/ui';
import { UserBet } from '@/entities';

export interface BetsListPanelProps {
  emptyText?: string;
  bets: UserBet[];
  isLoading: boolean;
  unredeemed?: boolean;
  CardComponent?: React.ComponentType<{
    userBet: UserBet;
  }>;
}

interface BetsListTabProps {
  children: ReactNode;
  bets: UserPosition[];
}

const BetsListTabCounter = ({ children }: PropsWithChildren) => (
  <div className="ml-2 rounded-6 border border-outline-low-em bg-surface-surface-0 p-1 px-1.5 text-2xs">
    {children}
  </div>
);

const LoadingBets = () =>
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(index => <LoadingCardBet key={index} />);

export const BetsListTab = ({ children, bets }: BetsListTabProps) => {
  const counter = bets?.length ?? '-';
  return (
    <TabStyled>
      {children}
      <BetsListTabCounter>{counter}</BetsListTabCounter>
    </TabStyled>
  );
};

export const BetsListPanel = ({
  emptyText = '',
  bets,
  isLoading,
  CardComponent = MyBetsCardBet,
}: BetsListPanelProps) => {
  return (
    <TabPanel className="space-y-4">
      {isLoading && <LoadingBets />}
      {!isLoading &&
        bets.length > 0 &&
        bets.map((userBet: UserBet) => (
          <CardComponent userBet={userBet} key={userBet.id} />
        ))}
      {!isLoading && !bets.length && (
        <div className="space-y-4 rounded-12 border border-surface-surface-2 p-6">
          <p className="text-center">{emptyText}</p>
        </div>
      )}
    </TabPanel>
  );
};
