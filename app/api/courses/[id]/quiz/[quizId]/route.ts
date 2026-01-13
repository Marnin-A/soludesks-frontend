import { NextResponse } from 'next/server';
import { mockQuizzes } from '@/data/mockData';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string; quizId: string }> }
) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const { id, quizId } = await params;

  // Find the quiz
  const quiz = mockQuizzes.find(q => q.id === quizId && q.courseId === id);

  if (!quiz) {
    return NextResponse.json(
      { success: false, error: 'Quiz not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: quiz,
  });
}
