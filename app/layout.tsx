import type { Metadata } from 'next';

import { Manrope } from 'next/font/google';

import './globals.css';
import '@swapr/ui/colors.css';

import { APP_NAME, APP_URL } from '@/constants';
import { Suspense } from 'react';

const manrope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: `${APP_NAME} - Where predictions meet AI agents`,
  description: 'Bet now on multiple markets in gnosis chain.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} text-base text-text-high-em antialiased`}>
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
