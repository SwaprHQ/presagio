'use client';

import {
  TokenLogo,
  SwapInput,
  successApprovalTxToast,
  TxButton,
  waitingTxToast,
} from '@/app/components';
import { useQuery } from '@tanstack/react-query';
import { Query } from '@/queries/omen';
import {
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
  ToggleGroup,
  ToggleGroupOption,
  VisuallyHidden,
  errorToast,
} from '@swapr/ui';
import { Abi, Address, erc20Abi, formatEther, parseEther } from 'viem';
import { Market, Token } from '@/entities';
import { useState } from 'react';
import { ModalId, useModal, useTx } from '@/context';
import { formatEtherWithFixedDecimals } from '@/utils';
import {
  calcAddFundingOutcomeTokensReturned,
  calcRemoveFundingSendAmounts,
  calcTokensToReceiveAfterAddFunding,
} from '@/utils/liquidity';
import { useAccount, useConfig, useReadContract, useWriteContract } from 'wagmi';
import { MarketABI } from '@/abi';
import {
  useReadAllowance,
  useReadBalanceOf,
  useReadToken,
} from '@/hooks/contracts/erc20';
import {
  waitForTransactionReceipt,
  WaitForTransactionReceiptErrorType,
  WriteContractErrorType,
} from 'wagmi/actions';
import { ChainId } from '@/constants';
import { cx } from 'class-variance-authority';

enum LiquidityOperation {
  ADD = 'add',
  REMOVE = 'remove',
}

