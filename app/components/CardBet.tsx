'use client';

import { cx } from 'class-variance-authority';
import Link from 'next/link';
import { useConfig } from 'wagmi';

import { Button, Tag } from '@swapr/ui';
import { Card, TokenLogo } from '@/app/components';

import { formatDateTimeWithYear, remainingTime } from '@/utils/dates';
import {
  Market,
  MarketCondition,
  Position,
  tradesCollateralAmountUSDSpent,
  tradesOutcomeBalance,
  UserBets,
} from '@/entities';
import { redeemPositions } from '@/hooks/contracts';
import { waitForTransactionReceipt } from 'wagmi/actions';
import { PropsWithChildren, useState } from 'react';
import { ModalId, useModal } from '@/context/ModalContext';
import { MarketThumbnail } from './MarketThumbnail';
import { Skeleton } from './Skeleton';
import { TransactionModal } from './TransactionModal';
import { formatValueWithFixedDecimals } from '@/utils';

interface CardBetProps extends PropsWithChildren {
  userBets: UserBets;
}

export const CardBet = ({ userBets, children }: CardBetProps) => {
  const position = new Position(userBets.position);
  const outcomeIndex = position.getOutcomeIndex();

  const market = new Market(userBets.fpmm);

  const collateralAmountUSDSpent = tradesCollateralAmountUSDSpent({
    fpmmTrades: userBets?.fpmmTrades,
  });
  const lastTradeTimestamp =
    userBets?.fpmmTrades[userBets?.fpmmTrades.length - 1]?.creationTimestamp;

  const outcomeBalance = tradesOutcomeBalance({
    fpmmTrades: userBets?.fpmmTrades,
  });

  if (!market) return null;

  const isWinner = market.isWinner(outcomeIndex);
  const isLoser = market.isLoser(outcomeIndex);

  const outcomeAmountString = market.isClosed
    ? isWinner
      ? 'Won'
      : 'Lost'
    : 'Potential win';

  return (
    <Card
      className={cx(
        'w-full bg-gradient-to-b from-[#F1F1F1] dark:from-[#131313]',
        isWinner && 'from-[#F2f2F2] to-[#d0ffd6] dark:from-[#131313] dark:to-[#11301F]',
        isLoser && 'from-[#F2f2F2] to-[#f4cbc4] dark:from-[#131313] dark:to-[#301111]'
      )}
    >
      <Link key={market.fpmm.id} href={`markets?id=${market.fpmm.id}`} className="block">
        <section className="flex h-[144px] flex-col justify-between space-y-4 p-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Tag colorScheme="quaternary" size="sm" className="capitalize">
                {market.fpmm.category}
              </Tag>
              <Tag colorScheme="success" size="sm">
                {position.getOutcome()}
              </Tag>
            </div>
            <p className="text-sm text-text-low-em">
              {remainingTime(market.closingDate)}
            </p>
          </div>
          <div className="flex space-x-4">
            <MarketThumbnail
              width={40}
              height={40}
              className="size-[40px] rounded-8"
              marketId={market.fpmm.id}
            />
            <div className="text-normal h-[80px] flex-1 overflow-y-auto font-semibold text-text-high-em md:text-xl">
              {market.fpmm.title}
            </div>
          </div>
        </section>
      </Link>
      <section className="flex items-center border-t border-outline-base-em px-4 py-2 md:h-[48px] md:py-0">
        <div className="flex w-full items-center justify-between space-x-4">
          <div className="flex flex-col items-start space-y-0.5 md:flex-row md:items-center md:space-x-3">
            <div className="flex items-center space-x-1">
              <p className="text-sm font-semibold text-text-med-em">Bet amount:</p>
              <p className="text-sm font-semibold text-text-high-em">
                ${formatValueWithFixedDecimals(collateralAmountUSDSpent, 4)}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <p className="text-sm font-semibold text-text-med-em">
                {outcomeAmountString}:
              </p>
              <div className="flex items-center space-x-1 text-sm font-semibold text-text-high-em">
                {!market.isClosed || isWinner ? (
                  <>
                    <p>{formatValueWithFixedDecimals(outcomeBalance)}</p>
                    <TokenLogo address={market.fpmm.collateralToken} className="size-3" />
                  </>
                ) : (
                  '$' + formatValueWithFixedDecimals(collateralAmountUSDSpent)
                )}
              </div>
            </div>
            {lastTradeTimestamp && (
              <div className="flex items-center space-x-1">
                <p className="text-sm font-semibold text-text-med-em">Last bet:</p>
                <p className="text-sm font-semibold text-text-high-em">
                  {formatDateTimeWithYear(lastTradeTimestamp)}
                </p>
              </div>
            )}
          </div>
          {children}
        </div>
      </section>
    </Card>
  );
};

export const MyBetsCardBet = ({ userBets }: { userBets: UserBets }) => {
  const config = useConfig();
  const [txHash, setTxHash] = useState('');
  const [isTxLoading, setIsTxLoading] = useState(false);
  const { openModal } = useModal();

  const position = new Position(userBets.position);
  const outcomeIndex = position.getOutcomeIndex();

  const condition = userBets.position.conditions[0];
  const marketCondition = new MarketCondition(userBets.fpmm, condition);

  const canRedeem = marketCondition.canRedeem(outcomeIndex, userBets.balance);

  const redeem = async () => {
    setIsTxLoading(true);

    try {
      const txHash = await redeemPositions({
        conditionId: condition.id,
        collateralToken: userBets.position.collateralTokenAddress,
      });
      setTxHash(txHash);
      openModal(ModalId.WAITING_TRANSACTION);

      await waitForTransactionReceipt(config, {
        hash: txHash,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsTxLoading(false);
    }
  };

  return (
    <CardBet userBets={userBets}>
      {canRedeem && (
        <>
          <Button size="sm" colorScheme="success" variant="pastel" onClick={redeem}>
            Reedem
          </Button>
          <TransactionModal isLoading={isTxLoading} txHash={txHash} />
        </>
      )}
    </CardBet>
  );
};
export const ProfileCardBet = ({ userBets }: { userBets: UserBets }) => (
  <CardBet userBets={userBets} />
);

export const LoadingCardBet = () => (
  <Card className="flex h-[194px] w-full flex-col justify-between p-4">
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-32" />
      </div>
      <Skeleton className="h-20" />
    </div>
    <div className="flex items-center justify-between">
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-6 w-20" />
    </div>
  </Card>
);
