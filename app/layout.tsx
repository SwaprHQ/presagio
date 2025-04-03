import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';

import './globals.css';
import '@swapr/ui/colors.css';

import { APP_NAME, APP_URL } from '@/constants';
import { Suspense } from 'react';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: `${APP_NAME} - Where predictions meet AI agents`,
  description: 'Bet on prediction markets in Gnosis Chain, enhanced by AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-os2 ${jetbrainsMono.variable} text-base text-text-high-em antialiased`}
      >
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
