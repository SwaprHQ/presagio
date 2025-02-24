'use client';

import { ModalId, useModal } from '@/context/ModalContext';
import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { waitForTransactionReceipt } from '@wagmi/core';
import { type WriteContractParameters } from '@wagmi/core';

import { writeContract } from 'wagmi/actions';
import { TransactionModal } from '@/app/components';
import { config } from '@/providers/chain-config';

export interface TxContextProps {
  submitTx: (args: WriteContractParameters) => Promise<void>;
  submitCustomTx: (tx: Function) => Promise<void>;
}

export const TxContext = createContext<TxContextProps>({
  submitTx: async () => {},
  submitCustomTx: async () => {},
});

export const TxProvider = ({ children }: PropsWithChildren) => {
  const [txHash, setTxHash] = useState<string>('');
  const [isTxLoading, setIsTxLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { openModal } = useModal();

  const submitCustomTx = async (writeTxFn: Function): Promise<void> =>
    submitWriteTx(() => writeTxFn());
  const submitTx = async (args: WriteContractParameters): Promise<void> =>
    submitWriteTx(() => writeContract(config, args));

  const submitWriteTx = async (writeTxFn: Function): Promise<void> => {
    setIsTxLoading(true);
    setIsError(false);
    setTxHash('');

    try {
      const txHash = await writeTxFn();
      setTxHash(txHash);
      openModal(ModalId.WAITING_TRANSACTION);

      await waitForTransactionReceipt(config, {
        hash: txHash,
      });
    } catch (error) {
      setIsError(true);
      throw error;
    } finally {
      setIsTxLoading(false);
    }
  };

  const txContext = {
    submitTx,
    submitCustomTx,
  };

  return (
    <TxContext.Provider value={txContext}>
      {children}
      <TransactionModal isLoading={isTxLoading} txHash={txHash} isError={isError} />
    </TxContext.Provider>
  );
};

export const useTx = () => useContext(TxContext);
