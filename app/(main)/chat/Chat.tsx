'use client';

import { Message, MessageCard, ScrollArea } from '@/app/components';
import { useSession } from '@/context/SessionContext';
import { IconButton } from '@swapr/ui';
import { useChat } from '@ai-sdk/react';
import { Message as AiMessage } from 'ai';
import { useQuery } from '@tanstack/react-query';
import wizardSvg from '@/public/pixel-wizard.svg';
import Image from 'next/image';

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

function isJSON(message: string) {
  try {
    JSON.parse(message);
  } catch (e) {
    return false;
  }
  return true;
}
type JSONMessage = {
  content: {
    reasoning: string;
    outcome: string;
    confidence: string;
  };
  role: 'system' | 'assistant' | 'data';
};

const Chat = ({ chatId }: { chatId: string }) => {
  const { isLoggedIn } = useSession();
  const { data: chat, isLoading } = useQuery({
    queryKey: ['chat', chatId],
    queryFn: () => {
      if (!!chatId) return fetchChat(chatId);
    },
    enabled: !!chatId && isLoggedIn,
  });

  if (!chatId) return <div className="text-lg font-semibold">Chat ID is missing</div>;

  if (isLoading)
    return <div className="text-lg font-semibold">Fetching your chat...</div>;

  if (chat) return <ChatMessages initialMessages={chat.messages} id={chat.id} />;

  return <div className="text-lg font-semibold">Chat not found</div>;
};

const ChatMessages = ({
  initialMessages,
  id,
}: {
  initialMessages: AiMessage[];
  id: string;
}) => {
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
    <div className="mt-4 flex h-full w-full flex-col items-center justify-between overflow-auto">
      <ScrollArea className="w-full">
        <div className="mx-auto mb-6 w-full max-w-3xl space-y-4">
          {parsedMessages.map((msg, index) => {
            const content = msg.content;
            return typeof content === 'object' ? (
              <div className="space-y-2" key={index}>
                <div className="flex space-x-3">
                  <Image
                    alt="ai wizard"
                    width={28}
                    height={28}
                    src={wizardSvg}
                    className="w-7 self-start md:w-9"
                  />
                  <Message role={msg.role}>{content.reasoning}</Message>
                </div>
                <div className="ml-12 flex space-x-4">
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
      <div className="flex w-full max-w-3xl space-x-3 pb-28">
        <div className="flex w-full space-x-2 rounded-12 bg-surface-surface-3 p-3">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask me about the future..."
            disabled={isLoading}
            className="h-20 w-full resize-none bg-transparent text-md outline-none placeholder:font-semibold" //try field-sizing-content with tailwindcss@4
            onKeyDown={event => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();

                if (isLoading) {
                  console.error('Please wait for the model to finish its response!');
                } else {
                  handleSubmit();
                }
              }
            }}
          />
          <IconButton
            onClick={isLoading ? undefined : handleSubmit}
            disabled={isLoading}
            name="arrow-up"
            variant="pastel"
            className="size-10 rounded-100"
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
