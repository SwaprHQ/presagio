import { APP_NAME } from '@/constants';
import { EmbeddedMarketClient } from './EmbeddedMarketClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `${APP_NAME} Emdedded Market`,
  description: 'Bet on your predicitons. Analyse AI bets.',
};

export default async function EmbeddedMarketPage({ params }: { params: { id: string } }) {
  const marketData = [];

  return (
    <html lang="en">
      <body>
        <EmbeddedMarketClient id={params.id} />
      </body>
    </html>
  );
}
