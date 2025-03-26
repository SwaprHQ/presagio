'use client';

import { useTheme } from 'next-themes';
import {
  ButtonLink,
  Icon,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ToggleGroup,
  ToggleGroupOption,
} from '@swapr/ui';
import { useShowClientUI } from '@/hooks';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { cx } from 'class-variance-authority';

export const SettingsPopover = () => {
  const { setTheme, theme } = useTheme();
  const showClientUI = useShowClientUI();
  const { address } = useAccount();

  if (!showClientUI) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton size="sm" name="settings-fill" variant="secondary" />
      </PopoverTrigger>
      <PopoverContent className="max-w-lg px-4">
        <div className={address && 'space-y-3 divide-y divide-outline-base-em'}>
          {address && (
            <div>
              <ButtonLink
                size="sm"
                variant="secondary"
                as={Link}
                href={`/profile?address=${address}`}
                className="items-center justify-between"
              >
                <div className="flex space-x-1">
                  <Icon size={14} name="user" />
                  <span>Profile</span>
                </div>
                <Icon size={14} name="chevron-right" />
              </ButtonLink>
            </div>
          )}
          <div className={cx('space-y-2', { 'pt-3': !!address })}>
            <div className="flex items-center text-text-low-em">
              <p className="text-xs font-bold">Theme</p>
            </div>
            <ToggleGroup value={theme} onChange={setTheme}>
              <ToggleGroupOption value="system">Auto</ToggleGroupOption>
              <ToggleGroupOption value="light">
                <Icon name="day" size={14} />
                <p className="ml-1 capitalize">light</p>
              </ToggleGroupOption>
              <ToggleGroupOption value="dark">
                <Icon name="night" size={14} />
                <p className="ml-1 capitalize">dark</p>
              </ToggleGroupOption>
            </ToggleGroup>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
