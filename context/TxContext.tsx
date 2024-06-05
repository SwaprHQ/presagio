"use client";

import { ModalId, useModalContext } from "@/context/ModalContext";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { waitForTransactionReceipt } from "@wagmi/core";
import { type WriteContractParameters, type Config } from "@wagmi/core";

import { writeContract } from "wagmi/actions";
import { TransactionModal } from "@/app/components";
import { config } from "@/providers/config";

export interface TxContextProps {
  submitTx: (args: WriteContractParameters) => Promise<void>;
}

export const TxContext = createContext<TxContextProps>({
  submitTx: async (args: WriteContractParameters) => {},
});

export const TxProvider = ({ children }: PropsWithChildren) => {
  const [txHash, setTxHash] = useState<string>("");
  const [isTxLoading, setIsTxLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { openModal } = useModalContext();

  const submitTx = async (args: WriteContractParameters): Promise<void> => {
    setIsTxLoading(true);
    setIsError(false);
    setTxHash("");

    try {
      const txHash = await writeContract(config, args);
      setTxHash(txHash);

      openModal(ModalId.WAITING_TRANSACTION);

      await waitForTransactionReceipt(config, {
        hash: txHash,
      });
    } catch (error) {
      setIsError(true);
      console.error(error);
      throw error;
    } finally {
      setIsTxLoading(false);
    }
  };

  const txContext = {
    submitTx,
  };

  return (
    <TxContext.Provider value={txContext}>
      {children}
      <TransactionModal
        isLoading={isTxLoading}
        txHash={txHash}
        isError={isError}
      />
    </TxContext.Provider>
  );
};

export const useTx = () => useContext(TxContext);
