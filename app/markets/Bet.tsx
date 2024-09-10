'use client';

import { ButtonLink, Icon, Tag } from '@swapr/ui';
import { Market } from '@/entities';
import { FixedProductMarketMaker } from '@/queries/omen';
import { Swapbox } from '@/app/components';
import { KLEROS_URL, REALITY_QUESTION_URL } from '@/constants';

interface BetProps {
  fixedProductMarketMaker: FixedProductMarketMaker;
}

export const Bet = ({ fixedProductMarketMaker }: BetProps) => {
  const marketModel = new Market(fixedProductMarketMaker);

  if (!marketModel.isClosed && marketModel.hasLiquidity)
    return <Swapbox fixedProductMarketMaker={fixedProductMarketMaker} />;

  if (
    !fixedProductMarketMaker.isPendingArbitration &&
    marketModel.currentAnswer === null &&
    marketModel.isClosed
  )
    return (
      <div className="flex flex-col items-center space-y-6 p-8">
        <p className="text-md">
          Answer still <span className="font-semibold">pending</span>.
        </p>
        {fixedProductMarketMaker.question && (
          <ButtonLink
            href={`${REALITY_QUESTION_URL}${fixedProductMarketMaker.question.id}`}
            target="_blank"
            width="fit"
            className="flex items-center space-x-1"
            variant="ghost"
          >
            <span>Submit answer</span>
            <Icon name="arrow-top-right" size={16} />
          </ButtonLink>
        )}
      </div>
    );

  if (fixedProductMarketMaker.isPendingArbitration)
    return (
      <div className="flex flex-col items-center space-y-6 p-8">
        <p className="text-md">
          Result is being <span className="font-semibold">disputed</span>.
        </p>
        <ButtonLink
          href={KLEROS_URL}
          target="_blank"
          width="fit"
          className="flex items-center space-x-1"
          variant="ghost"
        >
          <span>More about disputes</span>
          <Icon name="arrow-top-right" size={16} />
        </ButtonLink>
      </div>
    );

  if (!marketModel.isAnswerFinal && marketModel.currentAnswer !== null)
    return (
      <div className="flex flex-col items-center space-y-8 p-8">
        <div className="flex items-center space-x-2">
          <span>Current winner outcome is</span>
          <Tag
            className="w-fit uppercase"
            colorScheme={marketModel.currentAnswer === 0 ? 'success' : 'danger'}
          >
            {marketModel.outcomes[marketModel.currentAnswer]?.name}
          </Tag>
        </div>
        <div className="flex w-full flex-col items-center space-y-2 rounded-12 bg-surface-surface-1 py-4">
          <span>Is this result incorrect?</span>
          {fixedProductMarketMaker.question && (
            <ButtonLink
              href={`${REALITY_QUESTION_URL}${fixedProductMarketMaker.question.id}`}
              target="_blank"
              width="fit"
              className="flex items-center space-x-1"
              variant="ghost"
            >
              <span>Submit new answer</span>
              <Icon name="arrow-top-right" size={16} />
            </ButtonLink>
          )}
        </div>
      </div>
    );

  if (marketModel.answer !== null)
    return (
      <div className="flex flex-col items-center p-8">
        <div className="flex items-center space-x-2">
          <Tag
            className="w-fit uppercase"
            colorScheme={marketModel.isWinner(0) ? 'success' : 'danger'}
          >
            {marketModel.getWinnerOutcome()?.name}
          </Tag>
          <span>is the winner outcome 🎉</span>
        </div>
      </div>
    );

  return <div className="p-8 text-center text-md">Market is currently closed.</div>;
};
