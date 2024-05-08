"use client";

import {
  ChangeEventHandler,
  MouseEventHandler,
  PropsWithChildren,
} from "react";
import {
  Button,
  Icon,
  Logo,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "swapr-ui";
import { Outcome, Token } from "@/entities";
import { cx } from "class-variance-authority";

interface SwapInputProps extends PropsWithChildren {
  title: string;
  value?: string;
  selectedToken: Token | Outcome;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClick?: (outcome?: Outcome) => void;
  tokenList: Array<Outcome>;
}

export const SwapInput = ({
  title,
  children,
  value,
  onChange,
  onClick,
  selectedToken,
  tokenList,
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
        {selectedToken instanceof Token ? (
          <Button className="flex-shrink-0" variant="pastel">
            <Logo
              src="https://raw.githubusercontent.com/SmolDapp/tokenAssets/main/tokens/100/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/logo-128.png"
              alt="token logo"
              size="xs"
            />
            <p className="font-semibold">{selectedToken.symbol}</p>
            <Icon name="chevron-down" />
          </Button>
        ) : (
          <Popover>
            <PopoverTrigger>
              <Button className="flex-shrink-0" variant="pastel">
                <p
                  className={cx(
                    "font-semibold text-nowrap",
                    selectedToken.index === 0
                      ? "text-text-success-main"
                      : "text-text-danger-main"
                  )}
                >
                  {selectedToken.symbol}
                </p>
                <Icon name="chevron-down" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-fit px-0 py-0 divide-y-2 divide-outline-base-em">
              {tokenList.map((outcome) => {
                return (
                  <div
                    key={outcome.index}
                    onClick={() => onClick && onClick(outcome)}
                    className={cx(
                      "flex justify-end items-center space-x-2 py-2 px-3 cursor-pointer font-semibold",
                      outcome.index === 0
                        ? "text-text-success-main"
                        : "text-text-danger-main"
                    )}
                  >
                    {selectedToken.equals(outcome) && <Icon name="tick-fill" />}
                    <p>{outcome.symbol}</p>
                  </div>
                );
              })}
            </PopoverContent>
          </Popover>
        )}
      </div>
      {children}
    </div>
  );
};
