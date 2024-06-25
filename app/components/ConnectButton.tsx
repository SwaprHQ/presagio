'use client';

import { ConnectKitButton } from 'connectkit';
import Image from 'next/image';
import { useBalance, useEnsAvatar } from 'wagmi';

import { ChainId } from '@/constants';
import { Address, formatEther } from 'viem';
import { Button, ButtonProps, ButtonSizeProp } from '@swapr/ui';
import { PropsWithChildren } from 'react';

interface CustomConnectButtonProps {
  address: Address;
  onClick: () => void;
  ensName?: string;
  size?: ButtonSizeProp;
  width?: ButtonProps['width'];
}

const CustomConnectButton = ({
  address,
  ensName,
  onClick,
  size,
  width,
}: CustomConnectButtonProps) => {
  const { data: avatar } = useEnsAvatar({
    name: ensName,
    chainId: ChainId.ETHEREUM,
  });

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
    <div className="rounded-20 bg-surface-surface-2 flex items-center justify-center text-nowrap p-0.5 md:space-x-3 md:pl-4">
      {balance && <p className="hidden md:block">{formattedBalance(balance)}</p>}
      <Button
        onClick={onClick}
        size={size}
        width={width}
        className="rounded-20 !bg-surface-surface-0 shadow-3 !ring-0"
      >
        {avatar && (
          <Image
            width={20}
            height={20}
            src={avatar}
            alt={address}
            className="rounded-100"
          />
        )}
        <p className="text-text-high-em">{truncatedAddress(4)}</p>
      </Button>
    </div>
  );
};

interface ConnectButtonProps extends PropsWithChildren {
  size?: ButtonSizeProp;
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
  variant = 'pastel',
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
