import { NextResponse } from 'next/server';
import { mockReviews, mockReviewStats } from '@/data/mockData';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const lessonId = searchParams.get('lessonId');

  // Filter reviews by courseId and optionally by lessonId
  let courseReviews = mockReviews.filter(review => review.courseId === id);
  
  if (lessonId) {
    courseReviews = courseReviews.filter(review => review.lessonId === lessonId);
  }

  return NextResponse.json({
    success: true,
    data: {
      reviews: courseReviews,
      stats: mockReviewStats,
    },
  });
}
