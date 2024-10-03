import { Suspense } from 'react';
import type { Metadata } from 'next';

import { Manrope } from 'next/font/google';

import './globals.css';
import '@swapr/ui/colors.css';

import { Providers } from '@/providers';
import { APP_NAME } from '@/constants';

const manrope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `${APP_NAME} 👁️ - The Prediction Market on Gnosis with AI`,
  description: 'Bet on your predicitons. Analyse AI bets.',
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
