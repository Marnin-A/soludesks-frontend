import { NextResponse } from 'next/server';
import { mockLessonReviews } from '@/data/mockData';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string; lessonId: string }> }
) {
  await new Promise(resolve => setTimeout(resolve, 200));

  const { id, lessonId } = await params;
  const reviews = mockLessonReviews.filter(review => review.courseId === id && review.lessonId === lessonId);

  return NextResponse.json({
    success: true,
    data: reviews,
  });
}
