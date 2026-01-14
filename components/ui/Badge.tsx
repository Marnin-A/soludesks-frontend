import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[var(--gray-ic-2)] text-[var(--color-main-text-2)]',
  primary: 'bg-[var(--blue-primary)] text-white',
  secondary: 'bg-[var(--blue-secondary-light)] text-[var(--blue-secondary)]',
  success: 'bg-[var(--green-stat)]/10 text-[var(--green-stat)]',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        `inline-flex items-center rounded-full px-4 py-1 text-xs font-medium`,
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
