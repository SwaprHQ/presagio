'use client';

import { mainnetConfigForENS } from '@/providers/chain-config';
import { shortenAddress } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { Address } from 'viem';
import { mainnet } from 'viem/chains';
import { useEnsName } from 'wagmi';

import { AiAgent } from '../types';

interface AddressLinkProps extends ComponentProps<typeof Link> {
  address: Address;
  aiAgent?: AiAgent;
  className?: string;
  href: string;
  iconSize?: number;
}

export const AddressLink = ({
  address,
  aiAgent,
  className,
  href,
  iconSize = 16,
  ...props
}: AddressLinkProps) => {
  const { data: ensName } = useEnsName({
    address: address,
    chainId: mainnet.id,
    config: mainnetConfigForENS,
  });

  const isAiAgent = !!aiAgent;

  const getLinkText = () => {
    if (isAiAgent) return aiAgent.label;

    return ensName || shortenAddress(address);
  };

  return (
    <div className="flex items-center space-x-2 text-sm md:text-base">
      <Link
        href={href}
        className={twMerge(
          'hover:underline',
          isAiAgent ? 'text-text-primary-main' : 'text-text-high-em',
          className
        )}
        {...props}
      >
        {getLinkText()}
      </Link>
      {isAiAgent && <Image src="/ai.svg" alt="ai" width={iconSize} height={iconSize} />}
    </div>
  );
};
