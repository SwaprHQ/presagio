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
        'rounded-2xl rounded-12 bg-gradient-to-b from-surface-surface-white-smoke-2 to-surface-surface-white-smoke-3 shadow-3 outline outline-outline-base-em transition-all hover:from-surface-surface-white-smoke-2 hover:to-surface-primary-base-em',
        className
      )}
    >
      {children}
    </div>
  );
};
