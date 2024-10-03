import type { Metadata } from 'next';

import { Manrope } from 'next/font/google';

import './globals.css';
import '@swapr/ui/colors.css';

import { Providers } from '@/providers';
import { Suspense } from 'react';

const manrope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Presagio 👁️ - The Prediction Market on Gnosis',
  description: 'Win with your predicitons.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" style={{ colorScheme: 'dark' }}>
      <body
        className={`${manrope.className} bg-surface-surface-bg text-base antialiased`}
      >
        <Suspense>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
