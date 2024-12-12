'use client';

import { cx } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

import { OUTCOME_TAG_COLORS_SCHEME } from '@/constants';
import { Market } from '@/entities';
import { Tag } from '@swapr/ui';

interface OutcomeTagProps {
  className?: string;
  hasBorder?: boolean;
  outcomeAnswer: number;
  outcomeName: string;
}

const OUTCOME_TAG_BORDER_COLORS = {
  0: 'border-outline-success-high-em',
  1: 'border-outline-danger-high-em',
  [Market.INVALID_ANSWER]: 'none',
};

export const OutcomeTag = ({
  className,
  hasBorder,
  outcomeAnswer,
  outcomeName,
}: OutcomeTagProps) => (
  <Tag
    className={cx(twMerge('w-fit uppercase', className), {
      [OUTCOME_TAG_BORDER_COLORS[outcomeAnswer]]: hasBorder,
    })}
    colorScheme={OUTCOME_TAG_COLORS_SCHEME[outcomeAnswer]}
  >
    {outcomeAnswer === Market.INVALID_ANSWER ? 'Invalid' : outcomeName}
  </Tag>
);
