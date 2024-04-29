import { ModalId, useModalContext } from "@/context/ModalContext";
import {
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  Icon,
  IconBadge,
} from "swapr-ui";
import Image from "next/image";
import { SLIPPAGE, SwapDirection, SwapState } from ".";
import { useState } from "react";
import { waitForTransactionReceipt, writeContract } from "wagmi/actions";
import MarketABI from "@/abi/market.json";
import { CONDITIONAL_TOKEN_CONTRACT_ADDRESS } from "@/model/conditionalTokens";
import ConditionalTokensABI from "@/abi/conditionalTokens.json";
import { addFraction, removeFraction } from "@/utils/price";
import { useConfig } from "wagmi";
import { Address, erc20Abi, formatEther, parseEther } from "viem";
import { useReadCalcSellAmount } from "@/model/market";
import { WXDAI } from "@/constants";

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
  const config = useConfig();
  const { isModalOpen, openModal, closeModal } = useModalContext();
  const [txHash, setTxHash] = useState("");
  const [isTxLoading, setIsTxLoading] = useState(false);
  const { data: sellAmount } = useReadCalcSellAmount(
    marketId,
    formatEther(tokenAmountOut || BigInt(0)),
    outcomeIndex
  );

  const closeBetModal = () => {
    closeModal(ModalId.CONFIRM_SWAP);
  };

  const closeTxModal = () => {
    closeModal(ModalId.WAITING_TRANSACTION);
  };
  const openTxModal = () => {
    openModal(ModalId.WAITING_TRANSACTION);
  };

  const amountWei = parseEther(tokenAmountIn);
  const twoDecimalsTokenAmountIn = tokenAmountIn
    ? parseFloat(tokenAmountIn).toFixed(2)
    : "";
  const twoDecimalsTokenAmountOut = tokenAmountOut
    ? parseFloat(formatEther(tokenAmountOut)).toFixed(2)
    : "";

  const approveToken = async () => {
    setIsTxLoading(true);

    try {
      const txHash = await writeContract(config, {
        abi: erc20Abi,
        address: WXDAI.address,
        functionName: "approve",
        args: [marketId, amountWei],
      });
      setTxHash(txHash);
      openTxModal();

      await waitForTransactionReceipt(config, {
        hash: txHash,
      });
      onApprove();
    } catch (error) {
      console.error(error);
    } finally {
      setIsTxLoading(false);
    }
  };

  const approveNFT = async () => {
    setIsTxLoading(true);
    try {
      const txHash = await writeContract(config, {
        abi: ConditionalTokensABI,
        address: CONDITIONAL_TOKEN_CONTRACT_ADDRESS,
        functionName: "setApprovalForAll",
        args: [marketId, true],
      });
      setTxHash(txHash);
      openTxModal();

      await waitForTransactionReceipt(config, {
        hash: txHash,
      });
      onApprove();
    } catch (error) {
      console.error(error);
    } finally {
      setIsTxLoading(false);
    }
  };

  const submitBuyBet = async () => {
    setIsTxLoading(true);
    try {
      const txHash = await writeContract(config, {
        abi: MarketABI,
        address: marketId,
        functionName: "buy",
        args: [amountWei, outcomeIndex, tokenAmountOut],
      });
      setTxHash(txHash);
      closeBetModal();
      openTxModal();

      await waitForTransactionReceipt(config, {
        hash: txHash,
      });
      onSwap();
    } catch (error) {
      console.error(error);
    } finally {
      setIsTxLoading(false);
    }
  };

  const submitSellBet = async () => {
    if (!tokenAmountOut || !sellAmount) return;

    setIsTxLoading(true);
    const roundedAmountOut = removeFraction(tokenAmountOut, ROUNDING_PRECISON);
    const maxSellAmount = addFraction(sellAmount as bigint, SLIPPAGE);

    try {
      const txHash = await writeContract(config, {
        abi: MarketABI,
        address: marketId,
        functionName: "sell",
        args: [roundedAmountOut, outcomeIndex, maxSellAmount],
      });
      setTxHash(txHash);
      closeBetModal();
      openTxModal();
      await waitForTransactionReceipt(config, {
        hash: txHash,
      });
      onSwap();
    } catch (error) {
      console.error(error);
    } finally {
      setIsTxLoading(false);
    }
  };

  const confirmState = {
    [SwapDirection.BUY]: { submit: submitBuyBet, approve: approveToken },
    [SwapDirection.SELL]: { submit: submitSellBet, approve: approveNFT },
  };

  const currentConfirmState = confirmState[swapDirection];

  return (
    <>
      <div></div>
      <Dialog
        open={isModalOpen(ModalId.CONFIRM_SWAP)}
        onOpenChange={closeBetModal}
      >
        <DialogContent>
          <DialogHeader size="xl" className="text-center">
            <DialogClose position="left" size="xl">
              <Button variant="ghost">
                <Icon name="arrow-left" />
              </Button>
            </DialogClose>
            Confirm Swap
          </DialogHeader>
          <DialogBody className="px-2 space-y-2">
            <div className="bg-surface-surface-1 rounded-16 relative">
              <div className="border-b-[1px] border-b-outline-base-em w-full flex flex-col items-center pt-3 pb-8 space-y-1">
                <p className="text-xs text-text-low-em uppercase">You sell</p>
                <div className="text-2xl uppercase">
                  <span>{twoDecimalsTokenAmountIn}</span>{" "}
                  <span className="text-text-low-em">{swapState.inToken}</span>
                </div>
              </div>
              <div className="flex items-center justify-center rounded-100 bg-surface-surface-3 h-[40px] w-[56px] absolute top-[calc(50%_-_20px)] left-[calc(50%_-_28px)]">
                <Icon name="arrow-down" />
              </div>
              <div className="w-full flex flex-col items-center pt-8 pb-3 space-y-1">
                <p className="text-xs text-text-low-em uppercase">You buy</p>
                <div className="text-2xl uppercase">
                  <span>{twoDecimalsTokenAmountOut}</span>{" "}
                  <span className="text-text-low-em">{swapState.outToken}</span>
                </div>
              </div>
            </div>
            <div className="border border-outline-base-em rounded-12">
              <div className="px-3 py-1">
                <div className="flex items-center justify-between">
                  <p className=" text-text-low-em">Price</p>
                  <div className="flex items-center space-x-1">
                    <p>1 {swapState.inToken}</p>
                    <p>=</p>
                    <p className="text-text-success-em">
                      {swapState.tokenPrice} {swapState.outToken}
                    </p>
                    <p className=" text-text-low-em">(≈ $1)</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className=" text-text-low-em">Slippage</p>
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
      <Dialog
        open={isModalOpen(ModalId.WAITING_TRANSACTION)}
        onOpenChange={closeTxModal}
      >
        <DialogContent className="">
          <DialogHeader />
          <DialogBody className="max-w-[496px] w-[496px] px-2 space-y-2 mt-8 mb-8">
            <div className="flex flex-col items-center w-full space-y-20">
              {isTxLoading ? (
                <>
                  <Image
                    src="/spinner.svg"
                    alt="spinner"
                    width={56}
                    height={56}
                    className="animate-spin"
                  />
                  <div className="flex flex-col items-center space-y-2">
                    <p className="text-text-high-em text-2xl font-semibold">
                      Transaction submitted
                    </p>
                    <p className="text-text-low-em text-md font-semibold text-center max-w-80">
                      The transaction has been submitted. <br />
                      It takes a couple of minutes to complete.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <IconBadge name="tick" colorScheme="success" />
                  <div className="flex flex-col items-center space-y-2">
                    <p className="text-text-high-em text-2xl font-semibold">
                      Transaction successful!
                    </p>
                    <p className="text-text-low-em text-md font-semibold text-center max-w-80">
                      The transaction has been completed. <br />
                      You can close this window now.
                    </p>
                  </div>
                </>
              )}
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              width="full"
              colorScheme={isTxLoading ? "primary" : "success"}
              variant="pastel"
              onClick={() =>
                window.open(`https://gnosisscan.io/tx/${txHash}`, "_blank")
              }
              size="lg"
            >
              <>
                View in explorer <Icon name="arrow-top-right" />
              </>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
