'use client';

import { Avatar, LabelWithLink } from '@/app/components';
import { Address } from 'viem';
import { twMerge } from 'tailwind-merge';

import { AiAgent } from '@/types';

interface UserAvatarWithLabelProps {
  address: Address;
  aiAgent?: AiAgent;
  className?: string;
}

export const UserAvatarWithLabel = ({
  address,
  aiAgent,
  className,
}: UserAvatarWithLabelProps) => {
  return (
    <div
      className={twMerge(
        'flex w-fit shrink-0 items-center space-x-2 text-sm md:text-base',
        className
      )}
    >
      <Avatar address={address} />
      <LabelWithLink
        address={address}
        aiAgent={aiAgent}
        href={`/profile?address=${address}`}
        className="w-24 truncate"
      />
    </div>
  );
};
