'use client';

import { ButtonLink } from '@swapr/ui';
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
import { Spinner } from '@/app/components';
import { useSearchParams } from 'next/navigation';

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
          <ButtonLink variant="outline" size="sm" href="/chat/new">
            New chat
          </ButtonLink>
        </SidebarMenu>
        {!isLoading && (
          <SidebarMenu>
            <p className="truncate px-5 !text-md font-semibold">Previous chats</p>
          </SidebarMenu>
        )}
      </SidebarHeader>
      <SidebarContent>
        {isLoading ? (
          <Spinner className="mx-auto mt-4 h-5 w-5 animate-spin" />
        ) : chats ? (
          <SidebarMenu className="my-1">
            {chats.length ? (
              chats.map(({ id, title }) => (
                <SidebarMenuItem key={id} className="px-4">
                  <SidebarMenuButton
                    size="md"
                    width="full"
                    variant="ghost"
                    className="justify-start overflow-hidden text-nowrap"
                    href={`/chat?id=${id}`}
                    active={chatId === id}
                  >
                    <p className="truncate">{title}</p>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            ) : (
              <SidebarMenuItem>
                <p className="truncate !text-lg font-semibold">No chats found</p>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        ) : (
          <SidebarMenu>
            <p className="truncate p-2 !text-md">No chats found</p>
          </SidebarMenu>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
