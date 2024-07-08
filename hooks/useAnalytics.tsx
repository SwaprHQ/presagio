import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import * as Fathom from 'fathom-client';

const PRESAGIO_DEFAULT_URL = 'presagio.pages.dev';
const FATHOM_KEY = process.env.NEXT_PUBLIC_FATHOM_KEY || '';
const PRESAGIO_DOMAINS =
  process.env.NEXT_PUBLIC_ANALYTICS_DOMAINS || PRESAGIO_DEFAULT_URL;

export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  Fathom.load(FATHOM_KEY, {
    includedDomains: PRESAGIO_DOMAINS.split(','),
  });

  useEffect(() => {
    Fathom.trackPageview();
  }, [pathname, searchParams]);
}
