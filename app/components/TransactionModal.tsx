'use client';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
  IconBadge,
} from '@swapr/ui';
import { ModalId, useModal } from '@/context/ModalContext';
import Image from 'next/image';
import { GNOSIS_SCAN_URL } from '@/constants';

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
          <VisuallyHidden asChild>
            <DialogTitle>Transaction Modal</DialogTitle>
          </VisuallyHidden>
        </DialogHeader>
        <DialogBody className="mx-auto mb-8 w-full max-w-fit space-y-2 px-2 md:max-w-[496px]">
          <div className="flex w-full flex-col items-center space-y-12">
            {isLoading ? (
              <>
                <Image
                  src="/spinner.svg"
                  alt="spinner"
                  width={56}
                  height={56}
                  className="animate-spin"
                />
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
                    <IconBadge name="tick" colorScheme="success" />
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
                    <IconBadge name="exclamation" colorScheme="error" />
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
            <a
              href={`${GNOSIS_SCAN_URL}/tx/${txHash}`}
              target="_blank"
              className="w-full"
            >
              <Button
                width="full"
                colorScheme={isLoading ? 'primary' : isError ? 'error' : 'success'}
                variant="pastel"
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
