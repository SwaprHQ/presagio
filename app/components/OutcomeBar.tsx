'use client';

import { FixedProductMarketMaker } from '@/queries/omen';
import { cx } from 'class-variance-authority';
import { Outcome } from '@/entities';

interface OutcomeBarProps {
  market: FixedProductMarketMaker;
}

export const OutcomeBar = ({ market }: OutcomeBarProps) => {
  const outcome0 = new Outcome(
    0,
    market.outcomes?.[0] || 'Option 1',
    market.id,
    market.outcomeTokenMarginalPrices?.[0],
    market.question?.currentAnswer
  );
  const outcome1 = new Outcome(
    1,
    market.outcomes?.[1] || 'Option 2',
    market.id,
    market.outcomeTokenMarginalPrices?.[1],
    market.question?.currentAnswer
  );

  return (
    <div className="space-y-1">
      <div className="flex space-x-1">
        {outcome0.percentage !== '0' && (
          <div
            className={cx(
              'flex h-3 items-center rounded-s-8 px-2',
              outcome0.percentage ? 'bg-surface-success-accent-2' : 'bg-outline-low-em',
              outcome1.percentage === '0' && 'rounded-e-8'
            )}
            style={{
              width: outcome0.percentage ? `${outcome0.percentage}%` : '50%',
            }}
          />
        )}
        {outcome1.percentage !== '0' && (
          <div
            className={cx(
              'flex h-3 items-center rounded-e-8 px-2',
              outcome1.percentage ? 'bg-surface-danger-accent-2' : 'bg-outline-low-em',
              outcome0.percentage === '0' && 'rounded-s-8'
            )}
            style={{
              width: outcome1.percentage ? `${outcome1.percentage}%` : '50%',
            }}
          />
        )}
      </div>

      <div className="flex justify-between text-sm font-semibold">
        <p className="w-full uppercase text-text-success-main">{`${outcome0.symbol} ${outcome0.percentage || '-'}%`}</p>
        <p className="w-full text-right uppercase text-text-danger-main">
          {`${outcome1.symbol} ${outcome1.percentage || '-'}%`}
        </p>
      </div>
    </div>
  );
};
