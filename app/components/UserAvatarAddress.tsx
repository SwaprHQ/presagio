'use client';

import { ChainId, RPC_LIST } from '@/constants';
import { shortenAddress } from '@/utils';
import { cx } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { Address, getAddress, http } from 'viem';
import { mainnet } from 'viem/chains';
import { createConfig, fallback, useEnsAvatar, useEnsName } from 'wagmi';

interface UserAvatarAddressProps {
  address: Address;
  isAIAgent: boolean;
}

const mainnetConfigForENS = createConfig({
  chains: [mainnet],
  transports: { [mainnet.id]: fallback([http(RPC_LIST[ChainId.MAINNET]), http()]) },
});

export const UserAvatarAddress = ({ address, isAIAgent }: UserAvatarAddressProps) => {
  const normalizedAddress = useMemo(() => {
    try {
      return getAddress(address);
    } catch (error) {
      console.error('Invalid Ethereum address:', error);
      return address;
    }
  }, [address]);

  const { data: ensName } = useEnsName({
    address: normalizedAddress,
    chainId: mainnet.id,
    config: mainnetConfigForENS,
  });

  const { data: ensAvatar } = useEnsAvatar({
    name: ensName ?? undefined,
    chainId: mainnet.id,
    config: mainnetConfigForENS,
  });

  console.log('ensAvatar:', ensAvatar);

  const GRADIENT_BASED_ON_ADDRESS_URL = 'https://avatars.jakerunzer.com';
  const ENS_METADATA_AVATAR_URL = 'https://metadata.ens.domains/mainnet/avatar';

  const avatarGradientUrl = (address: string) =>
    `${GRADIENT_BASED_ON_ADDRESS_URL}/${address}`;

  const avatarEnsUrl = (ens: string) => `${ENS_METADATA_AVATAR_URL}/${ens}`;

  const avatarUrl =
    ensName && ensAvatar ? avatarEnsUrl(ensName) : avatarGradientUrl(normalizedAddress);

  return (
    <div className="flex w-fit flex-shrink-0 items-center space-x-2 text-sm md:text-base">
      <Image
        src={avatarUrl}
        alt={`ens avatar for ${ensName}`}
        width={24}
        height={24}
        className="size-6 rounded-100 bg-outline-low-em"
      />

      <Link
        href={`/profile?address=${address}`}
        className={cx(
          'hover:underline',
          isAIAgent ? 'text-text-primary-main' : 'text-text-high-em'
        )}
        target="_blank"
        rel="noopener noreferrer"
      >
        {ensName || shortenAddress(address)}
      </Link>
      {isAIAgent && <Image src="/ai.svg" alt="ai" width={16} height={16} />}
    </div>
  );
};
