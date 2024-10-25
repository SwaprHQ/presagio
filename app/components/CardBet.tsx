'use client';

import { PropsWithChildren } from 'react';
import { cx } from 'class-variance-authority';
import { trackEvent } from 'fathom-client';
import Link from 'next/link';

import { Button, Tag } from '@swapr/ui';
import { Card, TokenLogo } from '@/app/components';

import { FA_EVENTS } from '@/analytics';
import { formatDateTimeWithYear, remainingTime } from '@/utils/dates';
import {
  Market,
  MarketCondition,
  Position,
  tradesCollateralAmountSpent,
  tradesOutcomeBalance,
  outcomeTokensTradedTotal,
  UserBets,
} from '@/entities';
import { redeemPositions } from '@/hooks/contracts';
import { MarketThumbnail } from './MarketThumbnail';
import { Skeleton } from './Skeleton';
import { formatEtherWithFixedDecimals, formatValueWithFixedDecimals } from '@/utils';
import { useTx } from '@/context';

interface CardBetProps extends PropsWithChildren {
  userBets: UserBets;
}

export const CardBet = ({ userBets, children }: CardBetProps) => {
  const position = new Position(userBets.position);
  const outcomeIndex = position.getOutcomeIndex();

  const market = new Market(userBets.fpmm);
  const marketCondition = new MarketCondition(userBets.fpmm, position.condition);

  const collateralAmountSpent = tradesCollateralAmountSpent({
    fpmmTrades: userBets?.fpmmTrades,
  });
  const outcomeTokensTraded = outcomeTokensTradedTotal({
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

  const getResultAmountString = (): string => {
    if (!market.isClosed) return 'Potential win';
    if (isWinner) return 'Won';
    if (market.isAnswerInvalid) return 'Receive';

    return 'Lost';
  };

  const getResultAmount = (): string => {
    const invalidMarketColleteralToRedeem = marketCondition.getRedeemableColleteralToken(
      outcomeTokensTraded,
      outcomeIndex
    );

    if (!market.isClosed || isWinner)
      return formatValueWithFixedDecimals(outcomeBalance, 2);

    if (market.isAnswerInvalid)
      return formatValueWithFixedDecimals(invalidMarketColleteralToRedeem || 0, 2);

    return formatEtherWithFixedDecimals(collateralAmountSpent, 2);
  };

  const resultAmountString = getResultAmountString();
  const resultAmount = getResultAmount();

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
              <p className="flex items-center space-x-1 text-sm font-semibold text-text-high-em">
                <p>{formatEtherWithFixedDecimals(collateralAmountSpent, 2)}</p>
                <TokenLogo address={market.fpmm.collateralToken} className="size-3" />
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <p className="text-sm font-semibold text-text-med-em">
                {resultAmountString}:
              </p>
              <div className="flex items-center space-x-1 text-sm font-semibold text-text-high-em">
                <p>{resultAmount}</p>
                <TokenLogo address={market.fpmm.collateralToken} className="size-3" />
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
  const { submitCustomTx } = useTx();

  const position = new Position(userBets.position);
  const outcomeIndex = position.getOutcomeIndex();

  const condition = userBets.position.conditions[0];
  const marketCondition = new MarketCondition(userBets.fpmm, condition);

  const canRedeem = marketCondition.canRedeem(outcomeIndex, userBets.balance);

  const redeem = async () => {
    await submitCustomTx(() =>
      redeemPositions({
        conditionId: condition.id,
        collateralToken: userBets.position.collateralTokenAddress,
      })
    );
    trackEvent(FA_EVENTS.BETS.REDEEM);
  };

  return (
    <CardBet userBets={userBets}>
      {canRedeem && (
        <Button size="sm" colorScheme="success" variant="pastel" onClick={redeem}>
          Reedem
        </Button>
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
