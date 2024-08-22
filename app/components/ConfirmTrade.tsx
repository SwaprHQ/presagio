import { ModalId, useModal } from '@/context/ModalContext';
import {
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  Icon,
} from '@swapr/ui';
import { SLIPPAGE, SwapDirection, SwapState } from '.';
import MarketABI from '@/abi/market.json';
import {
  CONDITIONAL_TOKEN_CONTRACT_ADDRESS,
  useReadCalcSellAmount,
} from '@/hooks/contracts';
import ConditionalTokensABI from '@/abi/conditionalTokens.json';
import { addFraction, removeFraction } from '@/utils/price';
import { Abi, Address, erc20Abi, formatEther, parseEther } from 'viem';
import { useTx } from '@/context';
import { Token } from '@/entities';
import { formatEtherWithFixedDecimals } from '@/utils';

const ROUNDING_PRECISON = 0.00000000001;

interface ConfirmTradeProps {
  swapState: SwapState;
  marketId: Address;
  onApprove: Function;
  onSwap: Function;
  outcomeIndex: number;
  swapDirection: SwapDirection;
  tokenAmountIn: string;
  tokenAmountOut?: bigint;
}

export const ConfirmTrade = ({
  swapState,
  marketId,
  onApprove,
  onSwap,
  outcomeIndex,
  swapDirection,
  tokenAmountIn,
  tokenAmountOut,
}: ConfirmTradeProps) => {
  const { isModalOpen, closeModal } = useModal();
  const { submitTx } = useTx();

  const { data: sellAmount } = useReadCalcSellAmount(
    marketId,
    formatEther(tokenAmountOut || BigInt(0)),
    outcomeIndex
  );

  const closeBetModal = () => {
    closeModal(ModalId.CONFIRM_SWAP);
  };

  const amountWei = parseEther(tokenAmountIn);
  const formattedTokenAmountIn = tokenAmountIn ? tokenAmountIn : '';
  const formattedTokenAmountOut = tokenAmountOut
    ? formatEtherWithFixedDecimals(tokenAmountOut)
    : '';

  const approveToken = async () => {
    const inToken = swapState.inToken as Token;
    submitTx({
      abi: erc20Abi,
      address: inToken.address,
      functionName: 'approve',
      args: [marketId, amountWei],
    }).then(() => {
      onApprove();
    });
  };

  const approveNFT = async () => {
    submitTx({
      abi: ConditionalTokensABI as Abi,
      address: CONDITIONAL_TOKEN_CONTRACT_ADDRESS,
      functionName: 'setApprovalForAll',
      args: [marketId, true],
    }).then(() => {
      onApprove();
    });
  };

  const submitBuyBet = async () => {
    submitTx({
      abi: MarketABI as Abi,
      address: marketId,
      functionName: 'buy',
      args: [amountWei, outcomeIndex, tokenAmountOut],
    }).then(() => {
      closeBetModal();
      onSwap();
    });
  };

  const submitSellBet = async () => {
    if (!tokenAmountOut || !sellAmount) return;

    const roundedAmountOut = removeFraction(tokenAmountOut, ROUNDING_PRECISON);
    const maxSellAmount = addFraction(sellAmount as bigint, SLIPPAGE);

    submitTx({
      abi: MarketABI as Abi,
      address: marketId,
      functionName: 'sell',
      args: [roundedAmountOut, outcomeIndex, maxSellAmount],
    }).then(() => {
      closeBetModal();
      onSwap();
    });
  };

  const confirmState = {
    [SwapDirection.BUY]: { submit: submitBuyBet, approve: approveToken },
    [SwapDirection.SELL]: { submit: submitSellBet, approve: approveNFT },
  };

  const currentConfirmState = confirmState[swapDirection];

  return (
    <Dialog open={isModalOpen(ModalId.CONFIRM_SWAP)} onOpenChange={closeBetModal}>
      <DialogContent>
        <DialogHeader size="xl" className="text-center">
          <DialogClose position="left" size="xl">
            <Button variant="ghost">
              <Icon name="arrow-left" />
            </Button>
          </DialogClose>
          Confirm Swap
        </DialogHeader>
        <DialogBody className="space-y-2 px-2">
          <div className="relative rounded-16 bg-surface-surface-1">
            <div className="flex w-full flex-col items-center space-y-1 border-b-[1px] border-b-outline-base-em pb-8 pt-3">
              <p className="text-xs uppercase text-text-low-em">You sell</p>
              <div className="text-2xl uppercase">
                <span>{formattedTokenAmountIn}</span>{' '}
                <span className="text-text-low-em">{swapState.inToken.symbol}</span>
              </div>
            </div>
            <div className="absolute left-[calc(50%_-_28px)] top-[calc(50%_-_20px)] flex h-[40px] w-[56px] items-center justify-center rounded-100 bg-surface-surface-3">
              <Icon name="arrow-down" />
            </div>
            <div className="flex w-full flex-col items-center space-y-1 pb-3 pt-8">
              <p className="text-xs uppercase text-text-low-em">You buy</p>
              <div className="text-2xl uppercase">
                <span>{formattedTokenAmountOut}</span>{' '}
                <span className="text-text-low-em">{swapState.outToken.symbol}</span>
              </div>
            </div>
          </div>
          <div className="rounded-12 border border-outline-base-em">
            <div className="px-3 py-1">
              <div className="flex items-center justify-between">
                <p className="text-text-low-em">Price</p>
                <div className="flex items-center space-x-1">
                  <p>1 {swapState.inToken.symbol}</p>
                  <p>=</p>
                  <p className="text-text-success-em">
                    {swapState.tokenPrice} {swapState.outToken.symbol}
                  </p>
                  <p className="text-text-low-em">(≈ $1)</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-text-low-em">Slippage</p>
                <p>{SLIPPAGE * 100}%</p>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          {!swapState.isAllowed && (
            <Button
              width="full"
              colorScheme="success"
              variant="pastel"
              onClick={currentConfirmState.approve}
              size="lg"
            >
              Approve
            </Button>
          )}
          <Button
            width="full"
            colorScheme="success"
            variant="pastel"
            onClick={currentConfirmState.submit}
            disabled={!swapState.isAllowed}
            size="lg"
          >
            Confirm Swap
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
