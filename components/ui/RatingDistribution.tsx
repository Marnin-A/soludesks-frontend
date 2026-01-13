import { ReviewStats } from '@/types';
import { StarRating } from './StarRating';

interface RatingDistributionProps {
  stats: ReviewStats;
}

export function RatingDistribution({ stats }: RatingDistributionProps) {
  const { averageRating, totalReviews, ratingDistribution } = stats;
  const maxCount = Math.max(...Object.values(ratingDistribution));

  return (
    <div className="flex gap-8 p-6 bg-gray-50 rounded-xl">
      {/* Average Rating */}
      <div className="flex flex-col items-center justify-center min-w-[140px]">
        <span className="text-5xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
        <div className="mt-2">
          <StarRating rating={Math.round(averageRating)} size={18} />
        </div>
        <span className="mt-2 text-sm text-gray-500">{totalReviews} reviews</span>
      </div>

      {/* Rating Bars */}
      <div className="flex-1 space-y-2">
        {[5, 4, 3, 2, 1].map(rating => {
          const count = ratingDistribution[rating as keyof typeof ratingDistribution];
          const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
          
          return (
            <div key={rating} className="flex items-center gap-3">
              <span className="w-3 text-sm font-medium text-gray-600">{rating}</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-8 text-sm text-gray-500 text-right">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