export const Liquidity = ({ id }: { id: Address }) => {
  const [amount, setAmount] = useState('');
  const [liquidityOperation, setLiquidityOperation] = useState(LiquidityOperation.ADD);
  const [isApproving, setIsApproving] = useState(false);
  const amountWei = parseFloat(amount) > 0 ? parseEther(amount) : BigInt(0);
  const { isModalOpen, closeModal, openModal } = useModal();
  const { address } = useAccount();
  const { data } = useQuery<Pick<Query, 'fixedProductMarketMaker'>>({
    queryKey: ['getMarket', id],
  });
  const { submitTx } = useTx();
  const config = useConfig();

  const { data: totalSupply } = useReadContract({
    abi: MarketABI,
    address: id,
    functionName: 'totalSupply',
  });

  const { data: fundingBalance, refetch: refetchFundingBalance } = useReadBalanceOf({
    tokenAddress: id,
    address,
  });

  const tokenAddress = data?.fixedProductMarketMaker?.collateralToken;

  const { symbol, decimals, name } = useReadToken({
    tokenAddress,
  });

  const { data: balance, refetch: refetchCollateralBalance } = useReadBalanceOf({
    tokenAddress,
    address,
  });
  const { data: allowance, refetch: refetchCollateralAllowence } = useReadAllowance({
    address,
    tokenAddress,
    spenderAddress: id,
  });

  const { writeContractAsync } = useWriteContract();

  if (
    !data?.fixedProductMarketMaker ||
    totalSupply === undefined ||
    !symbol ||
    !decimals ||
    !name
  )
    return;

  const fixedProductMarketMaker = data.fixedProductMarketMaker;
  const marketModel = new Market(fixedProductMarketMaker);

  const sharesToReceive =
    parseFloat(amount) > 0
      ? formatEtherWithFixedDecimals(
          calcTokensToReceiveAfterAddFunding(
            amountWei,
            fixedProductMarketMaker.outcomeTokenAmounts.map(amount => BigInt(amount)),
            totalSupply as bigint
          ),
          2
        )
      : null;

  const outcomeTokensToReceive =
    parseFloat(amount) > 0
      ? calcAddFundingOutcomeTokensReturned(
          amountWei,
          fixedProductMarketMaker.outcomeTokenAmounts.map(amount => BigInt(amount)),
          totalSupply as bigint
        )
      : [];

  const collateralToReceive =
    parseFloat(amount) > 0
      ? calcRemoveFundingSendAmounts(
          amountWei,
          fixedProductMarketMaker.outcomeTokenAmounts.map(amount => BigInt(amount)),
          totalSupply as bigint
        ).map(value => formatEtherWithFixedDecimals(value, 2))
      : null;

  const approveTxErrorHandling = (e: Error) => {
    const error = e as WriteContractErrorType | WaitForTransactionReceiptErrorType;
    const errorMessage =
      error.cause?.toString().split('\n').at(0) ||
      'Error found on approve transaction submission.';

    errorToast({
      children: <div className="font-normal">{errorMessage}</div>,
    });

    setIsApproving(false);
  };

  const removeFunding = () => {
    submitTx({
      abi: MarketABI as Abi,
      address: id,
      functionName: 'removeFunding',
      args: [amountWei],
    }).then(() => {
      refetchFundingBalance();
      closeModal(ModalId.CONFIRM_LIQUIDITY);
    });
  };

  const addFunding = () => {
    submitTx({
      abi: MarketABI as Abi,
      address: id,
      functionName: 'addFunding',
      args: [amountWei, []],
    }).then(() => {
      refetchCollateralBalance();
      refetchFundingBalance();
      closeModal(ModalId.CONFIRM_LIQUIDITY);
    });
  };

  const collateralToken = new Token(
    ChainId.GNOSIS,
    fixedProductMarketMaker.collateralToken,
    decimals,
    symbol,
    name
  );

  const approveToken = () => {
    setIsApproving(true);
    writeContractAsync({
      abi: erc20Abi,
      address: tokenAddress,
      functionName: 'approve',
      args: [id, amountWei],
    })
      .then(async txHash => {
        waitingTxToast(txHash);

        await waitForTransactionReceipt(config, {
          hash: txHash,
        });
        refetchCollateralAllowence();
        successApprovalTxToast(txHash, collateralToken);
      })
      .catch(approveTxErrorHandling)
      .finally(() => setIsApproving(false));
  };

  const outcomeTokenToReceive =
    outcomeTokensToReceive?.reduce(
      (acc, cur, i) => (cur > acc.value ? { value: cur, index: i } : acc),
      { value: outcomeTokensToReceive[0], index: 0 }
    ) || null;

  const maxBalance = () => {
    balance && setAmount(formatEther(balance as bigint));
  };

  const maxFundingBalance = () => {
    fundingBalance && setAmount(formatEther(fundingBalance as bigint));
  };

  const defaultRemoveLiquidityOutAmount = marketModel.outcomes
    .filter(outcome => outcome.index >= 0)
    .map(() => '-');

  const liquidityOperationState = {
    [LiquidityOperation.ADD]: {
      title: 'Add Liquidity',
      inTitle: 'You Add',
      outTitle: 'Shares To Receive',
      balance: (balance as bigint) || BigInt(0),
      inToken: collateralToken,
      outToken: null,
      setMaxBalance: maxBalance,
      outAmount: sharesToReceive ? [sharesToReceive] : [],
      isAllowed: allowance && BigInt(allowance) >= amountWei,
      action: addFunding,
      actionTitle: 'Add liquidity',
    },
    [LiquidityOperation.REMOVE]: {
      title: 'Remove Liquidity',
      inTitle: 'You Remove',
      outTitle: 'Token To Receive',
      balance: (fundingBalance as bigint) || BigInt(0),
      inToken: null,
      outToken: collateralToken,
      setMaxBalance: maxFundingBalance,
      outAmount: collateralToReceive || defaultRemoveLiquidityOutAmount,
      isAllowed: true,
      action: removeFunding,
      actionTitle: 'Remove liquidity',
    },
  };

  const activeLiquidityOperationState = liquidityOperationState[liquidityOperation];
  const hasEnoughBalance = +amount <= +formatEther(activeLiquidityOperationState.balance);
  const isButtonDisabled = !amount || !hasEnoughBalance;

  const getButtonLabel = () => {
    const tokenSymbolText =
      liquidityOperation === LiquidityOperation.ADD
        ? liquidityOperationState[liquidityOperation].inToken.symbol ?? 'pool tokens'
        : 'pool tokens';

    if (!amount) return 'Enter amount';
    if (!hasEnoughBalance) return `Insufficient ${tokenSymbolText} balance`;

    return activeLiquidityOperationState.actionTitle;
  };

  return (
    <div className="space-y-4 py-2">
      <ToggleGroup
        value={liquidityOperation}
        onChange={(value: LiquidityOperation) => {
          setLiquidityOperation(value);
          setAmount('');
        }}
        className="justify-around"
      >
        {Object.values(LiquidityOperation).map(tab => (
          <div key={tab}>
            <ToggleGroupOption
              size="xs"
              value={tab}
              className="flex justify-center font-medium capitalize"
            >
              {tab}
            </ToggleGroupOption>
          </div>
        ))}
      </ToggleGroup>
      <div className="flex flex-col space-y-2">
        <SwapInput
          title={activeLiquidityOperationState.inTitle}
          value={amount}
          onChange={event => {
            setAmount(event.target.value);
          }}
          selectedToken={activeLiquidityOperationState.inToken}
          tokenList={[]}
        >
          <div className="flex min-h-8 items-center justify-end space-x-1.5 text-sm">
            <p className="text-text-low-em">
              Balance:{' '}
              <span className="font-mono">
                {formatEtherWithFixedDecimals(activeLiquidityOperationState.balance)}
              </span>
            </p>
            {!!balance && (
              <Button
                variant="ghost"
                size="xs"
                className="font-medium text-text-primary-high-em"
                onClick={activeLiquidityOperationState.setMaxBalance}
              >
                Max
              </Button>
            )}
          </div>
        </SwapInput>
      </div>
      <TokensToReceiveTable
        liquidityOperation={liquidityOperation}
        outAmount={activeLiquidityOperationState.outAmount}
        outcomeTokenToReceive={outcomeTokenToReceive}
        market={marketModel}
      />
      <TxButton
        disabled={isButtonDisabled}
        onClick={() => openModal(ModalId.CONFIRM_LIQUIDITY)}
      >
        {getButtonLabel()}
      </TxButton>

      <Dialog
        open={isModalOpen(ModalId.CONFIRM_LIQUIDITY)}
        onOpenChange={() => closeModal(ModalId.CONFIRM_LIQUIDITY)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogClose name="arrow-left" />
            <DialogTitle>Confirm liquidity</DialogTitle>
            <VisuallyHidden asChild>
              <DialogDescription />
            </VisuallyHidden>
          </DialogHeader>
          <DialogBody className="space-y-2">
            <div className="flex flex-col items-center space-y-1 rounded-16 bg-surface-surface-2 py-4">
              <p className="text-sm font-medium uppercase text-text-low-em">
                Total deposit
              </p>
              {activeLiquidityOperationState.inToken ? (
                <div>
                  <div className="font- flex items-center space-x-2">
                    <p className="text-2xl">{amount}</p>
                    <TokenLogo
                      address={activeLiquidityOperationState.inToken.address}
                      size="xs"
                    />
                  </div>
                  <p className="text-center text-text-med-em">
                    {activeLiquidityOperationState.inToken.symbol}
                  </p>
                </div>
              ) : (
                <p className="font-medium">
                  {amount} <span className="text-text-low-em">Pool tokens</span>
                </p>
              )}
            </div>
            <TokensToReceiveTable
              liquidityOperation={liquidityOperation}
              outAmount={activeLiquidityOperationState.outAmount}
              outcomeTokenToReceive={outcomeTokenToReceive}
              market={marketModel}
            />
          </DialogBody>
          <DialogFooter>
            {!activeLiquidityOperationState.isAllowed && (
              <Button
                width="full"
                colorScheme="success"
                variant="secondary"
                onClick={approveToken}
                size="lg"
                disabled={isApproving}
              >
                {isApproving ? (
                  <div className="flex items-center space-x-2">
                    <p>Approving</p>{' '}
                    <Icon size={20} name="spinner" className="animate-spin" />
                  </div>
                ) : (
                  'Approve'
                )}
              </Button>
            )}
            <Button
              width="full"
              onClick={activeLiquidityOperationState.action}
              disabled={!activeLiquidityOperationState.isAllowed}
              size="lg"
            >
              {activeLiquidityOperationState.actionTitle}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const TokensToReceiveTable = ({
  liquidityOperation,
  outAmount,
  outcomeTokenToReceive,
  market,
}: {
  liquidityOperation: LiquidityOperation;
  outAmount: string[];
  outcomeTokenToReceive: { value: bigint; index: number } | null;
  market: Market;
}) => {
  return (
    <div className="divide-y divide-outline-base-em rounded-16 border border-outline-base-em">
      <div className="flex justify-between px-4 py-3 text-sm text-text-low-em">
        <p>You receive</p>
        <p>Shares</p>
      </div>
      {liquidityOperation === LiquidityOperation.ADD ? (
        <>
          <div className="flex justify-between px-4 py-3">
            <p>Pool tokens</p>
            <p>{outAmount[0] || '-'}</p>
          </div>
          {outcomeTokenToReceive && outcomeTokenToReceive.value && (
            <div className="flex justify-between px-4 py-3">
              <p
                className={cx('uppercase', {
                  'text-text-success-high-em': outcomeTokenToReceive.index === 0,
                  'text-text-danger-high-em': outcomeTokenToReceive.index === 1,
                })}
              >
                {market.outcomes[outcomeTokenToReceive.index].name}
              </p>
              <p>{formatEtherWithFixedDecimals(outcomeTokenToReceive.value, 2)}</p>
            </div>
          )}
        </>
      ) : (
        outAmount.map((balance, index) => (
          <div className="flex justify-between px-4 py-3" key={index}>
            <p
              className={cx('uppercase', {
                'text-text-success-high-em': index === 0,
                'text-text-danger-high-em': index === 1,
              })}
            >
              {market.outcomes[index].name}
            </p>
            <p>{balance}</p>
          </div>
        ))
      )}
    </div>
  );
};
