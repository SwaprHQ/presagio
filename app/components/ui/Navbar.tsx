"use client";

import Link from "next/link";
import { useTheme } from "next-themes";

import {
  Button,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TabGroup,
  TabHeader,
  TabStyled,
} from "swapr-ui";
import { ConnectButton } from "@/app/components/ConnectButton";
import Image from "next/image";

export const Navbar = () => {
  const { setTheme } = useTheme();

  return (
    <nav className=" bg-surface-surface-0 h-20 py-5 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <div className="text-white font-black text-[24px] flex items-center md:space-x-2">
              <p className="hidden md:block">Presagio </p>
              <p>👁️</p>
            </div>
          </Link>
          <div className="mx-3 md:ml-28"></div>
        </div>
        <div className="h-10 md:w-[488px] space-x-2 flex items-center justify-end">
          <Link href="/my-bets">
            <div className="px-3 py-2 capitalize cursor-pointer bg-stone-800 hover:bg-stone-700 rounded-2xl">
              Bets
            </div>
          </Link>

          <ConnectButton />
          <div className="px-3 py-2 capitalize cursor-pointer bg-stone-800 hover:bg-stone-700 rounded-2xl">
            <div className="flex items-center space-x-2 &#9660">
              <div className="bg-green-700 rounded-full size-5"></div>
              <p className="hidden md:block">Gnosis</p>
            </div>
          </div>
          <SettingsPopover setTheme={setTheme} />
        </div>
      </div>
    </nav>
  );
};

const SettingsPopover = ({
  setTheme,
}: {
  setTheme: (theme: string) => void;
}) => (
  <Popover>
    <PopoverTrigger>
      <IconButton name="settings-fill" variant="pastel" />
    </PopoverTrigger>
    <PopoverContent className="max-w-md px-0">
      <div className="space-y-2">
        <div className="flex items-center mx-4 text-text-low-em">
          <p className="font-bold text-xs">Theme settings</p>
        </div>
        <TabGroup
          as="div"
          onChange={(index: number) =>
            console.log("Changed selected tab to:", index)
          }
          className="mx-4"
        >
          <TabHeader className="overflow-x-auto md:overflow-x-visible last:right-0 flex justify-between">
            <div className="flex space-x-3">
              <TabStyled onClick={() => setTheme("auto")}>Auto</TabStyled>
              <TabStyled onClick={() => setTheme("light")}>Light</TabStyled>
              <TabStyled onClick={() => setTheme("dark")}>Dark</TabStyled>
            </div>
          </TabHeader>
        </TabGroup>
      </div>
    </PopoverContent>
  </Popover>
);
