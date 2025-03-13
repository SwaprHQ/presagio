'use client';

import Link from 'next/link';
import { useSession } from '@/context/SessionContext';
import { useQuery } from '@tanstack/react-query';

interface Chat {
  id: string;
  title: string;
}

const fetchChats = async (userId: string): Promise<Chat[]> => {
  const response = await fetch(PRESAGIO_CHAT_API_URL + `/api/user/${userId}/chats`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to fetch chats');
  return response.json();
};

const PRESAGIO_CHAT_API_URL = process.env.NEXT_PUBLIC_PRESAGIO_CHAT_API_URL!;

export default function ChatList() {
  const { isLoggedIn, userId } = useSession();

  const { data: chats } = useQuery({
    queryKey: ['chats', userId],
    queryFn: () => {
      if (!!userId) return fetchChats(userId);
    },
    enabled: !!userId && isLoggedIn,
  });

  if (!chats) {
    return null;
  }

  return (
    <div className="max-w-md flex-shrink-0">
      <ul className="divide-y divide-outline-high-em">
        {chats.map(chat => (
          <li key={chat.id}>
            <Link
              href={`/chat?id=${chat.id}`}
              className="block cursor-pointer p-4 transition-colors hover:bg-surface-surface-1"
            >
              <h3 className="font-medium text-text-high-em">{chat.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
