'use client';

import { isAddress } from 'viem';
import { MarketDetails } from './MarketDetails';
import { useSearchParams } from 'next/navigation';
import { MarketNotFound } from './MarketNotFound';

export default function MarketsPage() {
  const searchParams = useSearchParams();

  const id = searchParams.get('id')?.toLocaleLowerCase();

  if (!id || !isAddress(id))
    return (
      <main className="mt-12 flex w-full flex-col items-center px-6">
        <MarketNotFound />;
      </main>
    );

  return (
    <main className="mt-12 flex w-full flex-col items-center px-6">
      <MarketDetails id={id} />
    </main>
  );
}
