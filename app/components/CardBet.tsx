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
  UserBet,
} from '@/entities';
import { redeemPositions } from '@/hooks/contracts';
import { MarketThumbnail } from './MarketThumbnail';
import { Skeleton } from './Skeleton';
import { formatEtherWithFixedDecimals, formatValueWithFixedDecimals } from '@/utils';
import { useTx } from '@/context';
import { OUTCOME_TAG_COLORS_SCHEME } from '@/constants';

interface CardBetProps extends PropsWithChildren {
  userBet: UserBet;
}

export const CardBet = ({ userBet, children }: CardBetProps) => {
  const position = new Position(userBet.position);
  const outcomeIndex = position.getOutcomeIndex();

  const market = new Market(userBet.fpmm);
  const marketCondition = new MarketCondition(userBet.fpmm, position.condition);

  const collateralAmountSpent = tradesCollateralAmountSpent({
    fpmmTrades: userBet?.fpmmTrades,
  });
  const outcomeTokensTraded = outcomeTokensTradedTotal({
    fpmmTrades: userBet?.fpmmTrades,
  });
  const lastTradeTimestamp =
    userBet?.fpmmTrades[userBet?.fpmmTrades.length - 1]?.creationTimestamp;

  const outcomeBalance = tradesOutcomeBalance({
    fpmmTrades: userBet?.fpmmTrades,
  });

  if (!market) return null;

  const isWinner = market.isWinner(outcomeIndex);
  const isLoser = market.isLoser(outcomeIndex);

  const getResultAmountString = (): string => {
    if (!market.isClosed || !market.isAnswerFinal) return 'Potential win';
    if (isWinner) return 'Won';
    if (market.isAnswerInvalid) return 'Receive';

    return 'Lost';
  };

  const getResultAmount = (): string => {
    const invalidMarketColleteralToRedeem = marketCondition.getRedeemableColleteralToken(
      outcomeTokensTraded,
      outcomeIndex
    );

    if (!market.isClosed || isWinner || !market.isAnswerFinal)
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
        isLoser
          ? market.isAnswerInvalid
            ? ''
            : 'from-[#F2f2F2] to-[#f4cbc4] dark:from-[#131313] dark:to-[#301111]'
          : ''
      )}
    >
      <Link key={market.fpmm.id} href={`markets?id=${market.fpmm.id}`} className="block">
        <section className="flex min-h-[144px] flex-col space-y-4 p-4">
          <div className="flex items-center justify-between">
            <Tag colorScheme="quaternary" size="sm" className="capitalize">
              {market.fpmm.category}
            </Tag>
            <div className="flex items-center space-x-2">
              <Tag colorScheme="quaternary" size="sm" className="capitalize">
                {market.getMarketStatus()}
              </Tag>
              <p className="text-sm text-text-low-em">
                {remainingTime(market.closingDate)}
              </p>
            </div>
          </div>
          <div className="flex space-x-4 py-2">
            <MarketThumbnail
              width={40}
              height={40}
              className="size-[40px] rounded-8"
              marketId={market.fpmm.id}
            />
            <div className="space-y-2">
              <div className="flex-1 overflow-y-auto text-md font-semibold text-text-high-em md:text-xl">
                {market.fpmm.title}
              </div>
              {market.isClosed && (
                <div className="flex space-x-2">
                  <p className="text-text-med-em">Answer:</p>
                  {market.currentAnswer !== null && (
                    <Tag colorScheme={OUTCOME_TAG_COLORS_SCHEME[market.currentAnswer]}>
                      {market.getCurrentAnswerOutcome()?.name}
                    </Tag>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </Link>
      <section className="flex items-center border-t border-outline-base-em p-4 md:h-[48px]">
        <div className="flex w-full items-center justify-between space-x-4">
          <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-4">
            <div className="flex items-center space-x-1">
              <p className="text-sm font-semibold text-text-med-em">Bet:</p>{' '}
              <div className="flex items-center space-x-1.5">
                <Tag
                  colorScheme={position.getOutcomeIndex() === 0 ? 'success' : 'danger'}
                >
                  {position.getOutcome()}
                </Tag>
                <p className="flex items-center space-x-1 text-sm font-semibold text-text-high-em">
                  <p>{formatEtherWithFixedDecimals(collateralAmountSpent, 2)}</p>
                  <TokenLogo address={market.fpmm.collateralToken} className="size-3" />
                </p>
              </div>
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

export const MyBetsCardBet = ({ userBet }: { userBet: UserBet }) => {
  const { submitCustomTx } = useTx();

  const position = new Position(userBet.position);
  const outcomeIndex = position.getOutcomeIndex();

  const condition = userBet.position.conditions[0];
  const marketCondition = new MarketCondition(userBet.fpmm, condition);

  const canRedeem = marketCondition.canRedeem(outcomeIndex, userBet.balance);

  const redeem = async () => {
    await submitCustomTx(() =>
      redeemPositions({
        conditionId: condition.id,
        collateralToken: userBet.position.collateralTokenAddress,
      })
    ).catch(error => console.error(error));
    trackEvent(FA_EVENTS.BETS.REDEEM);
  };

  return (
    <CardBet userBet={userBet}>
      {canRedeem && (
        <Button size="sm" colorScheme="success" variant="pastel" onClick={redeem}>
          Reedem
        </Button>
      )}
    </CardBet>
  );
};
export const ProfileCardBet = ({ userBet }: { userBet: UserBet }) => (
  <CardBet userBet={userBet} />
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
