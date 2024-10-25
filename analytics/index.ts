import { SDAI } from '@/constants';

const formatEventName = (eventName: string) =>
  eventName.split(' ').join('-').toLocaleLowerCase();

export const FA_EVENTS = {
  BETS: {
    MY_BETS: 'click/bets_my-bets',
    REDEEM: 'click/bets_redeem',
  },
  DEVCONFLICT: 'click/devconflict-banner',
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
    ROUTE_FAILED: 'click/lifi-widget_route-failed',
    ROUTE_SUCCESS: 'click/lifi-widget_route-success',
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
        NEWS_ARTICLE: (id: string, url: string) =>
          `click/market-details-tabs_news-article-${id}-${url}`,
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
