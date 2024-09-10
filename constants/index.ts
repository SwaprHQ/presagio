import { Token } from '@/entities';

export const AI_AGENTS_ALLOWLIST = [
  '0x89c5cc945dd550bcffb72fe42bff002429f46fec',
  '0xffc8029154ecd55abed15bd428ba596e7d23f557',
  '0x993dfce14768e4de4c366654be57c21d9ba54748',
];

export const ChainId = {
  MAINNET: 1,
  GNOSIS: 100,
};

export const WXDAI = new Token(
  100,
  '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
  18,
  'WXDAI',
  'Wrapped xDAI'
);

// RPC endpoints
export const RPC_LIST: { [chainId: number]: string } = {
  [ChainId.MAINNET]: process.env.RPC_MAINNET ?? 'https://eth.meowrpc.com/',
  [ChainId.GNOSIS]: process.env.RPC_GNOSIS ?? 'https://rpc.gnosis.gateway.fm',
};

const SUBGRAPH_API_KEY = process.env.NEXT_PUBLIC_SUBGRAPH_API_KEY || '';

export const CONDITIONAL_TOKENS_SUBGRAPH_URL =
  process.env.NEXT_PUBLIC_CONDITIONAL_TOKENS_SUBGRAPH_URL ??
  `https://gateway-arbitrum.network.thegraph.com/api/${SUBGRAPH_API_KEY}/subgraphs/id/7s9rGBffUTL8kDZuxvvpuc46v44iuDarbrADBFw5uVp2`;

export const OMEN_SUBGRAPH_URL =
  process.env.NEXT_PUBLIC_OMEN_SUBGRAPH_URL ??
  `https://gateway-arbitrum.network.thegraph.com/api/${SUBGRAPH_API_KEY}/subgraphs/id/9fUVQpFwzpdWS9bq5WkAnmKbNNcoBwatMR4yZq81pbbz`;

export const XDAI_BLOCKS_SUBGRAPH_URL =
  process.env.NEXT_PUBLIC_XDAI_BLOCKS_SUBGRAPH_URL ??
  `https://gateway-arbitrum.network.thegraph.com/api/${SUBGRAPH_API_KEY}/subgraphs/id/D58aXwnRLfosFtRaVJAbAjjvKZ11bEsbdiDLkJJRdSC9`;

export const OMEN_THUMBNAIL_MAPPING_SUBGRAPH_URL =
  process.env.NEXT_PUBLIC_OMEN_THUMBNAIL_MAPPING_SUBGRAPH_URL ??
  `https://gateway-arbitrum.network.thegraph.com/api/${SUBGRAPH_API_KEY}/subgraphs/id/EWN14ciGK53PpUiKSm7kMWQ6G4iz3tDrRLyZ1iXMQEdu`;

export const DUNE_API_KEY = process.env.NEXT_PUBLIC_DUNE_API_KEY || '';

export const GNOSIS_SCAN_URL = 'https://gnosisscan.io';
export const KLEROS_URL = 'https://kleros.io';
const REALITY_URL = 'https://reality.eth.limo';
export const REALITY_QUESTION_URL = `${REALITY_URL}/app/#!/network/100/question/0x79e32ae03fb27b07c89c0c568f80287c01ca2e57-`;
