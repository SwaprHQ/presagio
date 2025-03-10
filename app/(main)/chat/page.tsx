'use client';

import { useSearchParams } from 'next/navigation';
import Chat from './Chat';

export default function ChatPage() {
  const searchParams = useSearchParams();

  const id = searchParams.get('id')?.toLocaleLowerCase();

  if (!id)
    return (
      <main className="mt-12 flex w-full flex-col items-center px-6">
        <div>Chat not found</div>
      </main>
    );

  return (
    <main className="flex w-full flex-col items-center px-6">
      <Chat chatId={id} />
    </main>
  );
}
