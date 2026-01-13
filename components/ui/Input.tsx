import { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export function Input({ icon, iconPosition = 'left', className = '', ...props }: InputProps) {
  return (
    <div className="relative">
      {icon && iconPosition === 'left' && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light">{icon}</div>
      )}
      <input
        className={cn(
          `w-full rounded-lg border border-border-gray bg-white py-2.5 text-sm text-main-text placeholder:text-text-light focus:border-blue-primary focus:outline-none focus:ring-1 focus:ring-blue-primary ${
            icon ? (iconPosition === 'left' ? 'pl-10 pr-4' : 'pl-4 pr-10') : 'px-4'
          } ${className}`
        )}
        {...props}
      />
      {icon && iconPosition === 'right' && (
        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-text-light">{icon}</div>
      )}
    </div>
  );
}
