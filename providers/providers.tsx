"use client";

import { PropsWithChildren, useMemo } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { config } from "./config";
import { ConnectKitProvider } from "connectkit";

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => {
  const connectKitOptions = useMemo(() => {
    return { initialChainId: 0 };
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider options={connectKitOptions}></ConnectKitProvider>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
};
