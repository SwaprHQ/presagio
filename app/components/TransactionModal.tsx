'use client';

import {
  Button,
  ButtonColorScheme,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
  VisuallyHidden,
} from '@swapr/ui';
import { ModalId, useModal } from '@/context/ModalContext';
import { getExplorerTxUrl } from '@/utils';

interface TransactionModalProps {
  isLoading: boolean;
  isError?: boolean;
  txHash?: string;
}

export const TransactionModal = ({
  isLoading,
  txHash,
  isError,
}: TransactionModalProps) => {
  const { isModalOpen, closeModal } = useModal();

  const close = () => {
    closeModal(ModalId.WAITING_TRANSACTION);
  };

  return (
    <Dialog open={isModalOpen(ModalId.WAITING_TRANSACTION)} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogClose name="arrow-left" />
          <VisuallyHidden asChild>
            <DialogTitle>Transaction Modal</DialogTitle>
          </VisuallyHidden>
          <VisuallyHidden asChild>
            <DialogDescription />
          </VisuallyHidden>
        </DialogHeader>
        <DialogBody className="mx-auto mb-8 w-full max-w-fit space-y-2 px-2 md:max-w-[496px]">
          <div className="flex w-full flex-col items-center space-y-12">
            {isLoading ? (
              <>
                <Icon size={56} name="spinner" className="animate-spin" />
                <div className="flex flex-col items-center space-y-2">
                  <p className="text-center text-2xl font-semibold text-text-high-em">
                    Transaction submitted
                  </p>
                  <p className="text-center text-md font-semibold text-text-low-em">
                    The transaction has been submitted. <br />
                    It takes a couple of minutes to complete.
                  </p>
                </div>
              </>
            ) : (
              <>
                {txHash && !isError && (
                  <>
                    <div className="rounded-100 bg-surface-success-base-em p-4">
                      <Icon
                        name="tick"
                        size={38}
                        className="text-surface-success-high-em"
                      />
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <p className="text-center text-2xl font-semibold text-text-high-em">
                        Transaction successful!
                      </p>
                      <p className="max-w-80 text-center text-md font-semibold text-text-low-em">
                        The transaction has been completed. <br />
                        You can close this window now.
                      </p>
                    </div>
                  </>
                )}
                {isError && (
                  <>
                    <div className="rounded-100 bg-surface-danger-base-em p-4">
                      <Icon
                        name="exclamation"
                        size={38}
                        className="text-surface-danger-high-em"
                      />
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <p className="text-2xl font-semibold text-text-high-em">
                        There was an error.
                      </p>
                      <p className="max-w-80 text-center text-md font-semibold text-text-low-em">
                        Unfortunately the transaction was not completed.
                      </p>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </DialogBody>
        {txHash && (
          <DialogFooter>
            <a href={getExplorerTxUrl(txHash)} target="_blank" className="w-full">
              <Button
                width="full"
                colorScheme={
                  (isLoading
                    ? 'main'
                    : isError
                      ? 'error'
                      : 'success') as ButtonColorScheme
                }
                variant="light"
                size="lg"
              >
                <p>View in explorer</p>
                <Icon name="arrow-top-right" />
              </Button>
            </a>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
