import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { formatEther } from 'viem';
import { cx } from 'class-variance-authority';
import { waitForTransactionReceipt } from 'wagmi/actions';
import { Market, Token, valueByTrade } from '@/entities';
import { useState } from 'react';
import { Button, Icon, Tag } from '@swapr/ui';
import { ChainId } from '@/constants';
import { TransactionModal } from '.';
import { ModalId, useModal } from '@/context/ModalContext';
import { config } from '@/providers/config';
import { redeemPositions, useReadBalance } from '@/hooks/contracts';
import { getCondition } from '@/queries/conditional-tokens';
import { FixedProductMarketMaker, getMarketUserTrades } from '@/queries/omen';
import { useReadToken } from '@/hooks/contracts/erc20';
import { TokenLogo } from '.';

interface UserBets {
  market: FixedProductMarketMaker;
}

export const UserBets = ({ market }: UserBets) => {
  const conditionId = market.condition?.id;

  const { address } = useAccount();
  const { openModal } = useModal();

  const [txHash, setTxHash] = useState('');
  const [isTxLoading, setIsTxLoading] = useState(false);

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
    queryKey: ['getMarketUserTrades', address, market.id, ['0', '1']],
    queryFn: async () => {
      if (!!address)
        return getMarketUserTrades({
          creator: address.toLowerCase(),
          fpmm: market.id,
          outcomeIndex_in: ['0', '1'],
        });
    },
    enabled: !!address,
  });

  const [outcome0UserTrades, outcome1UserTrades] = [
    userTrades?.fpmmTrades.filter(trade => trade.outcomeIndex === '0') || [],
    userTrades?.fpmmTrades.filter(trade => trade.outcomeIndex === '1') || [],
  ];

  const outcome0CollateralAmountUSDSpent = outcome0UserTrades.reduce((acc, trade) => {
    const type = trade.type;
    const collateralAmountUSD = parseFloat(trade.collateralAmountUSD);
    return valueByTrade[type](acc, collateralAmountUSD);
  }, 0);

  const outcome1CollateralAmountUSDSpent = outcome1UserTrades.reduce((acc, trade) => {
    const type = trade.type;
    const collateralAmountUSD = parseFloat(trade.collateralAmountUSD);
    return valueByTrade[type](acc, collateralAmountUSD);
  }, 0);

  const outcomesCollateralAmountUSDSpent = [
    outcome0CollateralAmountUSDSpent,
    outcome1CollateralAmountUSDSpent,
  ];

  const outcome0TradedBalance = outcome0UserTrades.reduce((acc, trade) => {
    const type = trade.type;
    const collateralAmountUSD = parseFloat(
      formatEther(trade.outcomeTokensTraded as bigint)
    );
    return valueByTrade[type](acc, collateralAmountUSD);
  }, 0);

  const outcome1TradedBalance = outcome1UserTrades.reduce((acc, trade) => {
    const type = trade.type;
    const collateralAmountUSD = parseFloat(
      formatEther(trade.outcomeTokensTraded as bigint)
    );
    return valueByTrade[type](acc, collateralAmountUSD);
  }, 0);

  const outcomesTradedBalance = [outcome0TradedBalance, outcome1TradedBalance];

  const { data: outcome0Balance, isLoading: isOutcome0BalanceLoading } = useReadBalance(
    address,
    market.collateralToken,
    market.condition?.id,
    1
  );

  const { data: outcome1Balance, isLoading: isOutcome1BalanceLoading } = useReadBalance(
    address,
    market.collateralToken,
    market.condition?.id,
    2
  );

  const outcomesBalance = [outcome0Balance as bigint, outcome1Balance as bigint];

  const { name, symbol, decimals } = useReadToken({
    tokenAddress: market.collateralToken,
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
    market.collateralToken,
    decimals,
    symbol,
    name
  );

  const marketModel = new Market(market);

  const { condition } = conditionData;
  const isResolved = condition.resolved;
  const hasPayoutDenominator = +condition.payoutDenominator > 0;

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
          const canClaim = isWinner && isResolved && hasPayoutDenominator;

          const alreadyClaimed = canClaim && outcomesBalance[index] === BigInt(0);

          const collateralSpent = outcomesCollateralAmountUSDSpent[index].toFixed(2);
          const tradedBalance = outcomesTradedBalance[index].toFixed(2);

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
                <div className="flex space-x-2 divide-x-2 divide-outline-base-em px-4">
                  <Tag
                    className="w-fit uppercase"
                    size="sm"
                    colorScheme={index === 0 ? 'success' : 'danger'}
                  >
                    {outcome.symbol}
                  </Tag>
                  <div className="flex h-8 w-full items-center justify-between pl-2">
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
                {canClaim && !alreadyClaimed && (
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
