import Image from 'next/image';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  showValue?: boolean;
}

export function StarRating({ rating, maxRating = 5, size = 16, showValue = false }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, i) => (
        <Image
          key={i}
          src={i < rating ? '/icons/star-filled.svg' : '/icons/star-empty.svg'}
          alt={i < rating ? 'Filled star' : 'Empty star'}
          width={size}
          height={size}
          className="shrink-0"
        />
      ))}
      {showValue && <span className="ml-1 text-sm font-medium text-gray-600">({rating})</span>}
    </div>
  );
}
