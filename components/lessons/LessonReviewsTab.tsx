'use client';

import { ReviewCard } from '@/components/ui/ReviewCard';
import { RatingDistribution } from '@/components/ui/RatingDistribution';
import { useGetReviewsQuery } from '@/store/services/api';

interface LessonReviewsTabProps {
  courseId: string;
  lessonId: string;
  emptyMessage?: string;
}

export function LessonReviewsTab({ courseId, lessonId, emptyMessage = 'No reviews yet for this lesson.' }: LessonReviewsTabProps) {
  const { data: reviewsData, isLoading: reviewsLoading } = useGetReviewsQuery({ courseId, lessonId });

  return (
    <div className="bg-white text-sm rounded-xl shadow-sm border border-gray-100">
      <h2 className="py-5 font-bold text-main-text px-6">Reviews & Feedbacks</h2>
      <div className="h-px w-full bg-gray-200" />

      {reviewsLoading ? (
        <div className="p-6 space-y-4">
          <div className="h-32 animate-pulse rounded-xl bg-gray-100" />
          <div className="h-24 animate-pulse rounded bg-gray-100" />
          <div className="h-24 animate-pulse rounded bg-gray-100" />
        </div>
      ) : (
        <div className="p-6">
          {/* Rating Distribution */}
          {reviewsData?.stats && <RatingDistribution stats={reviewsData.stats} />}

          {/* Reviews List */}
          <div className="mt-6">
            <h3 className="font-semibold text-main-text mb-2">
              Student Reviews ({reviewsData?.reviews?.length || 0})
            </h3>

            {reviewsData?.reviews && reviewsData.reviews.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {reviewsData.reviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-gray-500">
                <p>{emptyMessage}</p>
                {emptyMessage.includes('lesson') && (
                  <p className="text-sm mt-1">Be the first to leave a review!</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
