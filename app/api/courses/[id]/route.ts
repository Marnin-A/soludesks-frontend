import { NextResponse } from 'next/server';
import { mockCourses, mockStudents, mockLessons } from '@/data/mockData';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const { id } = await params;
  const course = mockCourses.find(c => c.id === id);

  if (!course) {
    return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: course,
  });
}
