'use client';

import { PropsWithChildren } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { config } from './chain-config';
import { ConnectKitProvider, Types } from 'connectkit';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { TxProvider, ModalProvider, SlippageProvider } from '@/context';
import { useAnalytics } from '@/hooks';
import { Toaster, TooltipProvider } from '@swapr/ui';

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => {
  useAnalytics();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider>
          <CustomConnectKitProvider>
            <ModalProvider>
              <Toaster position="top-right" toastOptions={{ duration: 7000 }} />
              <TxProvider>
                <TooltipProvider delayDuration={300}>
                  <SlippageProvider>{children}</SlippageProvider>
                </TooltipProvider>
              </TxProvider>
            </ModalProvider>
          </CustomConnectKitProvider>
        </NextThemesProvider>
      </QueryClientProvider>
    </WagmiProvider>
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
