import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  Icon,
  IconBadge,
} from "swapr-ui";
import { ModalId, useModal } from "@/context/ModalContext";
import Image from "next/image";

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
    <Dialog
      open={isModalOpen(ModalId.WAITING_TRANSACTION)}
      onOpenChange={close}
    >
      <DialogContent>
        <DialogHeader />
        <DialogBody className="max-w-[496px] w-[496px] px-2 space-y-2 mt-8 mb-8">
          <div className="flex flex-col items-center w-full space-y-20">
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
                  <p className="text-2xl font-semibold text-text-high-em">
                    Transaction submitted
                  </p>
                  <p className="font-semibold text-center text-text-low-em text-md max-w-80">
                    The transaction has been submitted. <br />
                    It takes a couple of minutes to complete.
                  </p>
                </div>
              </>
            ) : (
              <>
                {!isError && (
                  <>
                    <IconBadge name="tick" colorScheme="success" />
                    <div className="flex flex-col items-center space-y-2">
                      <p className="text-2xl font-semibold text-text-high-em">
                        Transaction successful!
                      </p>
                      <p className="font-semibold text-center text-text-low-em text-md max-w-80">
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
                      <p className="font-semibold text-center text-text-low-em text-md max-w-80">
                        Unfortunately the transaction was not completed.
                      </p>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          {txHash && (
            <a
              href={`https://gnosisscan.io/tx/${txHash}`}
              target="_blank"
              className="w-full"
              rel="noopener noreferrer"
            >
              <Button
                width="full"
                colorScheme={
                  isLoading ? "primary" : isError ? "error" : "success"
                }
                variant="pastel"
                size="lg"
              >
                <>
                  View in explorer <Icon name="arrow-top-right" />
                </>
              </Button>
            </a>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
