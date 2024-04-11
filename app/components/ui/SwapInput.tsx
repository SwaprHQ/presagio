"use client";

import {
  ChangeEventHandler,
  MouseEventHandler,
  PropsWithChildren,
} from "react";
import { Button, Icon, Logo } from "swapr-ui";

interface SwapInputProps extends PropsWithChildren {
  title: string;
  value?: string;
  selectedToken?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const SwapInput = ({
  title,
  children,
  value,
  onChange,
  onClick,
  selectedToken,
}: SwapInputProps) => {
  return (
    <div className="p-4 space-y-1 bg-surface-surface-1 rounded-16">
      <div className="text-xs uppercase text-text-low-em font-semibold">
        {title}
      </div>
      <div className="flex w-full space-x-2">
        <input
          min={0}
          type="number"
          pattern="[0-9]*"
          placeholder="0.0"
          value={value}
          onWheel={(event) => event.currentTarget.blur()}
          onKeyDown={(evt) =>
            ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
          }
          onChange={onChange}
          className="bg-transparent overflow-hidden overscroll-none outline-none caret-text-primary-main text-3xl placeholder:text-text-disabled"
        />
        <Button variant="pastel" onClick={onClick}>
          <Logo
            src="https://raw.githubusercontent.com/SmolDapp/tokenAssets/main/tokens/100/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/logo-128.png"
            alt="token logo"
            size="xs"
          />
          <p className="font-semibold">{selectedToken}</p>
          <Icon name="chevron-down" />
        </Button>
      </div>
      {children}
    </div>
  );
};
