'use client';

import { useEffect } from 'react';
import { useWidgetEvents, WidgetEvent } from '@lifi/widget';
import Link from 'next/link';
import { FA_EVENTS } from '@/analytics';
import { Button } from '@swapr/ui';
import { ConnectButton, SettingsPopover, LifiWidgetPopover } from '@/app/components';
import { APP_NAME } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { UserBetsManager, UserBet } from '@/entities';
import { getUserBets } from '@/queries/omen';
import { useAccount } from 'wagmi';
import { useMemo } from 'react';

import { NetworkButton } from './NetworkButton';
import { trackEvent } from 'fathom-client';

export const Navbar = () => {
  const widgetEvents = useWidgetEvents();

  useEffect(() => {
    widgetEvents.on(WidgetEvent.RouteExecutionCompleted, () =>
      trackEvent(FA_EVENTS.LIFI_WIDGET.ROUTE_SUCCESS)
    );
    widgetEvents.on(WidgetEvent.RouteExecutionFailed, () =>
      trackEvent(FA_EVENTS.LIFI_WIDGET.ROUTE_FAILED)
    );

    return () => widgetEvents.all.clear();
  }, [widgetEvents]);
  const { address } = useAccount();

  const { data: userPositionsComplete } = useQuery<UserBet[]>({
    queryKey: ['getUserBets', address],
    queryFn: async () => await getUserBets(address),
    enabled: !!address,
  });

  const betsModel = useMemo(
    () => new UserBetsManager(userPositionsComplete),
    [userPositionsComplete]
  );

  const unredeemedBets = useMemo(() => betsModel.getUnredeemedBets(), [betsModel]);
  const hasUnredeemedBets = unredeemedBets.length > 0;
  const unredeemedBetsNumber = unredeemedBets.length;

  return (
    <nav className="h-20 bg-surface-surface-bg px-6 py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Logo />
          <div className="mx-3 md:ml-28"></div>
        </div>
        <div className="flex h-10 items-center justify-end space-x-2 md:w-[488px]">
          <div className="hidden md:block">
            <LifiWidgetPopover />
          </div>
          <Link href="/my-bets">
            <div className="relative">
              <Button
                variant="pastel"
                className="space-x-1 text-nowrap"
                onClick={() => trackEvent(FA_EVENTS.BETS.MY_BETS)}
              >
                My bets
              </Button>
              {hasUnredeemedBets && (
                <div className="absolute -right-2 -top-1 flex size-5 items-center justify-center rounded-100 border-2 border-surface-surface-bg bg-surface-success-main p-1 text-text-white">
                  <p className="text-xs font-semibold">{unredeemedBetsNumber}</p>
                </div>
              )}
            </div>
          </Link>
          <ConnectButton />
          <NetworkButton />
          <SettingsPopover />
        </div>
      </div>
    </nav>
  );
};

const Logo = () => (
  <Link href="/">
    <div className="text-white flex items-center text-[24px] font-black md:space-x-2">
      <p>👁️</p>
      <p className="hidden md:block">{APP_NAME}</p>
    </div>
  </Link>
);
