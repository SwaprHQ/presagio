'use client';

import { cx } from 'class-variance-authority';
import Link from 'next/link';
import { useConfig } from 'wagmi';

import { Button, Tag } from '@swapr/ui';
import { Card, TokenLogo } from '@/app/components';

import { formatDateTimeWithYear, remainingTime } from '@/utils/dates';
import {
  Market,
  Position,
  tradesCollateralAmountUSDSpent,
  tradesOutcomeBalance,
} from '@/entities';
import { redeemPositions } from '@/hooks/contracts';
import { waitForTransactionReceipt } from 'wagmi/actions';
import { useState } from 'react';
import { ModalId, useModal } from '@/context/ModalContext';
import { TransactionModal } from './TransactionModal';
import { MarketThumbnail } from './MarketThumbnail';
import { UserPositionComplete } from '@/app/my-bets/page';

interface BetProps {
  userPositionComplete: UserPositionComplete;
}

export const CardBet = ({ userPositionComplete }: BetProps) => {
  const position = new Position(userPositionComplete.position);
  const outcomeIndex = position.outcomeIndex - 1;

  const config = useConfig();
  const [txHash, setTxHash] = useState('');
  const [isTxLoading, setIsTxLoading] = useState(false);
  const { openModal } = useModal();

  const market = new Market(userPositionComplete.condition.fixedProductMarketMakers[0]);

  const collateralAmountUSDSpent = tradesCollateralAmountUSDSpent({
    fpmmTrades: userPositionComplete?.fpmmTrades,
  });
  const lastTradeTimestamp =
    userPositionComplete?.fpmmTrades[userPositionComplete?.fpmmTrades.length - 1]
      ?.creationTimestamp;

  const outcomeBalance = tradesOutcomeBalance({
    fpmmTrades: userPositionComplete?.fpmmTrades,
  });

  const balance = outcomeBalance ? outcomeBalance.toFixed(2) : '-';

  if (!market) return;

  const isWinner = market.isWinner(outcomeIndex);
  const isLoser = market.isLoser(outcomeIndex);

  const outcomeAmountString = market.isClosed
    ? isWinner
      ? 'You won'
      : 'You lost'
    : 'Potential win';

  const condition = userPositionComplete.position.conditions[0];

  const isClaimed = !outcomeBalance;
  const isResolved = condition.resolved;
  const hasPayoutDenominator = +condition.payoutDenominator > 0;

  const canClaim = isWinner && isResolved && !isClaimed && hasPayoutDenominator;

  const redeem = async () => {
    setIsTxLoading(true);

    try {
      const txHash = await redeemPositions({
        conditionId: condition.id,
        outcomeIndex: position.outcomeIndex,
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
    <Card
      className={cx(
        'w-full bg-gradient-to-b from-[#F1F1F1] dark:from-[#131313]',
        isWinner && 'from-[#F2f2F2] to-[#d0ffd6] dark:from-[#131313] dark:to-[#11301F]',
        isLoser && 'from-[#F2f2F2] to-[#f4cbc4] dark:from-[#131313] dark:to-[#301111]'
      )}
    >
      <Link key={market.data.id} href={`markets?id=${market.data.id}`} className="block">
        <section className="flex h-[144px] flex-col justify-between space-y-4 p-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Tag colorScheme="quaternary" size="sm" className="capitalize">
                {market.data.category}
              </Tag>
              <Tag colorScheme="success" size="sm">
                You chose {position.getOutcome()}
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
              marketId={market.data.id}
            />
            <div className="text-normal h-[80px] flex-1 overflow-y-auto font-semibold text-text-high-em md:text-xl">
              {market.data.title}
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
                ${collateralAmountUSDSpent?.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <p className="text-sm font-semibold text-text-med-em">
                {outcomeAmountString}:
              </p>
              <div className="flex items-center space-x-1 text-sm font-semibold text-text-high-em">
                {!market.isClosed || isWinner ? (
                  <>
                    <p>{balance}</p>
                    <TokenLogo address={market.data.collateralToken} className="size-3" />
                  </>
                ) : (
                  '$' + collateralAmountUSDSpent?.toFixed(2)
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
          {canClaim && (
            <>
              <Button size="sm" colorScheme="success" variant="pastel" onClick={redeem}>
                Reedem
              </Button>
              <TransactionModal isLoading={isTxLoading} txHash={txHash} />
            </>
          )}
        </div>
      </section>
    </Card>
  );
};

export const LoadingCardBet = () => (
  <Card className="flex h-[194px] flex-col justify-between p-4 md:w-[760px]">
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 animate-pulse rounded-8 bg-outline-low-em"></div>
        <div className="h-8 w-32 animate-pulse rounded-8 bg-outline-low-em"></div>
      </div>{' '}
      <div className="h-20 animate-pulse rounded-8 bg-outline-low-em"></div>
    </div>
    <div className="flex items-center justify-between">
      <div className="h-6 w-48 animate-pulse rounded-8 bg-outline-low-em"></div>
      <div className="h-6 w-20 animate-pulse rounded-8 bg-outline-low-em"></div>
    </div>
  </Card>
);
