'use client';

import { InputHTMLAttributes } from 'react';
import { Button, Icon, Logo, Popover, PopoverContent, PopoverTrigger } from '@swapr/ui';
import { Outcome, Token } from '@/entities';
import { cx } from 'class-variance-authority';

interface SwapInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  selectedToken: Token | Outcome;
  onTokenClick?: (outcome?: Outcome) => void;
  tokenList: Array<Outcome>;
}

export const SwapInput = ({
  title,
  children,
  onTokenClick,
  selectedToken,
  tokenList,
  ...props
}: SwapInputProps) => {
  return (
    <div className="space-y-1 rounded-16 bg-surface-surface-1 p-4">
      <div className="text-xs font-semibold uppercase text-text-low-em">{title}</div>
      <div className="flex w-full space-x-2">
        <input
          min={0}
          type="number"
          pattern="[0-9]*"
          placeholder="0.0"
          onWheel={event => event.currentTarget.blur()}
          onKeyDown={evt =>
            ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
          }
          className="overflow-hidden overscroll-none bg-transparent text-3xl caret-text-primary-main outline-none placeholder:text-text-disabled"
          {...props}
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
            <PopoverTrigger asChild>
              <Button className="flex-shrink-0" variant="pastel">
                <p
                  className={cx(
                    'text-nowrap font-semibold',
                    selectedToken.index === 0
                      ? 'text-text-success-main'
                      : 'text-text-danger-main'
                  )}
                >
                  {selectedToken.symbol}
                </p>
                <Icon name="chevron-down" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-fit divide-y-2 divide-outline-base-em px-0 py-0">
              {tokenList.map(outcome => {
                return (
                  <div
                    key={outcome.index}
                    onClick={() => onTokenClick && onTokenClick(outcome)}
                    className={cx(
                      'flex cursor-pointer items-center justify-end space-x-2 px-3 py-2 font-semibold',
                      outcome.index === 0
                        ? 'text-text-success-main'
                        : 'text-text-danger-main'
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
