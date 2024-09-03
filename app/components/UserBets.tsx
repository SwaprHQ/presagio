'use client';

import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { cx } from 'class-variance-authority';
import { waitForTransactionReceipt } from 'wagmi/actions';
import {
  getOutcomeUserTrades,
  Market,
  MarketCondition,
  Token,
  tradesCollateralAmountUSDSpent,
  tradesOutcomeBalance,
} from '@/entities';
import { useState } from 'react';
import { Button, Icon, Tag } from '@swapr/ui';
import { ChainId } from '@/constants';
import { TransactionModal } from '.';
import { ModalId, useModal } from '@/context/ModalContext';
import { config } from '@/providers/chain-config';
import { redeemPositions, useReadBalance } from '@/hooks/contracts';
import { getCondition } from '@/queries/conditional-tokens';
import { FixedProductMarketMaker, getMarketUserTrades } from '@/queries/omen';
import { useReadToken } from '@/hooks/contracts/erc20';
import { TokenLogo } from '.';
import { formatValueWithFixedDecimals } from '@/utils';

interface UserBets {
  fixedProductMarketMaker: FixedProductMarketMaker;
}

export const UserBets = ({ fixedProductMarketMaker }: UserBets) => {
  const [txHash, setTxHash] = useState('');
  const [isTxLoading, setIsTxLoading] = useState(false);
  const { address } = useAccount();
  const { openModal } = useModal();

  const conditionId = fixedProductMarketMaker.condition?.id;
  const { data: conditionData, isLoading: isConditionLoading } = useQuery({
    queryKey: ['getCondition', conditionId],
    queryFn: async () => {
      if (!!conditionId)
        return getCondition({
          id: conditionId,
        });
    },
    enabled: !!conditionId,
  });

  const { data: userTrades, isLoading: isUserTradesLoading } = useQuery({
    queryKey: ['getMarketUserTrades', address, fixedProductMarketMaker.id, ['0', '1']],
    queryFn: async () => {
      if (!!address)
        return getMarketUserTrades({
          creator: address.toLowerCase(),
          fpmm: fixedProductMarketMaker.id,
          outcomeIndex_in: ['0', '1'],
        });
    },
    enabled: !!address,
  });

  const [outcome0UserTrades, outcome1UserTrades] = getOutcomeUserTrades({
    fpmmTrades: userTrades?.fpmmTrades,
  });
  const outcome0CollateralAmountUSDSpent = tradesCollateralAmountUSDSpent({
    fpmmTrades: outcome0UserTrades,
  });
  const outcome1CollateralAmountUSDSpent = tradesCollateralAmountUSDSpent({
    fpmmTrades: outcome1UserTrades,
  });

  const outcomesCollateralAmountUSDSpent = [
    outcome0CollateralAmountUSDSpent,
    outcome1CollateralAmountUSDSpent,
  ];

  const outcome0TradedBalance = tradesOutcomeBalance({ fpmmTrades: outcome0UserTrades });
  const outcome1TradedBalance = tradesOutcomeBalance({ fpmmTrades: outcome1UserTrades });
  const outcomesTradedBalance = [outcome0TradedBalance, outcome1TradedBalance];

  const { data: outcome0Balance, isLoading: isOutcome0BalanceLoading } = useReadBalance(
    address,
    fixedProductMarketMaker.collateralToken,
    fixedProductMarketMaker.condition?.id,
    1
  );

  const { data: outcome1Balance, isLoading: isOutcome1BalanceLoading } = useReadBalance(
    address,
    fixedProductMarketMaker.collateralToken,
    fixedProductMarketMaker.condition?.id,
    2
  );

  const outcomesBalance = [outcome0Balance as bigint, outcome1Balance as bigint];

  const { name, symbol, decimals } = useReadToken({
    tokenAddress: fixedProductMarketMaker.collateralToken,
  });

  if (
    !address ||
    isUserTradesLoading ||
    isOutcome0BalanceLoading ||
    isOutcome1BalanceLoading ||
    isConditionLoading ||
    !conditionData?.condition ||
    !name ||
    !symbol ||
    !decimals
  )
    return null;

  const collateralToken = new Token(
    ChainId.GNOSIS,
    fixedProductMarketMaker.collateralToken,
    decimals,
    symbol,
    name
  );

  const marketModel = new Market(fixedProductMarketMaker);

  const { condition } = conditionData;
  const isResolved = condition.resolved;

  const redeem = async () => {
    setIsTxLoading(true);

    try {
      const txHash = await redeemPositions({
        conditionId: condition.id,
        outcomeIndex: 1,
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

  const hasBetted =
    outcomesCollateralAmountUSDSpent[0] > 0 || outcomesCollateralAmountUSDSpent[1] > 0;

  if (!hasBetted) return null;

  return (
    <div className="space-y-2">
      <p className="text-text-low-em">You betted on: </p>
      <div className="space-y-3">
        {marketModel.outcomes.map((outcome, index) => {
          if (!outcomesCollateralAmountUSDSpent[index]) return null;

          const isWinner = marketModel.isWinner(index);

          const marketCondition = new MarketCondition(fixedProductMarketMaker, condition);
          const canClaim = marketCondition.canClaim(index);
          const alreadyClaimed = marketCondition.alreadyClaimed(
            index,
            outcomesBalance[index]
          );
          const canRedeem = marketCondition.canRedeem(index, outcomesBalance[index]);

          const collateralSpent = formatValueWithFixedDecimals(
            outcomesCollateralAmountUSDSpent[index],
            4
          );
          const tradedBalance = formatValueWithFixedDecimals(
            outcomesTradedBalance[index],
            4
          );

          const resultString = alreadyClaimed
            ? 'You claimed:'
            : canClaim
              ? 'You won:'
              : isResolved
                ? 'You lost:'
                : 'You can win:';

          return (
            <div className="flex space-x-4" key={index}>
              <div
                className={cx(
                  'w-full max-w-[464px] space-y-4 divide-y-2 divide-outline-base-em rounded-16 border border-outline-base-em bg-surface-surface-0 py-4 text-center',
                  isWinner &&
                    (index === 0
                      ? 'bg-gradient-to-b from-[#F2f2F2] to-[#d0ffd6] dark:from-[#131313] dark:to-[#11301F]'
                      : 'bg-gradient-to-b from-[#F2f2F2] to-[#f4cbc4] dark:from-[#131313] dark:to-[#301111]')
                )}
              >
                <div className="flex items-center space-x-2 divide-x-2 divide-outline-base-em px-4">
                  <Tag
                    className="w-fit uppercase"
                    size="sm"
                    colorScheme={index === 0 ? 'success' : 'danger'}
                  >
                    {outcome.symbol}
                  </Tag>
                  <div className="flex w-full flex-wrap items-center justify-between py-1 pl-2">
                    <p className="font-semibold">
                      <span className="text-text-low-em">Bet amount: </span>
                      <span>
                        {collateralSpent} {collateralToken.symbol}
                      </span>
                    </p>
                    <div className="font-semibold">
                      <span className="text-text-low-em">{resultString} </span>
                      <div
                        className={cx(
                          'inline-flex items-center',
                          index === 0 ? 'text-text-success-em' : 'text-text-danger-em'
                        )}
                      >
                        <span>
                          {tradedBalance} {collateralToken.symbol}
                        </span>
                        {isResolved && (
                          <Icon name={isWinner ? 'arrow-up' : 'arrow-down'} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {canRedeem && (
                  <>
                    <div className="space-y-4 px-4 pt-4">
                      <p className="px-6 font-semibold text-text-low-em">
                        Congratulations! 🎉 You can now redeem {tradedBalance}{' '}
                        {collateralToken.symbol} from your {collateralSpent} shares of the
                        winning outcome.
                      </p>
                      <Button
                        colorScheme={index === 0 ? 'success' : 'error'}
                        variant="pastel"
                        width="full"
                        size="lg"
                        className="space-x-2"
                        onClick={redeem}
                      >
                        <TokenLogo address={collateralToken.address} size="xs" />
                        <p>
                          Redeem {tradedBalance} {collateralToken.symbol}
                        </p>
                      </Button>
                    </div>
                    <TransactionModal isLoading={isTxLoading} txHash={txHash} />
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
