const BASE_URL = 'https://labs-api.ai.gnosisdev.com';
const ENDPOINTS = {
  QUESTION_INSIGHTS: '/question-insights',
  MARKET_INVALID: '/market-invalid',
};

export type MarketInsights = {
  results: {
    title: string;
    url: string;
  }[];
};

export type MarketValidity = {
  created_at: string;
  invalid: boolean;
  market_id: string;
};

export const getMarketValidity = async (id: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}${ENDPOINTS.MARKET_INVALID}/?market_id=${id}`
    );

    return await response.json();
  } catch (error) {
    console.error('Error checking market validity:', error);

    return null;
  }
};

export const getMarketInsights = async (question: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}${ENDPOINTS.QUESTION_INSIGHTS}/?question=${question}`
    );

    return await response.json();
  } catch (error) {
    console.error('Error checking market insights:', error);

    return null;
  }
};
