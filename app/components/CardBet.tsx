'use client';

import { useQuery } from '@tanstack/react-query';
import { cx } from 'class-variance-authority';
import Link from 'next/link';
import { useAccount, useConfig } from 'wagmi';

import { Button, Logo, Tag } from '@swapr/ui';
import { Card } from '@/app/components/ui';

import { UserPosition } from '@/queries/conditional-tokens/types';
import { getConditionMarket, getMarketUserTrades } from '@/queries/omen';
import { remainingTime } from '@/utils/dates';
import {
  Market,
  Position,
  tradesCollateralAmountUSDSpent,
  tradesOutcomeBalance,
} from '@/entities';
import { redeemPositions } from '@/hooks/contracts';
import { WXDAI } from '@/constants';
import { waitForTransactionReceipt } from 'wagmi/actions';
import { useState } from 'react';
import { ModalId, useModal } from '@/context/ModalContext';
import { TransactionModal } from './TransactionModal';
import { XDAI_LOGO } from '@/public/assets';
import { MarketThumbnail } from './MarketThumbnail';

interface BetProps {
  userPosition: UserPosition;
}

export const CardBet = ({ userPosition }: BetProps) => {
  const position = new Position(userPosition.position);
  const outcomeIndex = position.outcomeIndex - 1;

  const config = useConfig();
  const { address } = useAccount();
  const [txHash, setTxHash] = useState('');
  const [isTxLoading, setIsTxLoading] = useState(false);
  const { openModal } = useModal();

  const { data, isLoading } = useQuery({
    queryKey: ['getConditionMarket', position.conditionId],
    queryFn: async () =>
      getConditionMarket({
        id: position.conditionId,
      }),
    enabled: !!position.conditionId,
  });

  const market =
    data?.conditions[0] && new Market(data?.conditions[0]?.fixedProductMarketMakers[0]);

  const { data: userTrades, isLoading: isUserTradesLoading } = useQuery({
    queryKey: ['getMarketUserTrades', address, market?.data.id, outcomeIndex],
    queryFn: async () => {
      if (!!address && !!market)
        return getMarketUserTrades({
          creator: address.toLowerCase(),
          fpmm: market.data.id,
          outcomeIndex_in: [outcomeIndex],
        });
    },
    enabled: !!market?.data?.id,
  });

  const collateralAmountUSDSpent = tradesCollateralAmountUSDSpent({
    fpmmTrades: userTrades?.fpmmTrades,
  });

  const outcomeBalance = tradesOutcomeBalance({
    fpmmTrades: userTrades?.fpmmTrades,
  });

  const balance = outcomeBalance ? outcomeBalance.toFixed(2) : '-';

  if (isLoading || isUserTradesLoading) return <LoadingCardBet />;

  // emptyState
  if (!market) return;

  const isWinner = market.isWinner(outcomeIndex);
  const isLoser = market.isLoser(outcomeIndex);

  const outcomeAmountString = market.isClosed
    ? isWinner
      ? 'You won'
      : 'You lost'
    : 'Potential win';

  const condition = userPosition.position.conditions[0];

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
      <section className="flex h-[56px] items-center border-t border-outline-base-em px-4 md:h-[48px]">
        <div className="flex w-full items-center justify-between space-x-4">
          <div className="flex flex-col items-start space-y-0.5 md:flex-row md:items-center md:space-x-2">
            <div className="flex items-center space-x-1">
              <p className="text-sm font-semibold text-text-med-em">Bet amount:</p>
              <p className="text-sm font-semibold text-text-high-em">
                {collateralAmountUSDSpent?.toFixed(2)} {WXDAI.symbol}
              </p>
              <Logo src={XDAI_LOGO.src} alt="token logo" className="size-3" />
            </div>
            <div className="flex items-center space-x-1">
              <p className="text-sm font-semibold text-text-med-em">
                {outcomeAmountString}:
              </p>
              <p className="text-sm font-semibold text-text-high-em">
                {!market.isClosed || isWinner
                  ? balance
                  : collateralAmountUSDSpent?.toFixed(2)}{' '}
                {WXDAI.symbol}
              </p>
              <Logo src={XDAI_LOGO.src} alt="token logo" className="size-3" />
            </div>
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
