'use client';

import Image from 'next/image';
import { PropsWithChildren, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn, ConnectButton, MarkdownRenderer, ScrollArea } from '@/app/components';
import wizardSvg from '@/public/pixel-wizard.svg';
import { Button, Icon, IconButton, Tag } from '@swapr/ui';
import { twMerge } from 'tailwind-merge';
import { FA_EVENTS } from '@/analytics';
import { trackEvent } from 'fathom-client';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { useAuth } from '../../hooks/useAuth';
import { useSession } from '../../context/SessionContext';

interface AiBaseProps extends PropsWithChildren {
  messages: any[];
  trackOnClickEvents: string[];
  isChatOpen?: boolean;
  id?: string;
  marketTitle?: string | null;
}

export const AiChatBase = ({
  children,
  messages,
  trackOnClickEvents,
  isChatOpen,
  id,
  marketTitle,
}: AiBaseProps) => {
  const [isOpen, setOpen] = useState(isChatOpen);
  const [scrollAreaElement, setScrollAreaElement] = useState<HTMLDivElement | null>(null);

  const router = useRouter();
  const { isConnected } = useAccount();
  const { connect } = useAuth();
  const { isLoggedIn } = useSession();

  useEffect(() => {
    if (scrollAreaElement) scrollAreaElement.scrollTop = scrollAreaElement.scrollHeight;
  }, [messages, isOpen, scrollAreaElement]);

  const startChat = async () => {
    if (!id || !marketTitle) {
      trackEvent(FA_EVENTS.AI_CHAT.NEW);
      router.push('/chat/new');
    }

    try {
      const createChatResponse = await fetch(
        process.env.NEXT_PUBLIC_PRESAGIO_CHAT_API_URL + '/api/chat',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ marketId: id, message: marketTitle }),
        }
      );

      if (!createChatResponse.ok) {
        throw new Error('Failed to create chat');
      }

      const chat = await createChatResponse.json();
      trackEvent(FA_EVENTS.AI_CHAT.CREATE(chat.chatId));
      router.push('/chat?id=' + chat.chatId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog.Root onOpenChange={isOpen => setOpen(isOpen)} open={isOpen} modal>
      <div className="fixed bottom-4 right-2 flex w-full items-center justify-end px-2 md:bottom-10 md:right-0 md:px-6">
        <div className="flex flex-col items-end">
          <Dialog.Portal>
            <Dialog.Content className="fixed bottom-20 right-0 z-50 w-full origin-bottom-right rounded-16 border border-outline-base-em bg-surface-surface-0 shadow-2 data-[state=open]:animate-grow md:bottom-28 md:right-4 md:w-[420px]">
              <Dialog.Description hidden={true}>
                Presagio chatbot window
              </Dialog.Description>
              <div className="border-b border-outline-low-em p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon
                      name="stars"
                      size={14}
                      alt="ai stars"
                      className="text-text-primary-med-em"
                    />
                    <Dialog.DialogTitle className="font-medium">
                      Ask Wizard
                    </Dialog.DialogTitle>
                    <Tag size="xs" colorScheme="info">
                      Experimental
                    </Tag>
                  </div>
                  <Dialog.Close asChild>
                    <IconButton
                      size="xs"
                      className="rotate-90"
                      variant="ghost"
                      name="arrow-double-right"
                    />
                  </Dialog.Close>
                </div>
              </div>
              <ScrollArea ref={setScrollAreaElement} className="h-[460px] md:h-[536px]">
                <div className="space-y-1.5 px-4 pb-32 pt-4">{children}</div>
              </ScrollArea>
              <div className="absolute bottom-0 w-full rounded-b-16 border-t border-surface-surface-1 bg-surface-surface-0 px-4 py-4">
                {!isConnected ? (
                  <ConnectButton width="full">Connect to chat</ConnectButton>
                ) : !isLoggedIn ? (
                  <Button width="full" onClick={connect}>
                    Sign in to chat
                  </Button>
                ) : (
                  <Button width="full" onClick={startChat}>
                    <p>Start chat</p>
                  </Button>
                )}
                <p className="mt-1 w-full text-center text-xs text-text-low-em">
                  AI-generated, for reference only.
                </p>
              </div>
            </Dialog.Content>
          </Dialog.Portal>

          <Dialog.Trigger asChild>
            <button
              onClick={() => {
                trackOnClickEvents.map(event => trackEvent(event));
              }}
              className="group relative flex size-12 items-center justify-center rounded-100 p-0.5 shadow-1 outline-outline-primary-med-em duration-500 hover:scale-105 md:size-14"
            >
              <span
                className={twMerge(
                  'absolute inset-0 animate-border-rotate rounded-100 border-0 bg-gradient-border group-hover:animate-border-rotate-fast',
                  isOpen && 'animate-none bg-outline-primary-low-em'
                )}
              />
              <div
                className={twMerge(
                  'relative flex h-full w-full items-center justify-center rounded-100 bg-surface-white focus:bg-outline-primary-base-em dark:bg-surface-black',
                  isOpen && 'bg-outline-primary-base-em shadow-2'
                )}
              >
                <Image
                  alt="ai wizard"
                  width={42}
                  height={42}
                  src={wizardSvg}
                  className="w-7 md:w-9"
                />
              </div>
            </button>
          </Dialog.Trigger>
        </div>
      </div>
    </Dialog.Root>
  );
};

type Role = 'user' | 'assistant';

export interface Message {
  content: string;
  role: Role;
}

interface MessageProps extends PropsWithChildren {
  role: string;
}

export const Message = ({ children, role }: MessageProps) => {
  const isAssistant = role === 'assistant';
  return (
    <MarkdownRenderer
      className={cn(
        'w-[90%] rounded-20 px-4 py-2',
        isAssistant ? 'mr-auto bg-outline-primary-low-em' : 'ml-auto bg-surface-surface-1'
      )}
    >
      {children}
    </MarkdownRenderer>
  );
};

interface MessageCardProps extends PropsWithChildren {
  title: string;
}

export const MessageCard = ({ title, children }: MessageCardProps) => {
  return (
    <div className="min-w-40 space-y-1 rounded-20 bg-outline-primary-low-em p-4">
      <p className="text-sm font-medium uppercase text-text-low-em">{title}</p>
      <p className="text-md font-medium uppercase">{children}</p>
    </div>
  );
};
