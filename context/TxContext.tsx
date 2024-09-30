'use client';

import { ModalId, useModal } from '@/context/ModalContext';
import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { waitForTransactionReceipt } from '@wagmi/core';
import { type WriteContractParameters } from '@wagmi/core';

import { writeContract } from 'wagmi/actions';
import { TransactionModal } from '@/app/components';
import { config } from '@/providers/chain-config';
import { Address } from 'viem';

export interface TxContextProps {
  submitTx: (args: WriteContractParameters) => Promise<Address | void>;
  submitCustomTx: (args: {
    writeTxFunction: any;
    args: any;
  }) => Promise<Address | void>;
}

export const TxContext = createContext<TxContextProps>({
  submitTx: async (args: WriteContractParameters) => '0x' as Address | void,
  submitCustomTx: async (args: any) => '0x' as Address | void,
});

export const TxProvider = ({ children }: PropsWithChildren) => {
  const [txHash, setTxHash] = useState<string>('');
  const [isTxLoading, setIsTxLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { openModal } = useModal();

  const submitCustomTx = async ({
    writeTxFunction,
    args,
  }: any): Promise<Address | void> => submitWriteTx(() => writeTxFunction(args));

  const submitTx = async (args: WriteContractParameters): Promise<Address | void> =>
    submitWriteTx(() => writeContract(config, args));

  const submitWriteTx = async (writeTxFn?: any): Promise<Address | void> => {
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
      console.error(error);
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
