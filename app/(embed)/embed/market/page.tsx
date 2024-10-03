import { EmbeddedMarketClient } from '@/app/(no-layout)/embed/market/EmbeddedMarketClient';

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
