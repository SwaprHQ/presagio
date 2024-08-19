'use client';

import { ButtonLink, Icon, Tag } from '@swapr/ui';
import { Market } from '@/entities';
import { FixedProductMarketMaker } from '@/queries/omen';
import { Swapbox } from '@/app/components';
import { KLEROS_URL, REALITY_QUESTION_URL } from '@/constants';

export const Bet = ({ market }: { market: FixedProductMarketMaker }) => {
  const marketModel = new Market(market);

  if (!marketModel.isClosed && marketModel.hasLiquidity)
    return <Swapbox market={market} />;

  if (!market.isPendingArbitration && marketModel.answer === null && marketModel.isClosed)
    return (
      <div className="flex flex-col items-center space-y-6 p-8">
        <p className="text-md">
          Answer still <span className="font-semibold">pending</span>.
        </p>
        {market.question && (
          <ButtonLink
            href={`${REALITY_QUESTION_URL}${market.question.id}`}
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

  if (market.isPendingArbitration)
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
