'use client';

import { Fragment, useEffect, useState } from 'react';
import { AiChatBase, Message, MessageCard } from '@/app/components';
import { Address } from 'viem';
import { FA_EVENTS } from '@/analytics';
import { useQuery } from '@tanstack/react-query';
import { useChat } from 'ai/react';
import { getMarket, Query } from '@/queries/omen';

interface AiChatMarketProps {
  id: Address;
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

const fetchMessages = async (id: Address) => {
  const response = await fetch(
    `${PRESAGIO_CHAT_API_URL}/api/market-chat?market_id=${id}`
  );
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

const FULL_ANSWER_WAITING_TIME_MS = 2000;

export const AiChatMarket = ({ id }: AiChatMarketProps) => {
  const [messageSent, setMessageSent] = useState(false);

  const randomWaitingMessageIndex = Math.round(
    Math.random() * (waitingMessges.length - 1)
  );

  const {
    data,
    error: messagesError,
    isFetched: isFetchedMessages,
  } = useQuery({
    queryKey: ['fetchMessages', id],
    queryFn: () => fetchMessages(id),
  });
  const { data: market } = useQuery<Pick<Query, 'fixedProductMarketMaker'>>({
    queryKey: ['getMarket', id],
    queryFn: async () => getMarket({ id }),
    staleTime: Infinity,
  });

  const {
    messages,
    error: chatError,
    append,
  } = useChat({
    id,
    body: {
      marketId: id,
    },
    api: `${PRESAGIO_CHAT_API_URL}/api/market-chat`,
    initialMessages: data,
    experimental_throttle: FULL_ANSWER_WAITING_TIME_MS,
  });

  const title = market?.fixedProductMarketMaker?.title;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (signal.aborted) return;

    if (isFetchedMessages && data?.length === 0 && title && !messageSent) {
      setMessageSent(true);
      append({ role: 'user', content: title });
    }

    return () => controller.abort();
  }, [append, data?.length, isFetchedMessages, messageSent, title]);

  const assistantMessages = messages.filter(({ role }) => role === 'assistant');
  const noAssistantMessages =
    messages.length === 1 &&
    (assistantMessages.length === 0 || assistantMessages?.at(0)?.content.length === 0);
  const hasError = messagesError || chatError;

  const parsedMessages = messages.map(({ role, content }, index) => {
    if (role === 'user' || index !== 1) return { role, content };

    if (!isJSON(content)) return { role, content };

    const contentJSON = JSON.parse(content) as {
      reasoning: string;
      outcome: string;
      confidence: string;
    };

    return {
      role,
      content: contentJSON.reasoning,
      outcome: contentJSON.outcome,
      confidence: contentJSON.confidence,
    };
  });

  const trackOnClickEvents = [
    FA_EVENTS.MARKET.AI_CHAT.OPEN_GENEREAL,
    FA_EVENTS.MARKET.AI_CHAT.OPEN(id),
  ];

  return (
    <AiChatBase messages={messages} trackOnClickEvents={trackOnClickEvents}>
      <>
        {parsedMessages.map((message, index) => (
          <Fragment key={index}>
            <Message role={message.role}>{message.content}</Message>
            <div className="flex space-x-4">
              {message.outcome && (
                <MessageCard title="Outcome">{message.outcome}</MessageCard>
              )}
              {message.confidence && (
                <MessageCard title="Confidence level">{message.confidence}%</MessageCard>
              )}
            </div>
          </Fragment>
        ))}
        {noAssistantMessages && (
          <div className="space-y-1 rounded-20 bg-outline-primary-base-em px-4 py-2">
            <div className="flex items-center space-x-2">
              <p>{waitingMessges.at(randomWaitingMessageIndex)}</p>
              <LoadingDots />
            </div>
          </div>
        )}
        {hasError && <Message role="assistant">Oops. Something went wrong.</Message>}
      </>
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
