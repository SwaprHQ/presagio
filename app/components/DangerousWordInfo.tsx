'use client';

import { cx } from 'class-variance-authority';

import { Icon, Tooltip, TooltipContent, TooltipTrigger } from '@swapr/ui';

interface DangerousWordInfoProps {
  small?: boolean;
}

export const DangerousWordInfo = ({ small }: DangerousWordInfoProps) => (
  <Tooltip>
    <TooltipTrigger>
      <div
        className={cx(
          'flex items-center gap-1 rounded-12 border-2 border-text-danger-main bg-text-danger-em px-2 py-1.5 text-sm font-semibold text-outline-warning-base-em',
          {
            'rounded-6': small,
          }
        )}
      >
        <Icon name="warning" size={16} />
        {!small && <p>Potentially inappropriate</p>}
      </div>
    </TooltipTrigger>
    <TooltipContent className="bg-surface-surface-0">
      <p>This market name contains words that may be considered inappropriate.</p>
      <p>
        We <strong>do not endorse or control</strong> the creation of these markets.
      </p>
    </TooltipContent>
  </Tooltip>
);
