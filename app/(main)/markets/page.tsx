'use client';

import { Address, isAddress } from 'viem';
import { MarketDetails } from './MarketDetails';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const Market = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get('id')?.toLocaleLowerCase();

  // Empty State
  if (!id || !isAddress(id)) return null;

  return (
    <main className="mt-12 flex w-full flex-col items-center px-6">
      <MarketDetails id={id} />
    </main>
  );
};

export default function MarketsPage() {
  return (
    /* Reading search parameters through useSearchParams()
     * without a Suspense boundary will opt the entire page into client-side rendering.
     * This could cause the page to be blank until the client-side JavaScript has loaded.
     * @see https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
     */
    <Suspense>
      <Market />
    </Suspense>
  );
}
