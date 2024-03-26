import { cva, cx } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

export const buttonStyles = cva(
  [
    "flex items-center justify-center",
    "select-none font-semibold",
    "disabled:text-text-disabled disabled:cursor-not-allowed disabled:ring-0 disabled:shadow-inherit",
    "focus-visible:outline-none focus-visible:ring-[3px]",
    "active:ring-[3px]",
  ],
  {
    variants: {
      size: {
        lg: "px-4 py-3 space-x-2 rounded-12 text-md font-extrabold",
        md: "px-3 py-2 space-x-2 rounded-12 text-base font-bold",
        sm: "px-2 py-2 space-x-[6px] rounded-8 text-sm font-bold",
        xs: "px-2 py-1 space-x-1 rounded-6 text-2xs font-bold",
      },
      variant: {
        solid: [],
        pastel: [],
        outline: ["bg-surface-surface-0 border"],
        ghost: ["disabled:bg-inherit"],
      },
      colorScheme: {
        primary: [],
        error: [
          "focus-visible:ring-outline-danger-low-em",
          "active:ring-outline-danger-low-em",
        ],
        success: [
          "focus-visible:ring-outline-success-low-em",
          "active:ring-outline-success-low-em",
        ],
      },
      active: {
        true: ["ring-[3px]"],
      },
      width: {
        full: "w-full",
        fit: "w-fit",
        normal: "",
      },
    },
    compoundVariants: [
      {
        variant: ["solid", "outline", "pastel"],
        class: ["disabled:bg-surface-disabled-low-em"],
      },
      {
        variant: "solid",
        colorScheme: "primary",
        class: [
          "bg-surface-primary-main text-text-white shadow-button",
          "hover:bg-surface-primary-accent-3",
          "focus-visible:bg-surface-primary-accent-3 focus-visible:ring-outline-primary-low-em",
          "active:bg-surface-primary-accent-3 active:ring-outline-primary-low-em",
        ],
      },
      {
        variant: "pastel",
        colorScheme: "primary",
        class: [
          "bg-surface-surface-2 text-text-high-em",
          "hover:bg-surface-surface-3",
          "focus-visible:bg-surface-3 focus-visible:ring-outline-med-em",
          "active:bg-surface-3 active:ring-outline-med-em",
        ],
      },
      {
        variant: "outline",
        colorScheme: "primary",
        class: [
          "border-outline-low-em",
          "hover:bg-surface-surface-1 hover:border-outline-med-em",
          "focus-visible:bg-surface-surface-1 focus-visible:ring-outline-med-em",
          "active:bg-surface-surface-1 active:ring-outline-med-em",
        ],
      },
      {
        variant: "ghost",
        colorScheme: "primary",
        class: [
          "hover:bg-surface-surface-2",
          "focus-visible:bg-surface-surface-2 focus-visible:ring-outline-med-em",
          "active:bg-surface-surface-2 active:ring-outline-med-em",
          ,
        ],
      },
      {
        variant: "solid",
        colorScheme: "error",
        class: [
          "bg-surface-danger-main text-text-white shadow-button",
          "hover:bg-surface-danger-accent-3",
          "focus-visible:bg-surface-danger-accent-3",
          "active:bg-surface-danger-accent-3",
        ],
      },
      {
        variant: "pastel",
        colorScheme: "error",
        class: [
          "bg-surface-danger-accent-1 text-text-danger-main",
          "hover:bg-surface-danger-accent-2",
          "focus-visible:bg-surface-danger-accent-2",
          "active:bg-surface-danger-accent-2",
        ],
      },
      {
        variant: "outline",
        colorScheme: "error",
        class: [
          "border-outline-danger-low-em text-text-danger-main",
          "hover:bg-surface-danger-accent-1",
          "focus-visible:bg-surface-danger-accent-1",
          "active:bg-surface-danger-accent-1",
        ],
      },
      {
        variant: "ghost",
        colorScheme: "error",
        class: [
          "text-text-danger-main",
          "hover:bg-surface-danger-accent-1",
          "focus-visible:bg-surface-danger-accent-1",
          "active:bg-surface-danger-accent-1",
        ],
      },
      {
        variant: "solid",
        colorScheme: "success",
        class: [
          "bg-surface-success-main shadow-button",
          "hover:bg-surface-success-accent-3",
          "focus-visible:bg-surface-success-accent-3",
          "active:bg-surface-success-accent-3",
        ],
      },
      {
        variant: "pastel",
        colorScheme: "success",
        class: [
          "bg-surface-success-accent-1 text-text-success-em",
          "hover:bg-surface-success-accent-2",
          "focus-visible:bg-surface-success-accent-2",
          "active:bg-surface-success-accent-2",
          ,
        ],
      },
      {
        variant: "outline",
        colorScheme: "success",
        class: [
          "border-outline-success-low-em text-text-success-em",
          "hover:bg-surface-success-accent-1",
          "focus-visible:bg-surface-success-accent-1",
          "active:bg-surface-success-accent-1",
          ,
        ],
      },
      {
        variant: "ghost",
        colorScheme: "success",
        class: [
          "text-text-success-em",
          "hover:bg-surface-success-accent-1",
          "focus-visible:bg-surface-success-accent-1",
          "active:bg-surface-success-accent-1",
        ],
      },
      {
        colorScheme: "primary",
        variant: "solid",
        active: true,
        class: "!bg-surface-primary-accent-3 ring-outline-primary-low-em",
      },
      {
        colorScheme: "primary",
        variant: "pastel",
        active: true,
        class: "bg-surface-3 ring-outline-med-em",
      },
      {
        colorScheme: "primary",
        variant: "outline",
        active: true,
        class: "bg-surface-surface-1 ring-outline-med-em",
      },
      {
        colorScheme: "primary",
        variant: "ghost",
        active: true,
        class: "bg-surface-surface-2 ring-outline-med-em",
      },
      {
        colorScheme: "error",
        variant: "solid",
        active: true,
        class: "!bg-surface-danger-accent-3 ring-outline-danger-low-em",
      },
      {
        colorScheme: "success",
        variant: "solid",
        active: true,
        class: "!bg-surface-success-accent-3 ring-outline-success-low-em",
      },
    ],
    defaultVariants: {
      active: false,
      colorScheme: "primary",
      variant: "solid",
      size: "md",
      width: "normal",
    },
  }
);

type SizeProp = "xs" | "sm" | "md" | "lg";
type WidthProp = "normal" | "fit" | "full";
export type ButtonVariantProp = "solid" | "pastel" | "outline" | "ghost";
export type ButtonColorSchemeProp = "primary" | "error" | "success";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariantProp;
  colorScheme?: ButtonColorSchemeProp;
  size?: SizeProp;
  width?: WidthProp;
  disabled?: boolean;
  active?: boolean;
}

export const Button = ({
  children,
  size,
  variant,
  colorScheme,
  width,
  active,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cx(
        buttonStyles({
          size,
          variant,
          colorScheme,
          width,
          active,
          className,
        })
      )}
      {...props}
    >
      {children}
    </button>
  );
};
