'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, IconButton, Input } from '@swapr/ui';
import { useSession } from '../../../../context/SessionContext';
import { useAccount } from 'wagmi';
import { useAuth } from '../../../../hooks/useAuth';
import { Textarea } from '../../../components/ui/Textarea';

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

  if (!isLoggedIn) return null;

  return (
    <div className="mx-auto mt-80 w-full max-w-2xl p-4">
      <div className="space-y-10">
        <div className="space-y-2">
          <p className="text-2xl font-bold">Hello, I&apos;m Presagio</p>
          <p className="text-lg font-bold text-text-low-em">
            Get insights powered by AI with confidence predictions markets.
          </p>
        </div>
        <div className="flex w-full space-x-2 rounded-12 bg-surface-surface-3 p-3">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask me about the future..."
            disabled={isLoading}
            className="h-24 w-full resize-none bg-transparent text-md outline-none placeholder:font-semibold" //try field-sizing-content with tailwindcss@4
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
}
