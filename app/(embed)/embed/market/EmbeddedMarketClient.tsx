'use client';

import { APP_NAME, APP_URL } from '@/constants';
import { Tag } from '@swapr/ui';

export const EmbeddedMarketClient = ({ id }: { id: any }) => {
  return (
    <div className="mx-auto h-fit w-full max-w-96 rounded-12 border border-outline-base-em bg-surface-surface-0 p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Tag className="w-fit capitalize" size="sm" colorScheme="quaternary">
            Politics
          </Tag>
        </div>
        <div className="flex space-x-4">
          <div className="size-6 bg-black-12"></div>
          <h1 className="text-xl font-semibold">This is a test market</h1>
        </div>
        <p className="text-xs">{id}</p>
        <p className="text-center">
          Bet on{' '}
          <a href={APP_URL} className="text-text-primary-main">
            {APP_NAME}.eth
          </a>
        </p>
      </div>
    </div>
  );
};
