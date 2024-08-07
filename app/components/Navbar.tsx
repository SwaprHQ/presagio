'use client';

import Link from 'next/link';

import { Button } from '@swapr/ui';
import { ConnectButton, SettingsPopover } from '@/app/components';
import { NetworkButton } from './NetworkButton';

export const Navbar = () => {
  return (
    <nav className="h-20 bg-surface-surface-0 px-6 py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <div className="text-white flex items-center text-[24px] font-black md:space-x-2">
              <p>👁️</p>
              <p className="hidden md:block">Presagio</p>
            </div>
          </Link>
          <div className="mx-3 md:ml-28"></div>
        </div>
        <div className="flex h-10 items-center justify-end space-x-2 md:w-[488px]">
          <Link href="/my-bets">
            <Button variant="pastel">My bets</Button>
          </Link>

          <ConnectButton />
          <NetworkButton />
          <SettingsPopover />
        </div>
      </div>
    </nav>
  );
};
