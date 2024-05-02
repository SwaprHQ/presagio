"use client";

import Link from "next/link";

import { Button } from "swapr-ui";
import { ConnectButton } from "@/app/components/ConnectButton";
import Image from "next/image";
import { SettingsPopover } from "@/app/components/SettingsPopover";

export const Navbar = () => {
  return (
    <nav className=" bg-surface-surface-0 h-20 py-5 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <div className="text-white font-black text-[24px] flex items-center md:space-x-2">
              <p>👁️</p>
              <p className="hidden md:block">Presagio </p>
            </div>
          </Link>
          <div className="mx-3 md:ml-28"></div>
        </div>
        <div className="h-10 md:w-[488px] space-x-2 flex items-center justify-end">
          <Link href="/my-bets">
            <Button variant="pastel">My bets</Button>
          </Link>

          <ConnectButton />
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center justify-center select-none space-x-2 rounded-12 bg-surface-surface-2 p-3">
              <Image
                src="assets/gnosis-avatar.svg"
                width={18}
                height={18}
                className=" rounded-100"
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
