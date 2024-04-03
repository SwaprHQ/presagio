import { createConfig, fallback, http } from "wagmi";
import { getDefaultConfig } from "connectkit";
import { gnosis } from "wagmi/chains";
import { safe } from "wagmi/connectors";
import { ChainId, RPC_LIST } from "@/constants";

const defaultConfig = getDefaultConfig({
  chains: [gnosis],
  walletConnectProjectId:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
  transports: {
    [gnosis.id]: fallback([http(RPC_LIST[ChainId.GNOSIS]), http()]),
  },
  appName: "Dapp",
  appDescription: "Dapp description",
  appUrl: "https://next-dapp-starterkit.app",
  appIcon: "https://next-dapp-starterkit.app/favicon.ico",
  ssr: true,
});

const safeConnector = safe({
  allowedDomains: [/app.safe.global$/],
  debug: false,
});

export const config = createConfig({
  ...defaultConfig,
  connectors: defaultConfig.connectors
    ? defaultConfig.connectors
    : [safeConnector],
});
