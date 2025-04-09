'use client';

import { useEffect } from 'react';
import { useWidgetEvents, WidgetEvent } from '@lifi/widget';
import Link from 'next/link';
import { FA_EVENTS } from '@/analytics';
import { Button, Icon } from '@swapr/ui';
import { ConnectButton, SettingsPopover, LifiWidgetPopover } from '@/app/components';
import { APP_NAME } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { UserBetsManager, UserBet } from '@/entities';
import { getUserBets } from '@/queries/omen';
import { useAccount } from 'wagmi';
import { useMemo } from 'react';

import { NetworkButton } from './NetworkButton';
import { trackEvent } from 'fathom-client';
import { AgentsLeaderBoardIcon, BetsIcon } from '@/app/components/ui/icons/';

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
    <nav className="h-20 border-b border-neutral-inverse-white-alpha-4 px-6 py-5 dark:border-neutral-inverse-white-alpha-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Logo />
          <div className="mx-3 md:ml-28"></div>
        </div>
        <div className="flex h-10 items-center justify-end space-x-2">
          <Link href="/chat/new">
            <Button variant="secondary" className="space-x-2 text-nowrap">
              <Icon
                name="stars"
                size={16}
                alt="ai stars"
                className="text-text-primary-med-em"
              />
              <p className="hidden md:block">AI Chat</p>
            </Button>
          </Link>
          <Link href="/leaderboard/agents">
            <Button variant="secondary">
              <AgentsLeaderBoardIcon
                className="text-text-med-em"
                width={19}
                height={19}
              />
              <p className="hidden md:block">Agents</p>
            </Button>
          </Link>
          <Link href="/my-bets">
            <div className="relative">
              <Button
                variant="secondary"
                className="space-x-1.5 text-nowrap"
                onClick={() => trackEvent(FA_EVENTS.BETS.MY_BETS)}
              >
                <BetsIcon className="text-text-med-em" width={19} height={19} />
                <p className="hidden md:block"> My bets</p>
              </Button>
              {hasUnredeemedBets && (
                <div className="absolute -right-2 -top-1 flex size-4 items-center justify-center rounded-100 border border-surface-success-high-em bg-surface-success-low-em p-1">
                  <p className="text-2xs font-semibold text-text-success-med-em">
                    {unredeemedBetsNumber}
                  </p>
                </div>
              )}
            </div>
          </Link>
          <div className="hidden md:block">
            <LifiWidgetPopover />
          </div>
          <NetworkButton />
          <ConnectButton />
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
