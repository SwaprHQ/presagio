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
        "bg-surface-surface-1 hover:bg-surface-surface-2 rounded-2xl rounded-12 outline outline-outline-low-em",
        className
      )}
    >
      {children}
    </div>
  );
};
