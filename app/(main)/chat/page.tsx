'use client';

import { useSearchParams } from 'next/navigation';
import Chat from './Chat';
import { useSession } from '../../../context/SessionContext';

export default function ChatPage() {
  const searchParams = useSearchParams();
  const { isLoggedIn } = useSession();

  const id = searchParams.get('id')?.toLocaleLowerCase();

  if (!isLoggedIn) return null;

  if (!id)
    return (
      <main className="mt-12 flex w-full flex-col items-center px-6">
        <div>Chat not found</div>
      </main>
    );

  return (
    <main className="flex h-full w-full flex-col items-center px-4">
      <Chat chatId={id} />
    </main>
  );
}
