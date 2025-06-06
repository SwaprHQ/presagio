'use client';

import { cn, MarkdownRenderer, MessageCard, ScrollArea } from '@/app/components';
import { useSession } from '@/context/SessionContext';
import { IconButton, Icon } from '@swapr/ui';
import { useChat } from '@ai-sdk/react';
import { Message as AiMessage } from 'ai';
import { useQuery } from '@tanstack/react-query';
import { isJSON } from '@/utils/json';
import { PropsWithChildren, useEffect, useRef } from 'react';

const PRESAGIO_CHAT_API_URL = process.env.NEXT_PUBLIC_PRESAGIO_CHAT_API_URL!;

const fetchChat = async (
  chatId: string
): Promise<{ id: string; messages: AiMessage[] }> => {
  const response = await fetch(`${PRESAGIO_CHAT_API_URL}/api/chat/${chatId}`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch chat');
  }
  return response.json();
};

type JSONMessage = {
  content: {
    reasoning: string;
    outcome: string;
    confidence: string;
  };
  role: 'system' | 'assistant' | 'data';
};

type ChatProps = { chatId: string };

type ChatMessageProps = {
  initialMessages: AiMessage[];
  id: string;
};

const Chat = ({ chatId }: ChatProps) => {
  const { isLoggedIn } = useSession();
  const { data: chat, isLoading } = useQuery({
    queryKey: ['chat', chatId],
    queryFn: () => {
      if (!!chatId) return fetchChat(chatId);
    },
    enabled: !!chatId && isLoggedIn,
  });

  if (!chatId) return <div className="pt-64 text-lg font-medium">Chat ID is missing</div>;

  if (isLoading)
    return (
      <div className="pt-64">
        <Icon size={20} name="spinner" className="animate-spin" />
      </div>
    );

  if (chat) return <ChatMessages initialMessages={chat.messages} id={chat.id} />;

  return <div className="pt-64 text-lg font-medium">Chat not found</div>;
};

interface MessageProps extends PropsWithChildren {
  role: string;
}

const Message = ({ children, role }: MessageProps) => {
  const isAssistant = role === 'assistant';
  return (
    <MarkdownRenderer
      className={cn(
        'w-fit max-w-[90%] rounded-20 px-4 py-2',
        isAssistant
          ? 'mr-auto bg-outline-primary-low-em'
          : 'bg-neutral-inverse-white-alpha-4 dark:bg-neutral-inverse-white-alpha-24 ml-auto'
      )}
    >
      {children}
    </MarkdownRenderer>
  );
};

const ChatMessages = ({ initialMessages, id }: ChatMessageProps) => {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const { messages, error, setInput, input, isLoading, handleSubmit } = useChat({
    initialMessages,
    id,
    body: {
      id,
    },
    fetch: (_, init) => {
      return fetch(`${PRESAGIO_CHAT_API_URL}/api/chat/${id}`, {
        ...init,
        method: 'PUT',
        credentials: 'include',
      });
    },
  });

  useEffect(() => {
    if (scrollAreaRef.current)
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
  }, [messages, scrollAreaRef.current]);

  const parseAnswer = (message: AiMessage): JSONMessage | AiMessage => {
    if (typeof message.content !== 'string' || message.role === 'user') return message;
    if (!isJSON(message.content)) return message;

    const contentJSON = JSON.parse(message.content);

    return {
      role: message.role,
      content: contentJSON,
    };
  };

  const parsedMessages = messages.map(msg => parseAnswer(msg));

  return (
    <div className="flex h-full w-full flex-col items-center justify-between overflow-auto">
      <ScrollArea ref={scrollAreaRef} className="w-full">
        <div className="mx-auto mb-6 mt-4 w-full max-w-3xl space-y-4">
          {parsedMessages.map((msg, index) => {
            const content = msg.content;
            return typeof content === 'object' ? (
              <div className="space-y-2" key={index}>
                <Message role={msg.role}>{content.reasoning}</Message>
                <div className="flex space-x-4">
                  <MessageCard title="Outcome">{content.outcome}</MessageCard>
                  <MessageCard title="Confidence level">
                    {content.confidence}%
                  </MessageCard>
                </div>
              </div>
            ) : (
              <Message key={index} role={msg.role}>
                {content}
              </Message>
            );
          })}
          {error && (
            <div className="mb-2 text-left">
              <Message role="assistant">Oops. Something went wrong.</Message>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="flex w-full max-w-3xl flex-col space-y-1 pb-28">
        <div className="bg-surface-surface-smoke-gray flex w-full rounded-12 border border-outline-low-em p-3">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask me about the future..."
            autoFocus
            onFocus={() => {
              console.log('hello');
            }}
            className="h-20 w-full resize-none bg-transparent outline-none placeholder:font-medium"
            onKeyDown={event => {
              if (event.key === 'Enter' && !event.shiftKey && !!input) {
                event.preventDefault();

                if (isLoading) {
                  console.error('Please wait for the model to finish its response!');
                } else {
                  handleSubmit();
                }
              }
            }}
          />
          {isLoading ? (
            <div className="bg-surface-surface-white-smoke-4 flex size-8 items-center justify-center rounded-100">
              <Icon size={16} name="spinner" className="animate-spin" />
            </div>
          ) : (
            !!input && (
              <IconButton
                size="sm"
                onClick={handleSubmit}
                disabled={isLoading}
                name="arrow-up"
                variant="primary"
                className="rounded-100"
              />
            )
          )}
        </div>
        <p className="w-full text-center text-xs text-text-low-em">
          AI-generated, for reference only.
        </p>
      </div>
    </div>
  );
};

export default Chat;
