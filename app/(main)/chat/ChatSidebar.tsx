'use client';

import { ButtonLink, Icon } from '@swapr/ui';
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

  const { data: chats, isLoading } = useQuery({
    queryKey: ['chats', userId],
    queryFn: () => {
      if (!!userId) return fetchChats(userId);
    },
    enabled: !!userId && isLoggedIn,
  });

  if (isLoading)
    return (
      <Sidebar
        className="bg-transaparent absolute top-[80px] h-screen border-transparent"
        {...props}
      >
        <SidebarHeader>
          <SidebarMenu>
            <p className="truncate p-2 !text-lg font-semibold">Previous chats</p>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent></SidebarContent>
      </Sidebar>
    );

  if (!chats) {
    return (
      <Sidebar
        className="bg-transaparent absolute top-[80px] h-screen border-transparent"
        {...props}
      >
        <SidebarHeader>
          <SidebarMenu>
            <p className="truncate p-2 !text-lg font-semibold">Previous chats</p>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <p className="truncate p-2 !text-md">No chats found</p>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar
      className="bg-transaparent absolute top-[80px] h-screen border-transparent"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <ButtonLink variant="outline" size="sm" href="/chat/new">
            New chat
          </ButtonLink>
        </SidebarMenu>
        <SidebarMenu>
          <p className="truncate p-2 !text-lg font-semibold">Previous chats</p>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {chats.length ? (
            chats.map(({ id, title }) => (
              <SidebarMenuItem key={id}>
                <SidebarMenuButton asChild size="lg" className="!text-md">
                  <a href={`/chat?id=${id}`}>
                    <Icon name="chevron-right" />
                    <span>{title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
          ) : (
            <SidebarMenuItem>
              <p className="truncate !text-lg font-semibold">No chats yet</p>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
