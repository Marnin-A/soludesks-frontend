import Image from 'next/image';
import { Review } from '@/types';
import { StarRating } from './StarRating';

interface ReviewCardProps {
  review: Review;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="border-b border-gray-100 py-5 last:border-b-0">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
          {review.studentAvatar ? (
            <Image src={review.studentAvatar} alt={review.studentName} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-blue-100 text-sm font-medium text-blue-600">
              {review.studentName.charAt(0)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4 mb-1">
            <h4 className="font-medium text-gray-900">{review.studentName}</h4>
            <span className="text-xs text-gray-400 shrink-0">{formatDate(review.createdAt)}</span>
          </div>
          <div className="mb-2">
            <StarRating rating={review.rating} size={14} />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
        </div>
      </div>
    </div>
  );
}
