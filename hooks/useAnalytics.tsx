import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import * as Fathom from 'fathom-client';

const PRESAGIO_DEFAULT_URL = 'presagio.pages.dev';
const FATHOM_KEY = process.env.NEXT_PUBLIC_FATHOM_KEY || '';
const PRESAGIO_DOMAINS =
  process.env.NEXT_PUBLIC_ANALYTICS_DOMAINS || PRESAGIO_DEFAULT_URL;

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
    includedDomains: PRESAGIO_DOMAINS.split(','),
  });
}
