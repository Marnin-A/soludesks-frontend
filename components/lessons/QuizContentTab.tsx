'use client';

import { QuizView } from '@/components/ui/QuizView';
import { useGetQuizQuery } from '@/store/services/api';

interface QuizContentTabProps {
  courseId: string;
  quizId: string;
}

export function QuizContentTab({ courseId, quizId }: QuizContentTabProps) {
  const { data: quizData, isLoading: quizLoading } = useGetQuizQuery(
    { courseId, quizId },
    { skip: !quizId }
  );

  if (quizLoading) {
    return (
      <div className="space-y-4">
        <div className="h-32 animate-pulse rounded-xl bg-gray-200" />
        <div className="h-48 animate-pulse rounded-xl bg-gray-200" />
        <div className="h-48 animate-pulse rounded-xl bg-gray-200" />
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="bg-white text-sm rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <p className="text-gray-500">Quiz not found</p>
      </div>
    );
  }

  return <QuizView quiz={quizData} />;
}
