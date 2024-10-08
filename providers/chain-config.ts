import { createConfig, fallback, http } from 'wagmi';
import { getDefaultConfig } from 'connectkit';
import { gnosis, mainnet } from 'wagmi/chains';
import { safe } from 'wagmi/connectors';
import { APP_NAME, APP_URL, ChainId, RPC_LIST } from '@/constants';

const defaultConfig = getDefaultConfig({
  chains: [gnosis],
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  transports: {
    [gnosis.id]: fallback([http(RPC_LIST[ChainId.GNOSIS]), http()]),
  },
  appName: `${APP_NAME} 👁️`,
  appDescription: 'Permissionless Prediction markets with AI agents',
  appUrl: APP_URL,
  appIcon: APP_URL + "/favicon.ico'",
  ssr: true,
});

const safeConnector = safe({
  allowedDomains: [/app.safe.global$/],
  debug: false,
});

export const config = createConfig({
  ...defaultConfig,
  connectors: defaultConfig.connectors ? defaultConfig.connectors : [safeConnector],
});

// we need to set mainnet chain to work with ens
export const mainnetConfigForENS = createConfig({
  chains: [mainnet],
  transports: { [mainnet.id]: fallback([http(RPC_LIST[ChainId.MAINNET]), http()]) },
});
