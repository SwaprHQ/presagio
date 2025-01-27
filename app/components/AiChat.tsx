'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ScrollArea } from '@/app/components';
import aiStarsSvg from '@/public/ai-stars.svg';
import wizardSvg from '@/public/pixel-wizard.svg';
import { cx } from 'class-variance-authority';
import { Address } from 'viem';
import { Icon, IconButton, Input } from '@swapr/ui';
import { twMerge } from 'tailwind-merge';

interface AiChatProps {
  id: Address;
}

const MARKETING_LINK =
  'https://swpr.notion.site/Presagio-AI-f4ccdfa867e949d3badf10705b7c90aa';

type Role = 'user' | 'system';

interface Message {
  content: string;
  role: Role;
}

const mockMessages: Message[] = [
  {
    role: 'user',
    content:
      '  Will Samsung announce the consumer release date for the Project Moohan XR headset by January 28, 2025?',
  },
  {
    role: 'system',
    content: `Based on the information provided, I'd say the odds are against it.
    The market is showing a 34% chance of "Yes" and a 66% chance of "No",
    indicating that the majority of predictors believe Samsung will not
    announce the consumer release date by January 28, 2025. Considering
    the Project Moohan XR headset was announced in December 2024, and the
    exact consumer release date remains unspecified, it's possible that
    Samsung might not be ready to make an official announcement just a
    month later. Given the current odds and the lack of information on a
    specific release date, I'd predict that Samsung will not announce the
    consumer release date for the Project Moohan XR headset by January 28,
    2025.
    `,
  },
];

export const AiChat = ({ id }: AiChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  console.log('id:', id);

  const [messages, setMessages] = useState(mockMessages);

  console.log('setMessages:', setMessages);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [scrollAreaRef]);

  // const [input, setInput] = useState('');

  // const handleSubmit = (e: FormEvent) => {
  //   e.preventDefault();
  //   if (!input.trim()) return;

  //   setMessages(prev => [
  //     ...prev,
  //     { role: 'user', content: input },
  //     { role: 'system', content: 'system response.' },
  //   ]);
  //   setInput('');
  // };

  return (
    <>
      <div className="fixed bottom-10 flex w-full items-center justify-end px-2 md:px-6">
        <div className="flex flex-col items-end">
          {isOpen && (
            <div className="rounded-lg relative mb-2 w-full rounded-16 border border-outline-base-em bg-surface-surface-0 shadow-2 md:w-[420px]">
              <div className="border-b border-outline-low-em p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Image alt="ai stars" width={14} height={14} src={aiStarsSvg}></Image>
                    <p className="font-semibold">Ask Wizard</p>
                  </div>
                  <IconButton
                    size="sm"
                    className="rotate-90"
                    variant="ghost"
                    name="arrow-double-right"
                    onClick={() => setIsOpen(false)}
                  />
                </div>
              </div>
              <ScrollArea className="h-[460px] md:h-[520px]">
                <div className="space-y-4 p-4">
                  {messages.map(message => (
                    <Message key={message.content.slice(20)} role={message.role}>
                      {message.content}
                    </Message>
                  ))}
                </div>
              </ScrollArea>
              <div className="absolute bottom-0 w-full rounded-b-16 p-4 backdrop-blur-md">
                <div className="flex items-center justify-center">
                  <a href={MARKETING_LINK} className="hover:underline" target="_blank">
                    Learn more about Presagio AI
                  </a>
                  <Icon name="arrow-top-right" size={12} />
                </div>
                <Input
                  placeholder="Ask follow up questions. Available soon"
                  className="w-full"
                  disabled
                />
              </div>
            </div>
          )}
          <button
            className={twMerge(
              'flex size-16 items-center justify-center rounded-100 bg-transparent shadow-1 outline-outline-primary-low-em backdrop-blur-md transition-colors duration-700 hover:bg-outline-primary-base-em focus:bg-outline-primary-base-em',
              isOpen && 'bg-outline-primary-base-em shadow-2'
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Image alt="ai stars" width={42} height={42} src={wizardSvg}></Image>
          </button>
        </div>
      </div>
    </>
  );
};

interface MessageProps {
  children: React.ReactNode;
  role: Role;
}

const Message = ({ children, role }: MessageProps) => {
  const isSystem = role === 'system';
  return (
    <div
      className={cx(
        'rounded-20 p-2',
        isSystem ? 'bg-outline-primary-base-em' : 'bg-surface-surface-1'
      )}
    >
      {children}
    </div>
  );
};
