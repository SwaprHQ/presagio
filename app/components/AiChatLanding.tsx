'use client';

import { Fragment } from 'react';
import { AiChatBase, Message } from '@/app/components';
import { FA_EVENTS } from '@/analytics';
import { FixedProductMarketMaker } from '@/queries/omen';

interface AiChatLandingProps {
  markets?: FixedProductMarketMaker[];
}

const trackOnClickEvents = [FA_EVENTS.AI_CHAT.LANDING.OPEN];

export const AiChatLanding = ({ markets }: AiChatLandingProps) => {
  const wizardMessages = [
    {
      role: 'assistant',
      content: "We're not live yet, but you can have a glimpse",
    },
    {
      role: 'assistant',
      content: 'Try it right now, click on the market bellow 👇',
    },
    {
      role: 'assistant',
      content:
        markets && markets.length > 0
          ? `[${markets[0].title}](/markets?id=${markets[0].id})`
          : `[Will users in April 2027 pay more for regular transaction or for blob space on Ethereum](/markets?id=0xaa1c93b800a8d2b47499042af76bb9d6ff062cd7)`,
    },
  ];

  return (
    <AiChatBase messages={wizardMessages} trackOnClickEvents={trackOnClickEvents}>
      {wizardMessages.map((message, index) => (
        <Fragment key={index}>
          <Message role={message.role}>{message.content}</Message>
        </Fragment>
      ))}
    </AiChatBase>
  );
};

export default AiChatLanding;
