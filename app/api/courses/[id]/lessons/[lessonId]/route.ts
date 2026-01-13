import { NextResponse } from 'next/server';
import { mockLessons } from '@/data/mockData';

export async function GET(request: Request, { params }: { params: Promise<{ id: string; lessonId: string }> }) {
  await new Promise(resolve => setTimeout(resolve, 300));

  const { id, lessonId } = await params;

  const lesson = mockLessons.find(l => l.courseId === id && l.id === lessonId);

  if (!lesson) {
    return NextResponse.json({ success: false, message: 'Lesson not found' }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: lesson,
  });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string; lessonId: string }> }) {
  await new Promise(resolve => setTimeout(resolve, 300));

  const { id, lessonId } = await params;
  const body = await request.json();

  const lessonIndex = mockLessons.findIndex(l => l.courseId === id && l.id === lessonId);

  if (lessonIndex === -1) {
    return NextResponse.json({ success: false, message: 'Lesson not found' }, { status: 404 });
  }

  // Update the lesson
  if (typeof body.isCompleted === 'boolean') {
    mockLessons[lessonIndex].isCompleted = body.isCompleted;
  }

  return NextResponse.json({
    success: true,
    data: mockLessons[lessonIndex],
  });
}
