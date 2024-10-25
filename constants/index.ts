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

export const SDAI = new Token(
  100,
  '0xaf204776c7245bf4147c2612bf6e5972ee483701',
  18,
  'sDAI',
  'Savings xDAI'
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

export enum Categories {
  TECHNOLOGY = 'technology',
  CRYPTO = 'crypto',
  BUSINESS = 'business',
  POLITICS = 'politics',
  ECONOMY = 'economy',
  INTERNATIONAL = 'international',
  SPORTS = 'sports',
  ENTERTAINMENT = 'entertainment',
}

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Presagio';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://presagio.pages.dev';
export const X_URL = process.env.NEXT_PUBLIC_X_URL || 'https://x.com/PresagioDev';
export const DISCORD_URL =
  process.env.NEXT_PUBLIC_DISCORD_URL || 'https://discord.com/invite/QFkNsjTkzD';
export const GITHUB_URL =
  process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/SwaprHQ/presagio';

const formatEventName = (eventName: string) =>
  eventName.split(' ').join('-').toLocaleLowerCase();
export const FA_EVENTS = {
  BETS: {
    MY_BETS: `click/bets_-my-bets`,
    REDEEM: `click/bets_redeem`,
  },
  FOOTER: {
    CONNECT: {
      DISCORD: 'click/footer-connect_discord',
      GITHUB: 'click/footer-connect_github',
      X: 'click/footer-connect_x',
    },
    HOME: 'click/footer-home',
    MARKET_CATEGORY: (category: string) => `click/footer-markets_${category}`,
    POWERED_BY: {
      GNOSIS: 'click/footer-powered-by_gnosis',
      GNOSIS_AI: 'click/footer-powered-by_gnosis-ai',
      KLEROS: 'click/footer-powered-by_kleros',
      REALITY: 'click/footer-powered-by_reality',
    },
  },
  LIFI_WIDGET: {
    OPEN: `click/lifi-widget_open-${SDAI.symbol}`,
    ROUTE_FAILED: `click/lifi-widget_route-failed`,
    ROUTE_SUCCESS: `click/lifi-widget_route-success`,
  },
  MARKETS: {
    CATEGORY: (category: string) => `click/markets_category-${category}`,
    DETAILS: {
      EMBED: {
        COPIED: (id: string) => `click/market-details-embed_copied-${id}`,
        ID: (id: string) => `click/market-details-embed_${id}`,
      },
      ID: (id: string) => `click/market-details_${id}`,
      INFO: {
        CONTRACT: (contract: string) =>
          `click/market-details-info_chain-scan-${contract}`,
        DISPUTE: (contract: string) => `click/market-details-info_kleros-${contract}`,
        ORACLE_ANSWER: (realityId: string) =>
          `click/market-details-info_reality-${realityId}`,
      },
      TABS: {
        NAME: (id: string, tabName: string) =>
          `click/market-details-tabs_${tabName}-${id}`,
        NEWS_ARTICLE: (id: string) => `click/market-details-tabs_news-article-${id}`,
      },
    },
    FILTERS: {
      CREATOR: (creatorName: string) =>
        `click/markets-filters_creator-${formatEventName(creatorName)}`,
      ORDER: (orderName: string) =>
        `click/markets-filters_order-${formatEventName(orderName)}`,
      STATE: (stateName: string) =>
        `click/markets-filters_state-${formatEventName(stateName)}`,
      TOKEN: (tokenName: string) =>
        `click/markets-filters_token-${formatEventName(tokenName)}`,
    },
    SEARCH_BAR: `click/markets_search-bar`,
  },
};
