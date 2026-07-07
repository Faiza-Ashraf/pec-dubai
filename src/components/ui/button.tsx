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
    "border border-[var(--color-gold)] bg-[var(--color-gold)] text-white shadow-[0_18px_45px_rgba(30,30,30,0.12)] hover:bg-[var(--color-bronze)] hover:border-[var(--color-bronze)]",
  secondary:
    "border border-[var(--color-gold-border)] bg-[var(--color-surface)] text-[var(--color-white)] hover:border-[var(--color-bronze)] hover:text-[var(--color-bronze)]",
  ghost:
    "text-[var(--color-gold)] hover:bg-[rgba(184,151,106,0.08)] hover:text-[var(--color-bronze)]",
};

const baseClassName =
  "inline-flex min-h-14 items-center justify-center rounded-[3px] px-8 py-4 text-[12px] font-semibold tracking-[0.28em] uppercase transition duration-300";

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
