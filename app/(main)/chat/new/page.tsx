'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@swapr/ui';
import { useSession } from '../../../../context/SessionContext';
import { useAccount } from 'wagmi';
import { useAuth } from '../../../../hooks/useAuth';

const PRESAGIO_CHAT_API_URL = process.env.NEXT_PUBLIC_PRESAGIO_CHAT_API_URL!;

export default function NewChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const router = useRouter();
  const { isLoggedIn } = useSession();
  const { isConnected } = useAccount();
  const { connect } = useAuth();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(PRESAGIO_CHAT_API_URL + '/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const chat = await response.json();

      setIsLoading(false);
      setInput('');
      router.push('/chat?id=' + chat.chatId);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!isLoggedIn)
    return !isConnected ? (
      <div>Connect wallet</div>
    ) : (
      <Button onClick={connect}>Sign In</Button>
    );

  return (
    <div className="mx-auto max-w-2xl p-4">
      <div className="flex space-x-3">
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
}
