import { Skeleton } from '@/app/components';

export const EmbeddedMarketCardLoading = () => (
  <div className="mx-auto h-fit w-full max-w-96 rounded-12 border border-outline-base-em bg-surface-surface-0">
    <div className="space-y-2 p-5">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-20" />
      </div>
      <div className="flex space-x-4">
        <Skeleton className="size-20 flex-shrink-0" />
        <Skeleton className="h-16 w-full" />
      </div>
      <Skeleton className="h-8 w-full" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  </div>
);
