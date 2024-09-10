'use client';

import { mainnetConfigForENS } from '@/providers/chain-config';
import { shortenAddress } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { Address, getAddress, http } from 'viem';
import { mainnet } from 'viem/chains';
import { useEnsName } from 'wagmi';

interface AddressLinkProps {
  address: Address;
  isAIAgent: boolean;
  className?: string;
}

export const AddressLink = ({ address, isAIAgent, className }: AddressLinkProps) => {
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

  return (
    <div className="flex items-center space-x-2 text-sm md:text-base">
      <Link
        href={`/profile?address=${address}`}
        className={twMerge(
          'hover:underline',
          isAIAgent ? 'text-text-primary-main' : 'text-text-high-em',
          className
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
