'use client';

import { mainnetConfigForENS } from '@/providers/chain-config';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { Address } from 'viem';
import { mainnet } from 'viem/chains';
import { useEnsAvatar, useEnsName } from 'wagmi';

interface AvatarProps {
  address: Address;
  className?: string;
}

export const Avatar = ({ address, className }: AvatarProps) => {
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

  const avatarGradientUrl = `${GRADIENT_BASED_ON_ADDRESS_URL}/${address}`;
  const avatarEnsUrl = `${ENS_METADATA_AVATAR_URL}/${ensName}`;
  const avatarUrl = ensName && ensAvatar ? avatarEnsUrl : avatarGradientUrl;

  return (
    <Image
      src={avatarUrl}
      alt={`ens avatar for ${ensName}`}
      width={320}
      height={320}
      className={twMerge('size-6 rounded-100 bg-outline-low-em bg-cover', className)}
    />
  );
};
