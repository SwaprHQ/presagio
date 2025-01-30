'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ScrollArea } from '@/app/components';
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
import { getMarket, Query } from '../../../queries/omen';

interface AiChatProps {
  id: Address;
}

const MARKET_CHAT_URL = process.env.NEXT_PUBLIC_MARKET_CHAT_URL!;

const MARKETING_LINK =
  'https://swpr.notion.site/Presagio-AI-f4ccdfa867e949d3badf10705b7c90aa';

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

const randomWaitingMessageIndex = Math.round(Math.random() * waitingMessges.length);

const fetchMessages = async (id: Address) => {
  const response = await fetch(`${MARKET_CHAT_URL}/api/market-chat?market_id=${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const AiChat = ({ id }: AiChatProps) => {
  const [isOpen, setOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

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
    api: `${MARKET_CHAT_URL}/api/market-chat`,
    initialMessages: data,
  });

  const title = market?.fixedProductMarketMaker?.title;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (signal.aborted) return;

    if (isFetchedMessages && data?.length === 0 && title && isOpen) {
      append({ role: 'user', content: title });
    }

    return () => controller.abort();
  }, [append, data?.length, isFetchedMessages, isOpen, title]);

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
      <div className="fixed bottom-10 flex w-full items-center justify-end px-2 md:px-6">
        <div className="flex flex-col items-end">
          <Dialog.Portal>
            <Dialog.Content className="fixed bottom-28 right-0 w-full origin-bottom-right rounded-16 border border-outline-base-em bg-surface-surface-0 shadow-2 data-[state=open]:animate-grow md:right-4 md:w-[420px]">
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
                  {messages.map(message => (
                    <Message key={message.content?.slice(20)} role={message.role}>
                      {message.content}
                    </Message>
                  ))}
                  {noAssistantMessages && (
                    <Message role="assistant">
                      {waitingMessges.at(randomWaitingMessageIndex)}
                    </Message>
                  )}
                  {hasError && (
                    <Message role="assistant">Oops. Something went wrong.</Message>
                  )}
                </div>
              </ScrollArea>
              <div className="absolute bottom-0 w-full rounded-b-16 px-4 pb-4 pt-2 backdrop-blur-md">
                <div className="flex items-center justify-center">
                  <a
                    onClick={() => {
                      trackEvent(FA_EVENTS.MARKET.AI_CHAT.LEARN_MORE);
                    }}
                    href={MARKETING_LINK}
                    className="mb-1 hover:underline"
                    target="_blank"
                  >
                    Learn more about Presagio AI
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
                trackEvent(FA_EVENTS.MARKET.AI_CHAT.OPEN(id));
              }}
              className={twMerge(
                'flex size-16 items-center justify-center rounded-100 bg-transparent shadow-1 outline-outline-primary-low-em backdrop-blur-md transition-colors duration-700 hover:bg-outline-primary-base-em focus:bg-outline-primary-base-em',
                'data-[state=open]:bg-outline-primary-base-em data-[state=open]:shadow-2'
              )}
            >
              <Image alt="ai wizard" width={42} height={42} src={wizardSvg} />
            </button>
          </Dialog.Trigger>
        </div>
      </div>
    </Dialog.Root>
  );
};

interface MessageProps {
  children: React.ReactNode;
  role: string;
}

const Message = ({ children, role }: MessageProps) => {
  const isSystem = role === 'assistant';
  return (
    <div
      className={cx(
        'rounded-20 p-4',
        isSystem ? 'bg-outline-primary-base-em' : 'bg-surface-surface-1'
      )}
    >
      {children}
    </div>
  );
};

export default AiChat;
