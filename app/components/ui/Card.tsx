import { cx } from 'class-variance-authority';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={cx(
        'rounded-12 bg-surface-surface-1 outline outline-outline-low-em hover:bg-surface-surface-2',
        className
      )}
    >
      {children}
    </div>
  );
};
