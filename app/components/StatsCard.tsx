import { Skeleton } from '@/app/components/Skeleton';

export const StatsCard = ({
  title,
  value,
  symbol,
  isLoading,
}: {
  title: string;
  value?: string;
  symbol: string;
  isLoading?: boolean;
}) => {
  return (
    <div className="w-full space-y-2 rounded-16 bg-surface-surface-0 p-6 font-semibold text-text-low-em ring-1 ring-outline-base-em">
      <div className="text-xs font-bold uppercase">{title}</div>
      <div className="flex space-x-1.5 text-2xl">
        {isLoading ? (
          <Skeleton className="h-9 w-24" />
        ) : (
          <span className="text-text-high-em">{value}</span>
        )}
        <span className="uppercase">{symbol}</span>
      </div>
    </div>
  );
};
