"use client";

import { useTheme } from "next-themes";
import {
  Icon,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ToggleGroup,
  ToggleGroupOption,
} from "swapr-ui";
import { useShowClientUI } from "@/hooks";

export const SettingsPopover = () => {
  const { setTheme, theme } = useTheme();
  const showClientUI = useShowClientUI();

  if (!showClientUI) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton name="settings-fill" variant="pastel" />
      </PopoverTrigger>
      <PopoverContent className="max-w-lg px-4">
        <div className="space-y-2">
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
      </PopoverContent>
    </Popover>
  );
};
