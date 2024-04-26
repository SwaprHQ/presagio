import { Token } from "@/entities";

export const ChainId = {
  ETHEREUM: 1,
  GNOSIS: 100,
};

export const WXADI = new Token(
  100,
  "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d",
  18,
  "WXDAI",
  "Wrapped xDAI"
);

// RPC endpoints
export const RPC_LIST: { [chainId: number]: string } = {
  [ChainId.ETHEREUM]: process.env.RPC_MAINNET ?? "https://eth.meowrpc.com/",
  [ChainId.GNOSIS]: process.env.RPC_GNOSIS ?? "https://rpc.gnosis.gateway.fm",
};

export const CONDITIONAL_TOKENS_SUBGRAPH_URL =
  process.env.NEXT_PUBLIC_CONDITIONAL_TOKENS_SUBGRAPH_URL ??
  "https://api.thegraph.com/subgraphs/name/gnosis/conditional-tokens-gc/";

export const OMEN_SUBGRAPH_URL =
  process.env.NEXT_PUBLIC_OMEN_SUBGRAPH_URL ??
  "https://api.thegraph.com/subgraphs/name/protofire/omen-xdai/";
