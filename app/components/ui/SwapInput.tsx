'use client';

import { InputHTMLAttributes, PropsWithChildren } from 'react';
import { Button, Icon, Popover, PopoverContent, PopoverTrigger } from '@swapr/ui';
import { Outcome, Token } from '@/entities';
import { cx } from 'class-variance-authority';
import { TokenLogo } from '../TokenLogo';

interface SwapInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  selectedToken: Token | Outcome | null;
  onTokenClick?: (asset?: Token | Outcome) => void;
  tokenList: Array<Token | Outcome> | null;
}

//TODO create 2 different instances, 1 for token and other for outcomes
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
          className="w-full overflow-hidden overscroll-none bg-transparent text-3xl caret-text-primary-main outline-none placeholder:text-text-disabled"
          {...props}
        />
        {selectedToken instanceof Token && (
          <Popover>
            <PopoverTrigger asChild>
              <Button className="flex-shrink-0" variant="pastel">
                <TokenLogo address={selectedToken.address} size="xs" />
                <p className="font-semibold">{selectedToken.symbol}</p>
                {tokenList && tokenList[0] instanceof Token && (
                  <Icon name="chevron-down" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-fit divide-y-2 divide-outline-base-em px-0 py-0">
              {tokenList?.map(token => {
                if (!(token instanceof Token)) return;

                return (
                  <div
                    key={token.address}
                    onClick={() => onTokenClick && onTokenClick(token)}
                    className={cx(
                      'flex cursor-pointer items-center justify-end space-x-2 px-3 py-2 font-semibold'
                    )}
                  >
                    {selectedToken.equals(token) && <Icon name="tick-fill" />}
                    <TokenLogo address={token.address} />
                    <p>{token.symbol}</p>{' '}
                  </div>
                );
              })}
            </PopoverContent>
          </Popover>
        )}
        {selectedToken instanceof Outcome && (
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
                {tokenList && tokenList[0] instanceof Outcome && (
                  <Icon name="chevron-down" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-fit divide-y-2 divide-outline-base-em px-0 py-0">
              {tokenList?.map(outcome => {
                if (!(outcome instanceof Outcome)) return;

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
