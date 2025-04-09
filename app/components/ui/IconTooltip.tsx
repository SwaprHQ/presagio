'use client';

import { PropsWithChildren } from 'react';

import { Icon, IconName, Tooltip, TooltipContent, TooltipTrigger } from '@swapr/ui';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

export const iconTooltipStyles = cva(
  ['flex items-center gap-1 rounded-6 border px-2 py-1.5 text-sm font-semibold'],
  {
    variants: {
      iconName: {
        info: [
          'border-surface-info-high-em bg-surface-info-low-em text-surface-info-high-em',
        ],
        warning: [
          'border-surface-warning-high-em bg-surface-warning-low-em text-surface-warning-high-em',
        ],
      },
    },
    defaultVariants: {
      iconName: 'info',
    },
  }
);

type IconTooltipName = 'warning' | 'info';
interface IconTooltipProps extends PropsWithChildren {
  iconName: IconTooltipName;
}

export const IconTooltip = ({ iconName, children }: IconTooltipProps) => (
  <Tooltip>
    <TooltipTrigger>
      <div className={twMerge(iconTooltipStyles({ iconName }))}>
        <Icon name={iconName as IconName} size={16} />
      </div>
    </TooltipTrigger>
    <TooltipContent className="bg-surface-surface-0">{children}</TooltipContent>
  </Tooltip>
);
