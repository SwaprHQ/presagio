'use client';

import { InputHTMLAttributes } from 'react';
import { Button, Icon, Popover, PopoverContent, PopoverTrigger } from '@swapr/ui';
import { Outcome, Token } from '@/entities';
import { cx } from 'class-variance-authority';
import { TokenLogo } from '../TokenLogo';

interface SwapInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  selectedToken: Token | Outcome | null;
  onTokenClick?: (outcome?: Outcome) => void;
  tokenList: Array<Outcome> | null;
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
      <div className="text-xs font-medium uppercase text-text-low-em">{title}</div>
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
          className="placeholder:text-text-disabled w-full overflow-hidden overscroll-none bg-transparent text-2xl caret-text-primary-med-em outline-hidden"
          {...props}
        />
        {selectedToken instanceof Token && (
          <Button className="shrink-0" variant="secondary">
            <TokenLogo address={selectedToken.address} size="xs" />
            <p className="font-medium">{selectedToken.symbol}</p>
          </Button>
        )}
        {selectedToken instanceof Outcome && (
          <Popover>
            <PopoverTrigger asChild>
              <Button className="shrink-0" variant="secondary">
                <p
                  className={cx(
                    'text-nowrap font-medium',
                    selectedToken.index === 0
                      ? 'text-text-success-high-em'
                      : 'text-text-danger-high-em'
                  )}
                >
                  {selectedToken.symbol}
                </p>
                {tokenList && <Icon name="chevron-down" />}{' '}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-fit divide-y-2 divide-outline-base-em px-0 py-0">
              {tokenList?.map(outcome => {
                return (
                  <div
                    key={outcome.index}
                    onClick={() => onTokenClick && onTokenClick(outcome)}
                    className={cx(
                      'flex cursor-pointer items-center justify-end space-x-2 px-3 py-2 font-medium',
                      outcome.index === 0
                        ? 'text-text-success-high-em'
                        : 'text-text-danger-high-em'
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
