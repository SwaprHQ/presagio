'use client';

import { ConnectKitButton } from 'connectkit';
import { useBalance } from 'wagmi';

import { Address, formatEther } from 'viem';
import { Button, ButtonProps, Icon } from '@swapr/ui';
import { PropsWithChildren } from 'react';
import { cx } from 'class-variance-authority';
import { Avatar } from '@/app/components/Avatar';

interface CustomConnectButtonProps {
  address: Address;
  onClick: () => void;
  ensName?: string;
  size?: ButtonProps['size'];
  width?: ButtonProps['width'];
}

const CustomConnectButton = ({
  address,
  onClick,
  size,
  width,
  ensName,
}: CustomConnectButtonProps) => {
  const { data: balance } = useBalance({
    address: address,
  });

  const truncatedAddress = (size: number) =>
    `${address.slice(0, size)}...${address.slice(address.length - size, address.length)}`;

  const formattedBalance = (balanceData: NonNullable<typeof balance>) => {
    const balanceValue = formatEther(balanceData.value);

    // Regex to show only 2 digits after the decimal point
    return `${balanceValue.replace(/(\.\d{2})\d*/, '$1')} ${balanceData.symbol}`;
  };

  return (
    <div
      className={cx(
        'flex items-center justify-center text-nowrap rounded-20 border border-outline-low-em bg-surface-surface-2 p-0.5 md:space-x-3',
        balance && 'md:pl-4'
      )}
    >
      {balance && (
        <p className="hidden font-mono text-sm md:block">{formattedBalance(balance)}</p>
      )}
      <Button
        onClick={onClick}
        variant="tertiary"
        size={size}
        width={width}
        className="flex-shrink-0 rounded-20 shadow-3 !ring-0"
      >
        <Avatar address={address} />
        <p className="text-text-high-em">{ensName ? ensName : truncatedAddress(4)}</p>
        <Icon name="chevron-down" className="text-text-med-em" />
      </Button>
    </div>
  );
};

interface ConnectButtonProps extends PropsWithChildren {
  size?: ButtonProps['size'];
  width?: ButtonProps['width'];
  className?: string;
  variant?: ButtonProps['variant'];
  colorScheme?: ButtonProps['colorScheme'];
}

export const ConnectButton = ({
  className,
  size,
  width,
  children,
  variant = 'primary',
  colorScheme,
}: ConnectButtonProps) => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address, ensName }) => {
        if (!show) return;

        if (!isConnected || !address)
          return (
            <Button
              width={width}
              size={size}
              onClick={show}
              className={className}
              variant={variant}
              colorScheme={colorScheme}
            >
              {children ? children : 'Connect'}
            </Button>
          );

        return (
          <CustomConnectButton
            address={address}
            ensName={ensName}
            onClick={show}
            size={size}
            width={width}
          />
        );
      }}
    </ConnectKitButton.Custom>
  );
};
