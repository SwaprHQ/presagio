'use client';

import { PropsWithChildren, useMemo } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { config } from './config';
import { ConnectKitProvider } from 'connectkit';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { TxProvider, ModalProvider } from '@/context';
import { useAnalytics } from '@/hooks';

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => {
  const connectKitOptions = useMemo(() => {
    return { initialChainId: 0 };
  }, []);

  useAnalytics();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider options={connectKitOptions}>
          <ModalProvider>
            <TxProvider>
              <NextThemesProvider>{children}</NextThemesProvider>
            </TxProvider>
          </ModalProvider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
