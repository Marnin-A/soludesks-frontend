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
    const maxVisiblePages = 5; // Number of consecutive pages to show

    // If total pages is small enough, show all pages
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Calculate the range of pages to display
    const pagesAfterCurrent = totalPages - currentPage;
    
    // If there are 5 or fewer pages after current, make current page the first element
    if (pagesAfterCurrent <= 5 && pagesAfterCurrent >= 0) {
      // Check if we can fit all from current to end
      const remainingPages = totalPages - currentPage + 1; // Including current page
      
      if (remainingPages <= maxVisiblePages) {
        // Show: 1 ... current to last (all remaining pages fit)
        if (currentPage > 2) {
          pages.push(1);
          pages.push('...');
        } else if (currentPage === 2) {
          pages.push(1);
        }
        for (let i = currentPage; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show: 1 ... current to current+4 ... last
        if (currentPage > 2) {
          pages.push(1);
          pages.push('...');
        } else if (currentPage === 2) {
          pages.push(1);
        }
        for (let i = currentPage; i <= currentPage + 4; i++) {
          pages.push(i);
        }
        if (currentPage + 4 < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }
    // If we're at the very start (pages 1-2) with many pages after
    else if (currentPage <= 2) {
      for (let i = 1; i <= maxVisiblePages; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }
    // If we're in the middle with many pages after (more than 5)
    else {
      // Only show "1 ..." if there's a meaningful gap (currentPage > 6)
      if (currentPage > 6) {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage; i <= currentPage + 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else {
        // currentPage is 3-6: show consecutive pages from 1
        for (let i = 1; i <= maxVisiblePages; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={cn('flex justify-between items-center', className)}>
      <Select
        options={limitOptions}
        value={String(limit)}
        onChange={handleLimitChange}
        placeholder="Limit"
        className="rounded-full pr-12 text-main-text-2"
      />
      
      <div className="flex items-center justify-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            'px-3 py-2 text-sm font-medium transition-colors',
            currentPage === 1
              ? 'cursor-not-allowed opacity-50 text-gray-400'
              : 'text-text-gray hover:text-blue-primary'
          )}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page: number | string, index: number) => {
          const isCurrentPage = page === currentPage;
          const isEllipsis = page === '...';
          const isNumber = typeof page === 'number';

          return (
            <button
              key={`page-${index}`}
              onClick={() => isNumber && onPageChange(page)}
              disabled={isEllipsis}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors',
                {
                  'bg-blue-primary text-white': isCurrentPage,
                  'cursor-default border border-blue-primary text-blue-primary': isEllipsis,
                  'border border-blue-primary bg-white text-blue-primary hover:bg-blue-50 hover:shadow-sm':
                    isNumber && !isCurrentPage,
                }
              )}
              aria-label={isNumber ? `Go to page ${page}` : 'More pages'}
              aria-current={isCurrentPage ? 'page' : undefined}
            >
              {isNumber ? String(page).padStart(2, '0') : page}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            'px-3 py-2 text-sm font-medium transition-colors',
            currentPage === totalPages
              ? 'cursor-not-allowed opacity-50 text-gray-400'
              : 'text-blue-primary font-bold hover:text-blue-600'
          )}
        >
          Next
        </button>
      </div>
    </div>
  );
}
