import { twMerge } from 'tailwind-merge';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => (
  <div className={twMerge('animate-pulse rounded-8 bg-outline-low-em', className)} />
);
