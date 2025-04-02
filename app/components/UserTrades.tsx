'use client';

import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { cx } from 'class-variance-authority';
import { trackEvent } from 'fathom-client';
import {
  getOutcomeUserTrades,
  Market,
  MarketCondition,
  Token,
  tradesCollateralAmountSpent,
  tradesOutcomeBalance,
  outcomeTokensTradedTotal,
} from '@/entities';
import { Button, Icon, Tag } from '@swapr/ui';
import { ChainId } from '@/constants';
import { redeemPositions, useReadBalance } from '@/hooks/contracts';
import { getCondition } from '@/queries/conditional-tokens';
import { FixedProductMarketMaker, getMarketUserTrades } from '@/queries/omen';
import { useReadToken } from '@/hooks/contracts/erc20';
import { TokenLogo } from '.';
import { formatEtherWithFixedDecimals, formatValueWithFixedDecimals } from '@/utils';
import { useTx } from '@/context';
import { FA_EVENTS } from '@/analytics';

interface UserTradesProps {
  fixedProductMarketMaker: FixedProductMarketMaker;
}

export const UserTrades = ({ fixedProductMarketMaker }: UserTradesProps) => {
  const { address } = useAccount();
  const { submitCustomTx } = useTx();

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
  const outcomesCollateralAmountSpent = [
    tradesCollateralAmountSpent({
      fpmmTrades: outcome0UserTrades,
    }),
    tradesCollateralAmountSpent({
      fpmmTrades: outcome1UserTrades,
    }),
  ];

  const outcomesTokensTraded = [
    outcomeTokensTradedTotal({
      fpmmTrades: outcome0UserTrades,
    }),
    outcomeTokensTradedTotal({
      fpmmTrades: outcome1UserTrades,
    }),
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
    await submitCustomTx(() =>
      redeemPositions({
        conditionId: condition.id,
        collateralToken: collateralToken.address,
      })
    );
    trackEvent(FA_EVENTS.BETS.REDEEM);
  };

  const hasBetted =
    outcomesCollateralAmountSpent[0] > 0 || outcomesCollateralAmountSpent[1] > 0;

  if (!hasBetted) return null;

  return (
    <div className="space-y-2">
      <p className="text-text-low-em">You betted on: </p>
      <div className="space-y-3">
        {marketModel.outcomes.map((outcome, index) => {
          if (!outcomesCollateralAmountSpent[index]) return null;

          const isWinner = marketModel.isWinner(index);

          const marketCondition = new MarketCondition(fixedProductMarketMaker, condition);
          const canClaim = marketCondition.canClaim(index);
          const alreadyClaimed = marketCondition.alreadyClaimed(
            index,
            outcomesBalance[index]
          );
          const canRedeem = marketCondition.canRedeem(index, outcomesBalance[index]);

          const collateralSpent = formatEtherWithFixedDecimals(
            outcomesCollateralAmountSpent[index],
            4
          );
          const tradedBalance = formatValueWithFixedDecimals(
            outcomesTradedBalance[index],
            4
          );

          const getResultString = (): string => {
            if (alreadyClaimed) return 'Claimed';
            if (canClaim && marketModel.isAnswerInvalid) return 'Receive';
            if (canClaim) return 'Won';
            if (isResolved) return 'Lost';

            return 'Can win';
          };

          const resultString = getResultString();

          const invalidMarketColleteralToRedeem =
            marketCondition.getRedeemableColleteralToken(
              outcomesTokensTraded[index],
              index
            );
          const formattedInvalidMarketColleteralToRedeem = formatValueWithFixedDecimals(
            invalidMarketColleteralToRedeem || 0,
            2
          );
          const formattedOutcomesTokensTraded = formatEtherWithFixedDecimals(
            outcomesTokensTraded[index],
            2
          );

          function getResultAmount() {
            if (marketModel.isAnswerInvalid)
              return formattedInvalidMarketColleteralToRedeem;
            if (!canClaim && isResolved) return collateralSpent;

            return tradedBalance;
          }

          const resultAmount = getResultAmount();

          return (
            <div className="flex space-x-4" key={index}>
              <div
                className={cx(
                  'w-full max-w-[464px] space-y-4 divide-y-2 divide-outline-base-em rounded-16 border border-outline-base-em bg-surface-surface-0 py-4 text-center',
                  isWinner &&
                    (index === 0
                      ? 'bg-gradient-to-b from-neutral-inverse-white-alpha-4 to-text-success-base-em'
                      : 'bg-gradient-to-b from-neutral-inverse-white-alpha-4 to-text-danger-base-em')
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
                    <p className="space-x-1 font-medium">
                      <span className="text-text-low-em">Bet amount:</span>
                      <span className="font-mono">{collateralSpent}</span>
                      <span className="text-sm">{collateralToken.symbol}</span>
                    </p>
                    <div className="space-x-1 font-medium">
                      <span className="text-text-low-em">{resultString}: </span>
                      <div
                        className={cx(
                          'inline-flex items-center space-x-1',
                          index === 0
                            ? 'text-text-success-high-em'
                            : 'text-text-danger-high-em'
                        )}
                      >
                        <span className="font-mono">{resultAmount}</span>
                        <span className="text-sm">{collateralToken.symbol}</span>
                        {!marketModel.isAnswerInvalid && isResolved && (
                          <Icon name={isWinner ? 'arrow-up' : 'arrow-down'} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {!marketModel.isAnswerInvalid && canRedeem && (
                  <div className="space-y-4 px-4 pt-4">
                    <p className="px-6 font-semibold text-text-low-em">
                      Congratulations! 🎉 You can now redeem{' '}
                      <span className="font-mono">{tradedBalance}</span>{' '}
                      {collateralToken.symbol} from your{' '}
                      <span className="font-mono">{formattedOutcomesTokensTraded}</span>{' '}
                      shares of the winning outcome.
                    </p>
                    <Button
                      colorScheme={index === 0 ? 'success' : 'danger'}
                      variant="light"
                      width="full"
                      className="space-x-2"
                      onClick={redeem}
                    >
                      <p>
                        Redeem {tradedBalance} {collateralToken.symbol}
                      </p>
                      <TokenLogo
                        address={collateralToken.address}
                        size="xs"
                        className="size-4"
                      />
                    </Button>
                  </div>
                )}
                {marketModel.isAnswerInvalid && canRedeem && (
                  <div className="space-y-4 px-4 pt-4">
                    <p className="px-6 font-semibold text-text-low-em">
                      Since market is invalid, you can now redeem{' '}
                      <span className="font-mono">
                        {formattedInvalidMarketColleteralToRedeem}
                      </span>{' '}
                      <span className="text-sm">{collateralToken.symbol}</span> from your{' '}
                      <span className="font-mono">{formattedOutcomesTokensTraded}</span>{' '}
                      shares.
                    </p>
                    <Button
                      variant="light"
                      width="full"
                      className="space-x-2"
                      onClick={redeem}
                    >
                      <p>
                        Redeem{' '}
                        <span className="font-mono">
                          {formattedInvalidMarketColleteralToRedeem}
                        </span>
                        <span className="text-sm"> {collateralToken.symbol}</span>
                      </p>
                      <TokenLogo
                        address={collateralToken.address}
                        size="xs"
                        className="size-4"
                      />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
