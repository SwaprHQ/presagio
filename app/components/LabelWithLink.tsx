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

import { AiAgent } from '@/types';

interface LabelWithLinkProps extends ComponentProps<typeof Link> {
  address: Address;
  aiAgent?: AiAgent;
  className?: string;
  href: string;
  iconSize?: number;
}

export const LabelWithLink = ({
  address,
  aiAgent,
  className,
  href,
  iconSize = 16,
  ...props
}: LabelWithLinkProps) => {
  const { data: ensName } = useEnsName({
    address: address,
    chainId: mainnet.id,
    config: mainnetConfigForENS,
  });

  const isAiAgent = !!aiAgent;

  const label = isAiAgent ? aiAgent.label : ensName || shortenAddress(address);

  return (
    <div className="flex w-fit max-w-20 items-center space-x-2 text-sm md:text-base">
      <Link
        href={href}
        title={label}
        className={twMerge(
          'hover:underline',
          isAiAgent ? '!w-fit! text-text-primary-high-em' : 'text-text-high-em',
          className
        )}
        {...props}
      >
        {label}
      </Link>
      {isAiAgent && <Image src="/ai.svg" alt="ai" width={iconSize} height={iconSize} />}
    </div>
  );
};
