import { twMerge } from 'tailwind-merge';

type SkeletonProps = React.ComponentProps<'div'> & {
  className?: string;
};

export const Skeleton = ({ className, ...props }: SkeletonProps) => (
  <div
    className={twMerge('animate-pulse rounded-8 bg-outline-low-em', className)}
    {...props}
  />
);
