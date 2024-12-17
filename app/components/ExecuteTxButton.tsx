'use client';

import { useAccount } from 'wagmi';

import { ConnectButton } from '@/app/components';
import { useUnsupportedNetwork } from '@/hooks';
import { Button } from '@swapr/ui';

interface ExecuteTxButtonProps {
  amount: number;
  balance: number;
  modalButtonLabel: string;
  modalButtonOnClick: () => void;
  tokenSymbol?: string;
}

export const ExecuteTxButton = ({
  amount,
  balance,
  modalButtonOnClick,
  modalButtonLabel,
  tokenSymbol = 'token',
}: ExecuteTxButtonProps) => {
  const { isDisconnected } = useAccount();
  const unsupportedNetwork = useUnsupportedNetwork();

  return isDisconnected ? (
    <ConnectButton width="full" size="lg">
      Connect
    </ConnectButton>
  ) : unsupportedNetwork ? (
    <Button width="full" variant="pastel" size="lg" disabled>
      Unsupported network
    </Button>
  ) : !amount ? (
    <Button width="full" variant="pastel" size="lg" disabled>
      Enter amount
    </Button>
  ) : amount > balance ? (
    <Button width="full" variant="pastel" size="lg" disabled>
      {`Insufficient ${tokenSymbol} balance`}
    </Button>
  ) : (
    <Button width="full" variant="pastel" size="lg" onClick={modalButtonOnClick}>
      {modalButtonLabel}
    </Button>
  );
};
