"use client";

import { ConnectKitButton } from "connectkit";
import Image from "next/image";
import { useBalance, useEnsAvatar } from "wagmi";

import { ChainId } from "@/constants";
import { Address, formatEther } from "viem";
import { Button, ButtonSizeProp } from "swapr-ui";

interface CustomConnectButtonProps {
  address: Address;
  onClick: () => void;
  ensName?: string;
  size?: ButtonSizeProp;
}

const CustomConnectButton = ({
  address,
  ensName,
  onClick,
  size,
}: CustomConnectButtonProps) => {
  const { data: avatar } = useEnsAvatar({
    name: ensName,
    chainId: ChainId.ETHEREUM,
  });

  const { data: balance } = useBalance({
    address: address,
  });

  const truncatedAddress = (size: number) =>
    `${address.slice(0, size)}...${address.slice(
      address.length - size,
      address.length
    )}`;

  const formattedBalance = (balanceData: NonNullable<typeof balance>) => {
    const balanceValue = formatEther(balanceData.value);

    // Regex to show only 3 digits after the decimal point
    return `${balanceValue.replace(/(\.\d{3})\d*/, "$1")} ${
      balanceData.symbol
    }`;
  };

  return (
    <div className="flex bg-surface-surface-2 rounded-20 p-0.5 pl-4 justify-center items-center space-x-3 text-nowrap">
      {balance && <p>{formattedBalance(balance)}</p>}
      <Button
        onClick={onClick}
        size={size}
        className="!bg-surface-surface-0 rounded-20 shadow-3 !ring-0"
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
        <p>
          <span className="md:hidden">{truncatedAddress(2)}</span>
          <span className="hidden md:block">{truncatedAddress(4)}</span>
        </p>
      </Button>
    </div>
  );
};

interface ConnectButtonProps {
  size?: ButtonSizeProp;
  text?: string;
  className?: string;
}

export const ConnectButton = ({
  className,
  size,
  text,
}: ConnectButtonProps) => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address, ensName }) => {
        if (!show) return;

        if (!isConnected || !address)
          return (
            <Button
              size={size}
              onClick={show}
              className={className}
              variant="pastel"
            >
              {text ? text : "Connect"}
            </Button>
          );

        return (
          <CustomConnectButton
            address={address}
            ensName={ensName}
            onClick={show}
            size={size}
          />
        );
      }}
    </ConnectKitButton.Custom>
  );
};
