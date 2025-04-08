'use client';

import { AiChatBase, MarketThumbnail, Message } from '@/app/components';
import { FA_EVENTS } from '@/analytics';
import { FixedProductMarketMaker } from '@/queries/omen';
import Link from 'next/link';
import { Icon } from '@swapr/ui';

interface AiChatLandingProps {
  markets?: FixedProductMarketMaker[];
}

const trackOnClickEvents = [FA_EVENTS.AI_CHAT.WIZARD.OPEN];

const randomMarket = (markets: FixedProductMarketMaker[]) =>
  markets[Math.floor(Math.random() * markets.length)];

export const AiChatLanding = ({ markets }: AiChatLandingProps) => {
  const wizardMessages = [
    {
      role: 'assistant',
      content: 'Have a glimpse of upcoming prediction chat',
    },
    {
      role: 'assistant',
      content: 'Try it now, click on the market bellow 👇',
    },
  ];

  const defaultMarket = {
    title:
      'Will users in April 2027 pay more for regular transaction or for blob space on Ethereum',
    id: '0xaa1c93b800a8d2b47499042af76bb9d6ff062cd7',
  };

  const market = markets && markets.length > 0 ? randomMarket(markets) : defaultMarket;

  return (
    <AiChatBase messages={wizardMessages} trackOnClickEvents={trackOnClickEvents}>
      {wizardMessages.map((message, index) => (
        <Message key={index} role={message.role}>
          {message.content}
        </Message>
      ))}
      {market && <MessageMarketCard title={market.title!} id={market.id!} />}
    </AiChatBase>
  );
};

export default AiChatLanding;

interface MessageMarketCardProps {
  title: string;
  id: string;
}

const MessageMarketCard = ({ id, title }: MessageMarketCardProps) => {
  return (
    <div className="min-w-40 space-y-1 rounded-20 bg-outline-primary-base-em hover:bg-outline-primary-low-em">
      <Link key={id} href={`markets?id=${id}&chatOpen=true`}>
        <div className="flex space-x-3 p-2">
          {id && (
            <MarketThumbnail
              width={140}
              height={140}
              className="size-[100px] rounded-12"
              marketId={id}
            />
          )}
          {title && <div className="hover:underline">{title}</div>}
        </div>
        <div className="mt-1.5 flex items-center justify-center space-x-1 rounded-b-20 bg-outline-primary-low-em p-1">
          <p>Open market</p>
          <Icon name="arrow-top-right" />
        </div>
      </Link>
    </div>
  );
};
