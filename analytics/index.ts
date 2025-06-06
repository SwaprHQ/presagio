import { SDAI } from '@/constants';

const formatEventName = (eventName: string) =>
  eventName.split(' ').join('-').toLocaleLowerCase();

export const FA_EVENTS = {
  BETS: {
    MY_BETS: 'click/bets/my-bets',
    REDEEM: 'click/bets/redeem',
  },
  FOOTER: {
    CONNECT: {
      DISCORD: 'click/footer/connect/discord',
      GITHUB: 'click/footer/connect/github',
      X: 'click/footer/connect/x',
    },
    HOME: 'click/footer/home',
    MARKET_CATEGORY: (category: string) => `click/footer/markets/${category}`,
    POWERED_BY: {
      GNOSIS: 'click/footer/powered-by/gnosis',
      GNOSIS_AI: 'click/footer/powered-by/gnosis-ai',
      KLEROS: 'click/footer/powered-by/kleros',
      REALITY: 'click/footer/powered-by/reality',
    },
  },
  LIFI_WIDGET: {
    OPEN: `click/lifi-widget/open-${SDAI.symbol}`,
    ROUTE_FAILED: 'click/lifi-widget/route-failed',
    ROUTE_SUCCESS: 'click/lifi-widget/route-success',
  },
  AI_CHAT: {
    WIZARD: {
      OPEN: 'click/ai-chat/wizard/open',
      OPEN_LANDING: 'click/ai-chat/wizard/open/landing',
      OPEN_MARKET: (id: string) => `click/ai-chat/wizard/open/${id}`,
    },
    NEW: 'click/ai-chat/new',
    NAVBAR: 'click/ai-chat/navbar',
    OPEN: (id: string) => `click/ai-chat/open/${id}`,
    CREATE: (id: string) => `create/ai-chat/${id}`,
  },
  MARKETS: {
    CAROUSEL: 'click/markets/carousel',
    CATEGORY: (category: string) => `click/markets/category-${category}`,
    DETAILS: {
      EMBED: {
        COPIED: 'click/markets/details/embed/copied',
        ID: 'click/markets/details/embed',
      },
      ID: (id: string) => `click/markets/details/${id}`,
      INFO: {
        CONTRACT: 'click/markets/details/info/chain-scanner',
        DISPUTE: 'click/markets/details/info/kleros',
        ORACLE_ANSWER: 'click/markets/details/info/reality',
      },
      TABS: {
        NAME: (tabName: string) => `click/markets/details/tabs/${tabName}`,
        NEWS_ARTICLE: 'click/markets/details/tabs/news-article',
      },
    },
    FILTERS: {
      CREATOR: (creatorName: string) =>
        `click/markets/filters/creator-${formatEventName(creatorName)}`,
      ORDER: (orderName: string) =>
        `click/markets/filters/order-${formatEventName(orderName)}`,
      STATE: (stateName: string) =>
        `click/markets/filters/state-${formatEventName(stateName)}`,
      TOKEN: (tokenName: string) =>
        `click/markets/filters/token-${formatEventName(tokenName)}`,
    },
    SEARCH_BAR: `click/markets/search-bar`,
  },
};
