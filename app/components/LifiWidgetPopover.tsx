'use client';

import { useMemo } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@swapr/ui';
import { trackEvent } from 'fathom-client';
import { useTheme } from 'next-themes';
import { Appearance, LiFiWidget, WidgetConfig } from '@lifi/widget';

import { APP_NAME, ChainId, FA_EVENTS, RPC_LIST, SDAI } from '@/constants';

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
        <Button
          variant="pastel"
          className="space-x-2 text-nowrap"
          onClick={() => trackEvent(FA_EVENTS.LIFI_WIDGET.OPEN)}
        >
          <p>Get {SDAI.symbol}</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-80 px-4 md:max-w-lg">
        <LiFiWidget integrator={APP_NAME} config={widgetConfig} />
      </PopoverContent>
    </Popover>
  );
};
