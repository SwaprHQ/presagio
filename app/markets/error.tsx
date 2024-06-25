'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { Button } from '@swapr/ui';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mt-12 flex w-full flex-col items-center space-y-4 px-6">
      <h2 className="text-xl font-bold">Sorry, something went wrong!</h2>
      <div className="flex space-x-4">
        <Button variant="pastel" onClick={() => reset()}>
          Try again
        </Button>
        <Link href="/">
          <Button variant="pastel">Go to home page</Button>
        </Link>
      </div>
    </main>
  );
}
