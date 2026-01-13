import { ReactNode } from 'react';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[var(--gray-ic-2)] text-[var(--color-main-text-2)]',
  primary: 'bg-[var(--blue-primary)] text-white',
  secondary: 'bg-[var(--blue-primary)]/10 text-[var(--blue-primary)]',
  success: 'bg-[var(--green-stat)]/10 text-[var(--green-stat)]',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
};

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-medium ${variantStyles[variant]}`}>
      {children}
    </span>
  );
}
