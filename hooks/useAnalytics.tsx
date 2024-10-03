import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import * as Fathom from 'fathom-client';
import { APP_URL } from '@/constants';

const FATHOM_KEY = process.env.NEXT_PUBLIC_FATHOM_KEY || '';
const APP_DOMAINS = process.env.NEXT_PUBLIC_ANALYTICS_DOMAINS || APP_URL;

export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const host = window.location.host;
    const protocol = window.location.protocol;
    const search = searchParams.toString();
    const fullPath = `${pathname}${search ? `?${search}` : ''}`;

    const url = `${protocol}//${host}${fullPath}`;

    Fathom.trackPageview({ url });
  }, [pathname, searchParams]);

  if (typeof window === 'undefined') return;

  Fathom.load(FATHOM_KEY, {
    includedDomains: APP_DOMAINS.split(','),
  });
}
