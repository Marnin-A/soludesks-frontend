import { NextResponse } from 'next/server';
import { mockReviews } from '@/data/mockData';
import { Review } from '@/types';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string; lessonId: string }> }
) {
  await new Promise(resolve => setTimeout(resolve, 200));

  const { id, lessonId } = await params;
  const reviews = mockReviews.filter((review: Review) => review.courseId === id && review.lessonId === lessonId);

  return NextResponse.json({
    success: true,
    data: reviews,
  });
}
