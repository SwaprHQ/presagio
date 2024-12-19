'use client';

import { useAccount } from 'wagmi';

import { ConnectButton } from '@/app/components';
import { useUnsupportedNetwork } from '@/hooks';
import { Button, ButtonProps } from '@swapr/ui';

export const TxButton = ({ children, ...props }: ButtonProps) => {
  const { isDisconnected } = useAccount();
  const unsupportedNetwork = useUnsupportedNetwork();

  if (isDisconnected) {
    return (
      <ConnectButton width="full" size="lg">
        Connect
      </ConnectButton>
    );
  }

  if (unsupportedNetwork) {
    return (
      <Button width="full" variant="pastel" size="lg" disabled>
        Unsupported network
      </Button>
    );
  }

  return <Button {...props}>{children}</Button>;
};
