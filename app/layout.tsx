import type { Metadata } from 'next';

import { Manrope } from 'next/font/google';

import './globals.css';
import '@swapr/ui/colors.css';

import { APP_NAME } from '@/constants';
import { Suspense } from 'react';

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
    <html lang="en">
      <body className={`${manrope.className} text-base antialiased`}>
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
