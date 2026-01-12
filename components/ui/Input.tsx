import { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

export function Input({ icon, className = '', ...props }: InputProps) {
  return (
    <div className="relative">
      {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-light)]">{icon}</div>}
      <input
        className={`w-full rounded-lg border border-[var(--border-gray)] bg-white py-2.5 text-sm text-[var(--text-dark)] placeholder:text-[var(--text-light)] focus:border-[var(--blue-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--blue-primary)] ${
          icon ? 'pl-10 pr-4' : 'px-4'
        } ${className}`}
        {...props}
      />
    </div>
  );
}
