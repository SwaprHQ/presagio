'use client';

import { ChainId, RPC_LIST, SDAI } from '@/constants';
import { Appearance, LiFiWidget as LiFiWidgetFromLib, WidgetConfig } from '@lifi/widget';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';

export const LifiWidget = () => {
  const { theme } = useTheme();
  const widgetConfig: WidgetConfig = useMemo(
    () => ({
      integrator: 'Presagio',
      toChain: 100,
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

  return <LiFiWidgetFromLib integrator="Presagio" config={widgetConfig} />;
};
