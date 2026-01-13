import Image from 'next/image';
import { SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: string;
}

export function Select({ options, onChange, placeholder, value, icon, className = '', ...props }: SelectProps) {
  const iconPath = icon ? icon : '/icons/arrow-down.svg';
  console.log(iconPath);
  return (
    <div className="relative w-max">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`w-max appearance-none rounded-full border border-border-gray bg-white py-2.5 px-4 text-sm text-main-text focus:border-blue-primary focus:outline-none focus:ring-1 focus:ring-blue-primary ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-text-light">
        <Image src={iconPath} alt="arrow-down" width={20} height={20} className="h-5 w-5" />
      </div>
    </div>
  );
}
