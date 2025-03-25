'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconButton } from '@swapr/ui';
import { useSession } from '../../../../context/SessionContext';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import wizardSvg from '@/public/pixel-wizard.svg';

const PRESAGIO_CHAT_API_URL = process.env.NEXT_PUBLIC_PRESAGIO_CHAT_API_URL!;

const createChat = async (message: string): Promise<{ chatId: string }> => {
  const response = await fetch(PRESAGIO_CHAT_API_URL + '/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const errorMessage = await response.json();
    console.log(errorMessage);
    throw new Error(errorMessage);
  }

  return response.json();
};

export default function NewChat() {
  const [input, setInput] = useState('');
  const router = useRouter();
  const { isLoggedIn, loading } = useSession();

  const mutation = useMutation({
    mutationFn: createChat,
    onSuccess: chat => {
      setInput('');
      router.push('/chat?id=' + chat.chatId);
    },
    onError: error => {
      console.error('Error:', error);
    },
  });

  const submit = () => mutation.mutate(input);

  if (!isLoggedIn || loading) return null;

  const errorMessage =
    mutation?.error?.message === 'Invalid question'
      ? "Sorry but what you are trying to ask can't be answered with a prediciton."
      : 'Somthing went wrong in my research. Please try again.';

  return (
    <div className="mx-auto mt-80 w-full max-w-2xl p-4">
      <div className="space-y-10">
        <div className="space-y-2">
          <div className="flex space-x-3">
            <Image
              alt="ai wizard"
              width={28}
              height={28}
              src={wizardSvg}
              className="w-7 md:w-9"
            />
            <p className="text-2xl font-bold">Hello, I&apos;m the wizard</p>
          </div>
          <p className="text-lg font-bold text-text-low-em">
            Get predicitons powered by our AI wizard.
          </p>
        </div>
        <div>
          <div className="flex w-full space-x-2 rounded-12 bg-surface-surface-3 p-3">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask me about the future..."
              disabled={mutation.isPending}
              className="h-24 w-full resize-none bg-transparent text-md outline-none placeholder:font-semibold" //try field-sizing-content with tailwindcss@4
              onKeyDown={event => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();

                  if (mutation.isPending) {
                    console.error('Please wait for the model to finish its response!');
                  } else {
                    submit();
                  }
                }
              }}
            />
            <IconButton
              onClick={mutation.isPending ? undefined : submit}
              disabled={mutation.isPending}
              name="arrow-up"
              variant="pastel"
              className="size-10 rounded-100"
            />
          </div>
          {mutation.isPending && (
            <p className="text-md text-text-med-em">
              Await fellow internaut, let me research thorugh my books to find your
              answer...
            </p>
          )}
          {mutation.isError && (
            <p className="text-md text-text-danger-main">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}
