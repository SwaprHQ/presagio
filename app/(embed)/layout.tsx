'use client';

import { Suspense } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

const queryClient = new QueryClient();

export default function EmbedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchParams = useSearchParams();
  const theme = searchParams.get('theme')!;
  const parsedTheme = theme === 'system' ? 'system' : theme === 'dark' ? 'dark' : 'light';

  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider
          defaultTheme="system"
          enableSystem={parsedTheme === 'system' ? true : false}
          forcedTheme={parsedTheme}
          enableColorScheme={false}
        >
          {children}
        </NextThemesProvider>
      </QueryClientProvider>
    </Suspense>
  );
}
