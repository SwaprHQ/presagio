'use client';

import { useEffect, useState } from 'react';
import { AiChatBase, Message, MessageCard } from '@/app/components';
import { Address } from 'viem';
import { FA_EVENTS } from '@/analytics';
import { useQuery } from '@tanstack/react-query';
import { getMarket, Query } from '@/queries/omen';

interface AiChatMarketProps {
  id: Address;
  isChatOpen?: boolean;
}

const PRESAGIO_CHAT_API_URL = process.env.NEXT_PUBLIC_PRESAGIO_CHAT_API_URL!;

const waitingMessges = [
  'Searching my old books for answers…',
  'The oracle whisper… Not yet clear.',
  'Consulting the tomes and the stars… Patience, seeker.',
  'The ancient texts and omens are alignin… I see something!',
  'I feel it in my beard… The answer nears!',
  'Gathering acient knowledge… Coming is the answer.',
  'The oracle stirs, the pages turn… soon, the answer.',
  'I will show you the answer! If my internet allows…',
];

const fetchPrediction = async (id: Address) => {
  const response = await fetch(`${PRESAGIO_CHAT_API_URL}/api/prediction?market_id=${id}`);
  if (!response.ok) {
    throw new Error('Presagio AI response was not ok');
  }
  return response.json();
};

const createPrediction = async (id: Address) => {
  const response = await fetch(`${PRESAGIO_CHAT_API_URL}/api/prediction`, {
    method: 'POST',
    body: JSON.stringify({ marketId: id }),
  });
  if (!response.ok) {
    throw new Error('Presagio AI response was not ok');
  }
  return response.json();
};

function isJSON(message: string) {
  try {
    JSON.parse(message);
  } catch (e) {
    return false;
  }
  return true;
}

export const AiChatMarket = ({ id, isChatOpen }: AiChatMarketProps) => {
  const [answer, setAnswer] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const randomWaitingMessageIndex = Math.round(
    Math.random() * (waitingMessges.length - 1)
  );

  const {
    data,
    error: predictionError,
    isFetched: isFetchedPrediction,
  } = useQuery({
    queryKey: ['fetchPrediction', id],
    queryFn: () => fetchPrediction(id),
  });

  const { data: market } = useQuery<Pick<Query, 'fixedProductMarketMaker'>>({
    queryKey: ['getMarket', id],
    queryFn: async () => getMarket({ id }),
    staleTime: Infinity,
  });

  useEffect(() => {
    (async () => {
      if (data) {
        setAnswer(data);
        return;
      }

      if (!data && isFetchedPrediction) {
        try {
          const prediction = await createPrediction(id);
          setAnswer(prediction);
        } catch (e) {
          setError('Failed to fetch prediction');
          console.error(e);
        }
      }
    })();
  }, [data, id, isFetchedPrediction]);

  const title = market?.fixedProductMarketMaker?.title;

  const hasError = predictionError || error;

  const parseAnswer = () => {
    if (!answer?.message?.response) return null;
    if (!isJSON(answer.message.response))
      return { role: answer.role, content: answer.message.response };

    const contentJSON = JSON.parse(answer.message.response) as {
      reasoning: string;
      outcome: string;
      confidence: string;
    };

    return {
      role: answer.role,
      content: contentJSON.reasoning,
      outcome: contentJSON.outcome,
      confidence: contentJSON.confidence,
    };
  };

  const parsedAnswer = isFetchedPrediction ? parseAnswer() : null;

  const trackOnClickEvents = [
    FA_EVENTS.MARKET.AI_CHAT.OPEN_GENEREAL,
    FA_EVENTS.MARKET.AI_CHAT.OPEN(id),
  ];

  return (
    <AiChatBase
      messages={[title, parsedAnswer]}
      trackOnClickEvents={trackOnClickEvents}
      isChatOpen={isChatOpen}
    >
      <Message role={'user'}>{title}</Message>
      {parsedAnswer && (
        <>
          <Message role={parsedAnswer.role}>{parsedAnswer.content}</Message>
          <div className="flex space-x-4">
            {parsedAnswer.outcome && (
              <MessageCard title="Outcome">{parsedAnswer.outcome}</MessageCard>
            )}
            {parsedAnswer.confidence && (
              <MessageCard title="Confidence level">
                {parsedAnswer.confidence}%
              </MessageCard>
            )}
          </div>
        </>
      )}
      {!parsedAnswer && (
        <div className="space-y-1 rounded-20 bg-outline-primary-base-em px-4 py-2">
          <div className="flex items-center space-x-2">
            <p>{waitingMessges.at(randomWaitingMessageIndex)}</p>
            <LoadingDots />
          </div>
        </div>
      )}
      {hasError && <Message role="assistant">Oops. Something went wrong.</Message>}
    </AiChatBase>
  );
};

const LoadingDots = () => {
  return (
    <div className="flex items-center justify-center space-x-0.5" aria-label="Loading">
      <div className="h-1 w-1 animate-loading-dot rounded-100 bg-surface-primary-main"></div>
      <div className="h-1 w-1 animate-loading-dot rounded-100 bg-surface-primary-main [animation-delay:0.2s]"></div>
      <div className="h-1 w-1 animate-loading-dot rounded-100 bg-surface-primary-main [animation-delay:0.4s]"></div>
    </div>
  );
};
