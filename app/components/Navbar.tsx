'use client';

import Link from 'next/link';

import { Button } from '@swapr/ui';
import { ConnectButton, SettingsPopover, LifiWidgetPopover } from '@/app/components';
import { NetworkButton } from './NetworkButton';
import { APP_NAME } from '@/constants';

export const Navbar = () => {
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
            <Button variant="pastel" className="text-nowrap">
              My bets
            </Button>
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
