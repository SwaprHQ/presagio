'use client';

import Link from 'next/link';

import { Button } from '@swapr/ui';
import { ConnectButton } from '@/app/components/ConnectButton';
import Image from 'next/image';
import { SettingsPopover } from '@/app/components/SettingsPopover';

export const Navbar = () => {
  return (
    <nav className="bg-surface-surface-0 h-20 px-6 py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center text-[24px] font-black text-white md:space-x-2">
              <p>👁️</p>
              <p className="hidden md:block">Presagio </p>
            </div>
          </Link>
          <div className="mx-3 md:ml-28"></div>
        </div>
        <div className="flex h-10 items-center justify-end space-x-2 md:w-[488px]">
          <Link href="/my-bets">
            <Button variant="pastel">My bets</Button>
          </Link>

          <ConnectButton />
          <div className="flex items-center space-x-2">
            <div className="rounded-12 bg-surface-surface-2 hidden select-none items-center justify-center space-x-2 p-3 md:flex">
              <Image
                src="assets/gnosis-avatar.svg"
                width={18}
                height={18}
                className="rounded-100"
                alt="gnosis avatar"
              />
            </div>
          </div>
          <SettingsPopover />
        </div>
      </div>
    </nav>
  );
};
