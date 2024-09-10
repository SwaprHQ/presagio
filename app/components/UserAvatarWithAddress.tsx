'use client';

import { AddressLink } from '@/app/components/AddressLink';
import { Avatar } from '@/app/components';
import { Address } from 'viem';
import { twMerge } from 'tailwind-merge';

interface UserAvatarWithAddressLinkProps {
  address: Address;
  isAIAgent: boolean;
  className?: string;
}

export const UserAvatarWithAddress = ({
  address,
  isAIAgent,
  className,
}: UserAvatarWithAddressLinkProps) => {
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
        isAIAgent={isAIAgent}
        href={`/profile?address=${address}`}
      />
    </div>
  );
};
