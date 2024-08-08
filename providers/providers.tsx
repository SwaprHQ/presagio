'use client';

import { PropsWithChildren, useMemo } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { config } from './chain-config';
import { ConnectKitProvider, Types } from 'connectkit';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { TxProvider, ModalProvider } from '@/context';
import { useAnalytics } from '@/hooks';

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => {
  useAnalytics();

  return (
    <NextThemesProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <CustomConnectKitProvider>
            <ModalProvider>
              <TxProvider>{children}</TxProvider>
            </ModalProvider>
          </CustomConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </NextThemesProvider>
  );
};

const CustomConnectKitProvider = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();
  const connectkitTheme = (theme || 'auto') as Types.Mode;
  const options = { enforceSupportedChains: true };

  return (
    <ConnectKitProvider mode={connectkitTheme} options={options}>
      {children}
    </ConnectKitProvider>
  );
};
