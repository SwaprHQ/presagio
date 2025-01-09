'use client';

import { AddressLink } from '@/app/components/AddressLink';
import { Avatar } from '@/app/components';
import { Address } from 'viem';
import { twMerge } from 'tailwind-merge';

import { AiAgent } from '@/types';

interface UserAvatarWithAddressProps {
  address: Address;
  aiAgent?: AiAgent;
  className?: string;
}

export const UserAvatarWithAddress = ({
  address,
  aiAgent,
  className,
}: UserAvatarWithAddressProps) => {
  return (
    <div
      className={twMerge(
        'flex w-fit flex-shrink-0 items-center space-x-2 text-sm md:text-base',
        className
      )}
    >
      <Avatar address={address} />
      <AddressLink
        address={address}
        aiAgent={aiAgent}
        href={`/profile?address=${address}`}
      />
    </div>
  );
};
