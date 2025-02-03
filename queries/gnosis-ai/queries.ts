const BASE_URL = 'https://labs-api.ai.gnosisdev.com';
const ENDPOINTS = {
  QUESTION_INSIGHTS: '/question-insights',
  QUESTION_INVALID: '/question-invalid',
};

type QuestionInsights = {
  results: {
    title: string;
    url: string;
  }[];
};

type QuestionValidity = {
  created_at: string;
  invalid: boolean;
  question: string;
};

export const getQuestionValidity = async (question: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}${ENDPOINTS.QUESTION_INVALID}/?question=${question}`
    );

    return (await response.json()) as QuestionValidity;
  } catch (error) {
    console.error('Error checking market validity:', error);

    return null;
  }
};

export const getQuestionInsights = async (question: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}${ENDPOINTS.QUESTION_INSIGHTS}/?question=${question}`
    );

    return (await response.json()) as QuestionInsights;
  } catch (error) {
    console.error('Error checking question insights:', error);

    return null;
  }
};
