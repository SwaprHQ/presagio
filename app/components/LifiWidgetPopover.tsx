'use client';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@swapr/ui';
import { LifiWidget } from '@/app/components/LifiWidget';
import { SDAI } from '@/constants';
import { TokenLogo } from '@/app/components/TokenLogo';

export const LifiWidgetPopover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="pastel" className="space-x-2 text-nowrap" onClick={() => {}}>
          <p>Get {SDAI.symbol}</p>
          <TokenLogo address={SDAI.address} size="xs" className="hidden md:block" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-80 px-4 md:max-w-lg">
        <LifiWidget />
      </PopoverContent>
    </Popover>
  );
};
