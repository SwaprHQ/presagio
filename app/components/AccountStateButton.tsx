'use client';

import { PropsWithChildren } from 'react';

import { useAccount } from 'wagmi';

import { ConnectButton } from '@/app/components';
import { useUnsupportedNetwork } from '@/hooks';
import { Button } from '@swapr/ui';

export const AccountStateButton = ({ children }: PropsWithChildren) => {
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

  return <>{children}</>;
};
