import { cn } from '@/lib/utils';
import { Select } from './Select';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  limitOptions: {
    value: string;
    label: string;
  }[];
  limit: number;
  handleLimitChange: (value: string) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  limit,
  limitOptions,
  onPageChange,
  handleLimitChange,
  className,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className={cn('flex justify-between', className)}>
      <Select
        options={limitOptions}
        value={String(limit)}
        onChange={handleLimitChange}
        placeholder="Limit"
        className="rounded-full pr-12 text-main-text-2"
      />
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm font-medium text-text-gray disabled:cursor-not-allowed disabled:opacity-50"
        >
          Prev
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${
              page === currentPage
                ? 'bg-blue-primary text-white'
                : page === '...'
                ? 'cursor-default border border-blue-primary text-blue-primary'
                : 'border border-blue-primary bg-white text-blue-primary hover:bg-blue-50'
            }`}
          >
            {typeof page === 'number' ? String(page).padStart(2, '0') : page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm font-bold text-blue-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
