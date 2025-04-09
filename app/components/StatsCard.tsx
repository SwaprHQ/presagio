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
    <div className="w-full space-y-2 rounded-16 bg-neutral-inverse-white-alpha-4 p-6 font-medium text-text-low-em shadow-1 ring-1 ring-outline-base-em">
      <div className="text-xs font-semibold uppercase">{title}</div>
      <div className="flex space-x-1.5 text-[22px]">
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
