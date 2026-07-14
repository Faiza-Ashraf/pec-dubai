import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variants = {
  primary:
    "border border-[var(--color-deep-charcoal)] bg-[rgba(29,36,48,0.94)] text-[var(--color-canvas)] shadow-[0_18px_45px_rgba(29,36,48,0.18)] hover:border-[var(--color-steel-blue)] hover:bg-[var(--color-steel-blue)] hover:text-[var(--color-canvas)] hover:shadow-[0_22px_55px_rgba(76,106,135,0.28)]",
  secondary:
    "border border-[rgba(29,36,48,0.94)] bg-[rgba(29,36,48,0.94)] text-[var(--color-canvas)] hover:border-[var(--color-steel-blue)] hover:bg-[var(--color-steel-blue)] hover:text-[var(--color-canvas)] hover:shadow-[0_18px_42px_rgba(76,106,135,0.22)]",
  ghost:
    "text-[var(--color-deep-charcoal)] hover:bg-[var(--color-deep-charcoal)] hover:text-[var(--color-canvas)] hover:shadow-[0_14px_32px_rgba(29,36,48,0.18)]",
};

const baseClassName =
  "inline-flex min-h-14 items-center justify-center rounded-[3px] px-8 py-4 text-[12px] font-semibold tracking-[0.28em] uppercase transition-all duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-deep-charcoal)] focus-visible:ring-offset-2 active:translate-y-0";

export function Button({
  children,
  href,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const classes = cn(baseClassName, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
