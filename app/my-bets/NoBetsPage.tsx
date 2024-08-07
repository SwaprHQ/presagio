'use client';

import { NoBetsImage } from '@/app/components/ui';
import Link from 'next/link';
import { Button } from '@swapr/ui';

export default function NoBetsPage() {
  return (
    <div className="mt-12 w-full items-center space-y-8 px-6 md:flex md:flex-col">
      <NoBetsImage className="mx-auto" />
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-text-high-em">
          You haven&apos;t placed any bets yet.{' '}
        </h1>
        <p className="text-text-low-em">Check out the markets and place a bet.</p>
      </div>
      <Link href="/">
        <Button size="lg" className="mx-auto px-24" variant="solid" colorScheme="primary">
          Check markets
        </Button>
      </Link>
    </div>
  );
}
