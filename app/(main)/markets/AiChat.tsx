'use client';

import Image from 'next/image';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { MarkdownRenderer, ScrollArea } from '@/app/components';
import aiStarsSvg from '@/public/ai-stars.svg';
import wizardSvg from '@/public/pixel-wizard.svg';
import { cx } from 'class-variance-authority';
import { Address } from 'viem';
import { Icon, IconButton, Input, Tag } from '@swapr/ui';
import { twMerge } from 'tailwind-merge';
import { FA_EVENTS } from '@/analytics';
import { trackEvent } from 'fathom-client';
import { useQuery } from '@tanstack/react-query';
import { useChat } from 'ai/react';
import { getMarket, Query } from '@/queries/omen';

interface AiChatProps {
  id: Address;
}

const PRESAGIO_CHAT_API_URL = process.env.NEXT_PUBLIC_PRESAGIO_CHAT_API_URL!;

const MARKETING_LINK =
  'https://swpr.notion.site/Presagio-AI-Predictor-Chatbot-Beta-Launch-f4ccdfa867e949d3badf10705b7c90aa';

type Role = 'user' | 'assitant';

interface Message {
  content: string;
  role: Role;
}

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

export const AiChat = ({ id }: AiChatProps) => {
  const [isOpen, setOpen] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

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
  });

  const title = market?.fixedProductMarketMaker?.title;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (signal.aborted) return;

    if (isFetchedMessages && data?.length === 0 && title && isOpen && !messageSent) {
      setMessageSent(true);
      append({ role: 'user', content: title });
    }

    return () => controller.abort();
  }, [append, data?.length, isFetchedMessages, messageSent, isOpen, title]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [scrollAreaRef]);

  const assistantMessages = messages.filter(({ role }) => role === 'assistant');
  const noAssistantMessages =
    messages.length === 1 &&
    (assistantMessages.length === 0 || assistantMessages?.at(0)?.content.length === 0);
  const hasError = messagesError || chatError;

  return (
    <Dialog.Root modal onOpenChange={isOpen => setOpen(isOpen)}>
      <div className="fixed bottom-4 flex w-full items-center justify-end px-2 md:bottom-10 md:px-6">
        <div className="flex flex-col items-end">
          <Dialog.Portal>
            <Dialog.Content className="fixed bottom-20 right-0 w-full origin-bottom-right rounded-16 border border-outline-base-em bg-surface-surface-0 shadow-2 data-[state=open]:animate-grow md:bottom-28 md:right-4 md:w-[420px]">
              <Dialog.Description hidden={true}>
                Presagio chatbot window
              </Dialog.Description>
              <div className="border-b border-outline-low-em p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Image alt="ai stars" width={14} height={14} src={aiStarsSvg} />
                    <Dialog.DialogTitle className="font-semibold">
                      Ask Wizard
                    </Dialog.DialogTitle>
                    <Tag colorScheme="info">Experimental</Tag>
                  </div>
                  <Dialog.Close asChild>
                    <IconButton
                      size="sm"
                      className="rotate-90"
                      variant="ghost"
                      name="arrow-double-right"
                    />
                  </Dialog.Close>
                </div>
              </div>
              <ScrollArea className="h-[460px] md:h-[536px]">
                <div className="space-y-4 px-4 pb-32 pt-4">
                  {messages.map((message, index) => (
                    <Message key={index} role={message.role}>
                      {message.content}
                    </Message>
                  ))}
                  {noAssistantMessages && (
                    <div className="space-y-1 rounded-20 bg-outline-primary-base-em px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <p>{waitingMessges.at(randomWaitingMessageIndex)}</p>
                        <LoadingDots />
                      </div>
                    </div>
                  )}
                  {hasError && (
                    <Message role="assistant">Oops. Something went wrong.</Message>
                  )}
                </div>
              </ScrollArea>
              <div className="absolute bottom-0 w-full rounded-b-16 border-t border-surface-surface-1 bg-surface-surface-0 px-4 pb-4 pt-2">
                <div className="flex items-center justify-center">
                  <a
                    onClick={() => {
                      trackEvent(FA_EVENTS.MARKET.AI_CHAT.GET_BETA_ACCESS);
                    }}
                    href={MARKETING_LINK}
                    className="mb-1 hover:underline"
                    target="_blank"
                  >
                    Get beta access to Presagio AI ✨
                  </a>
                  <Icon name="arrow-top-right" size={12} />
                </div>
                <Input
                  placeholder="Ask anything. Available soon."
                  className="w-full"
                  disabled
                />
                <p className="w-full text-center text-xs text-text-low-em">
                  AI-generated, for reference only.
                </p>
              </div>
            </Dialog.Content>
          </Dialog.Portal>

          <Dialog.Trigger asChild>
            <button
              onClick={() => {
                trackEvent(FA_EVENTS.MARKET.AI_CHAT.OPEN_GENEREAL);
                trackEvent(FA_EVENTS.MARKET.AI_CHAT.OPEN(id));
              }}
              className={twMerge(
                'flex size-12 items-center justify-center rounded-100 bg-transparent shadow-1 outline-outline-primary-low-em backdrop-blur-sm transition-colors duration-700 hover:bg-outline-primary-base-em focus:bg-outline-primary-base-em md:size-16',
                'data-[state=open]:bg-outline-primary-base-em data-[state=open]:shadow-2'
              )}
            >
              <Image
                alt="ai wizard"
                width={42}
                height={42}
                src={wizardSvg}
                className="w-7 md:w-10"
              />
            </button>
          </Dialog.Trigger>
        </div>
      </div>
    </Dialog.Root>
  );
};

interface MessageProps extends PropsWithChildren {
  role: string;
}

const Message = ({ children, role }: MessageProps) => {
  const isSystem = role === 'assistant';
  return (
    <MarkdownRenderer
      className={cx(
        'rounded-20 px-4 py-2',
        isSystem ? 'bg-outline-primary-base-em' : 'bg-surface-surface-1'
      )}
    >
      {children}
    </MarkdownRenderer>
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

export default AiChat;
