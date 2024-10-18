'use client';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@swapr/ui';
import { APP_NAME, ChainId, RPC_LIST, SDAI } from '@/constants';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';
import { Appearance, LiFiWidget, WidgetConfig } from '@lifi/widget';

export const LifiWidgetPopover = () => {
  const { theme } = useTheme();

  const widgetConfig: WidgetConfig = useMemo(
    () => ({
      integrator: APP_NAME,
      toChain: ChainId.GNOSIS,
      toToken: SDAI.address,
      sdkConfig: {
        rpcUrls: {
          [ChainId.GNOSIS]: [RPC_LIST[ChainId.GNOSIS]],
        },
      },
      appearance: theme === 'system' ? 'auto' : (theme as Appearance),
      theme: {
        palette: {
          primary: {
            main: '#7352f6',
          },
        },
      },
    }),
    [theme]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="pastel" className="space-x-2 text-nowrap">
          <p>Get {SDAI.symbol}</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-80 px-4 md:max-w-lg">
        <LiFiWidget integrator={APP_NAME} config={widgetConfig} />
      </PopoverContent>
    </Popover>
  );
};
