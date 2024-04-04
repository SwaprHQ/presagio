import { cx } from "class-variance-authority";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={cx(
        "sm:w-[344px] bg-surface-surface-1 hover:bg-surface-surface-2 rounded-2xl border rounded-12 border-outline-base-em",
        className
      )}
    >
      {children}
    </div>
  );
};
