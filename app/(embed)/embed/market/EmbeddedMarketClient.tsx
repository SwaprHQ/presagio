'use client';

import { EmbeddedMarketCardLoading } from '@/app/(embed)/embed/market/EmbedMarketCardLoading';
import { EmbedMarketCard } from '@/app/components/EmbedMarketCard';
import { APP_URL } from '@/constants';
import { getMarket } from '@/queries/omen';
import { Icon } from '@swapr/ui';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export const EmbeddedMarketClient = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id')!;

  const { data, error, isLoading } = useQuery({
    queryKey: ['getMarket', id],
    queryFn: async () => getMarket({ id }),
  });

  if (error) {
    console.error(error);
    return <EmbeddedErrorCard id={id} />;
  }

  if (isLoading || !data?.fixedProductMarketMaker) return <EmbeddedMarketCardLoading />;

  const fixedProductMarketMaker = data.fixedProductMarketMaker;

  return (
    <div className="flex w-full min-w-0 flex-col items-center justify-center">
      <EmbedMarketCard fixedProductMarketMaker={fixedProductMarketMaker} />
    </div>
  );
};

const EmbeddedErrorCard = ({ id }: { id: string }) => {
  const marketUrl = `${APP_URL}/markets?id=${id}`;

  return (
    <div className="flex w-screen flex-col items-center justify-center">
      <div className="flex h-32 w-full max-w-96 flex-col items-center justify-center rounded-12 border border-outline-base-em bg-surface-surface-0">
        <div className="flex items-center space-x-2 pb-3">
          <Icon name="exclamation" size={18} className="text-outline-danger-med-em" />
          <p className="text-md">Error rendering the market</p>
        </div>
        <a
          className="flex h-fit select-none items-center justify-center space-x-2 rounded-12 bg-surface-surface-2 px-3 py-2 text-sm font-bold text-text-high-em hover:bg-surface-surface-3"
          href={marketUrl}
          target="_blank"
        >
          Check on Presagio
        </a>
      </div>
    </div>
  );
};
