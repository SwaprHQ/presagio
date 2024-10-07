'use client';

import { EmbeddedMarketCardLoading } from '@/app/(embed)/embed/market/EmbedMarketCardLoading';
import { Skeleton } from '@/app/components';
import { EmbedMarketCard } from '@/app/components/EmbedMarketCard';
import { getMarket } from '@/queries/omen';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export const EmbeddedMarketClient = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id')!;

  const { data, error, isLoading } = useQuery({
    queryKey: ['getMarket', id],
    queryFn: async () => getMarket({ id }),
  });

  if (error) throw error;
  if (isLoading || !data?.fixedProductMarketMaker) return <EmbeddedMarketCardLoading />;

  const fixedProductMarketMaker = data.fixedProductMarketMaker;

  return (
    <div className="flex w-screen flex-col items-center justify-center">
      <EmbedMarketCard fixedProductMarketMaker={fixedProductMarketMaker} />
    </div>
  );
};
