import { NextResponse } from 'next/server';
import { mockLessons } from '@/data/mockData';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const { id } = await params;

  // Filter lessons by courseId
  const courseLessons = mockLessons.filter(lesson => lesson.courseId === id);

  return NextResponse.json({
    success: true,
    data: courseLessons,
  });
}
