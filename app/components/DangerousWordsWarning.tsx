'use client';

import { Icon, Tooltip, TooltipContent, TooltipTrigger } from '@swapr/ui';

export const DangerousWordsWarning = () => (
  <Tooltip>
    <TooltipTrigger>
      <div className="flex items-center gap-1 rounded-6 border-2 border-text-danger-main bg-text-danger-em px-2 py-1.5 text-sm font-semibold text-outline-warning-base-em">
        <Icon name="warning" size={16} />
      </div>
    </TooltipTrigger>
    <TooltipContent className="bg-surface-surface-0">
      <p>This market may be inappropriate to bet on.</p>
      <p>
        We <strong>do not endorse or control</strong> the creation of these markets.
      </p>
    </TooltipContent>
  </Tooltip>
);
