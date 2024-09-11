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

interface AddressLinkProps extends ComponentProps<typeof Link> {
  address: Address;
  isAIAgent: boolean;
  className?: string;
  href: string;
  iconSize?: number;
  showAddressWithENS?: boolean;
}

export const AddressLink = ({
  address,
  isAIAgent,
  className,
  href,
  iconSize = 16,
  showAddressWithENS,
  ...props
}: AddressLinkProps) => {
  const { data: ensName } = useEnsName({
    address: address,
    chainId: mainnet.id,
    config: mainnetConfigForENS,
  });

  return (
    <div>
      <div className="flex items-center space-x-2 text-sm md:text-base">
        <Link
          href={href}
          className={twMerge(
            'hover:underline',
            isAIAgent ? 'text-text-primary-main' : 'text-text-high-em',
            className
          )}
          {...props}
        >
          {ensName || shortenAddress(address)}
        </Link>
        {isAIAgent && <Image src="/ai.svg" alt="ai" width={iconSize} height={iconSize} />}
      </div>
      <p>{showAddressWithENS && ensName && shortenAddress(address)}</p>
    </div>
  );
};
