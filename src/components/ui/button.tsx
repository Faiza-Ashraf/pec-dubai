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
    "border border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-obsidian)] shadow-[0_18px_50px_rgba(184,151,106,0.18)] hover:bg-[var(--color-gold-light)] hover:border-[var(--color-gold-light)]",
  secondary:
    "border border-white/14 bg-transparent text-white hover:border-[var(--color-gold-border)] hover:bg-white/[0.04]",
  ghost:
    "text-[var(--color-gold-light)] hover:bg-white/5",
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
