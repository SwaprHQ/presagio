'use client';

import { Message, MessageCard, ScrollArea } from '@/app/components';
import { useAuth } from '@/hooks/useAuth';
import { useSession } from '@/context/SessionContext';
import { Button, Input } from '@swapr/ui';
import { useChat } from '@ai-sdk/react';
import { Message as AiMessage } from 'ai';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

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

const Chat = ({ chatId }: { chatId: string }) => {
  const { isLoggedIn } = useSession();
  const { isConnected } = useAccount();
  const { connect } = useAuth();

  const { data: chat, isLoading } = useQuery({
    queryKey: ['chat', chatId],
    queryFn: () => {
      if (!!chatId) return fetchChat(chatId);
    },
    enabled: !!chatId && isLoggedIn,
  });

  if (!chatId) return <div>Chat ID is missing</div>;

  if (!isLoggedIn)
    return !isConnected ? (
      <div>Connect wallet</div>
    ) : (
      <Button onClick={connect}>Sign In</Button>
    );

  if (isLoading) return <div>Loading...</div>;

  return chat ? (
    <ChatMessages initialMessages={chat.messages} id={chat.id} />
  ) : (
    <div>Chat not found</div>
  );
};

const ChatMessages = ({
  initialMessages,
  id,
}: {
  initialMessages: AiMessage[];
  id: string;
}) => {
  const { messages, error, setInput, input, isLoading, reload, handleSubmit } = useChat({
    initialMessages,
    id,
    body: {
      id,
    },
    fetch: (input, init) => {
      return fetch(`${PRESAGIO_CHAT_API_URL}/api/chat/${id}`, {
        ...init,
        method: 'PUT',
        credentials: 'include',
      });
    },
  });

  const parseAnswer = (message: AiMessage) => {
    if (typeof message.content !== 'string' || message.role === 'user') return message;
    if (!isJSON(message.content)) return message;
    console.log('message', message);

    const contentJSON = JSON.parse(message.content) as {
      reasoning: string;
      outcome: string;
      confidence: string;
    };

    return {
      role: message.role,
      content: contentJSON,
    };
  };

  const parsedMessages = messages.map(msg => parseAnswer(msg));

  return (
    <div className="shadow-md flex h-[calc(100vh-208px)] w-full max-w-3xl flex-col items-center space-y-4">
      <ScrollArea>
        <div className="w-full space-y-4">
          {parsedMessages.map((msg, index) => {
            const content = msg.content as
              | string
              | { reasoning: string; outcome: string; confidence: string };
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
      <div className="absolute bottom-10 flex w-full max-w-3xl space-x-3 py-4">
        <Input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask anything"
          disabled={isLoading}
          className="w-full"
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
        <Button onClick={isLoading ? undefined : handleSubmit} disabled={isLoading}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
