'use client';

import { mainnetConfigForENS } from '@/providers/chain-config';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { Address, getAddress } from 'viem';
import { mainnet } from 'viem/chains';
import { useEnsAvatar, useEnsName } from 'wagmi';
import { useMemo } from 'react';

interface AvatarProps {
  address: Address;
  className?: string;
  size?: number;
}

export const Avatar = ({ address, className, size = 24 }: AvatarProps) => {
  const normalizedAddress = useMemo(() => {
    try {
      return getAddress(address);
    } catch (error) {
      console.error('Invalid Ethereum address:', error);
      return address;
    }
  }, [address]);

  const { data: ensName } = useEnsName({
    address: address,
    chainId: mainnet.id,
    config: mainnetConfigForENS,
  });

  const { data: ensAvatar } = useEnsAvatar({
    name: ensName ?? undefined,
    chainId: mainnet.id,
    config: mainnetConfigForENS,
  });

  const GRADIENT_BASED_ON_ADDRESS_URL = 'https://avatars.jakerunzer.com';
  const ENS_METADATA_AVATAR_URL = 'https://metadata.ens.domains/mainnet/avatar';

  const avatarGradientUrl = (address: string) =>
    `${GRADIENT_BASED_ON_ADDRESS_URL}/${normalizedAddress}`;

  const avatarEnsUrl = (ens: string) => `${ENS_METADATA_AVATAR_URL}/${ens}`;

  const avatarUrl =
    ensName && ensAvatar ? avatarEnsUrl(ensName) : avatarGradientUrl(normalizedAddress);

  return (
    <Image
      src={avatarUrl}
      alt={`ens avatar for ${ensName}`}
      width={size}
      height={size}
      className={twMerge('size-6 rounded-100 bg-outline-low-em', className)}
    />
  );
};
