'use client';

import { Button, Icon } from '@swapr/ui';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/app/components/ui/Sidebar';
import { useSession } from '@/context/SessionContext';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { trackEvent } from 'fathom-client';
import { FA_EVENTS } from '@/analytics';

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

export function ChatSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isLoggedIn, userId } = useSession();
  const searchParams = useSearchParams();
  const chatId = searchParams.get('id');

  const { data: chats, isLoading } = useQuery({
    queryKey: ['chats', userId],
    queryFn: () => {
      if (!!userId) return fetchChats(userId);
    },
    enabled: !!userId && isLoggedIn,
  });

  return (
    <Sidebar className="absolute top-[80px] h-screen" {...props}>
      <SidebarHeader className="mt-3 space-y-3">
        <SidebarMenu>
          <Link href="/chat/new">
            <Button
              variant="neutral"
              size="sm"
              width="full"
              onClick={() => trackEvent(FA_EVENTS.AI_CHAT.NEW)}
            >
              New chat
            </Button>
          </Link>
        </SidebarMenu>
        {!isLoading && (
          <SidebarMenu>
            <p className="truncate px-5 text-sm font-medium">Previous chats</p>
          </SidebarMenu>
        )}
      </SidebarHeader>
      <SidebarContent>
        {isLoading ? (
          <Icon name="spinner" size={20} className="mx-auto mt-4 animate-spin" />
        ) : (
          <SidebarMenu className="my-1">
            {chats?.length ? (
              chats.map(({ id, title }) => (
                <SidebarMenuItem key={id} className="px-4">
                  <SidebarMenuButton
                    size="md"
                    width="full"
                    variant="ghost"
                    className="justify-start"
                    href={`/chat?id=${id}`}
                    active={chatId === id}
                    onClick={() => trackEvent(FA_EVENTS.AI_CHAT.OPEN(id))}
                  >
                    <p className="truncate">{title}</p>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            ) : (
              <SidebarMenuItem>
                <p className="px-7 text-text-med-em">No chats yet</p>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
