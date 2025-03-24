'use client';

import { PropsWithChildren } from 'react';
import { useSession } from '@/context/SessionContext';

export default function SignedIn({ children }: PropsWithChildren) {
  const { isLoggedIn, loading } = useSession();

  if (!isLoggedIn) return null;
  if (loading) return null;

  return children;
}
