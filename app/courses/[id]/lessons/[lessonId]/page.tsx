'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useGetCourseByIdQuery,
  useGetLessonsQuery,
} from '@/store/services/api';
import { LessonHeader } from '@/components/lessons/LessonHeader';
import { LessonTabs } from '@/components/lessons/LessonTabs';
import { LessonReviewsTab } from '@/components/lessons/LessonReviewsTab';
import { LessonContentTab } from '@/components/lessons/LessonContentTab';
import { LessonVideoPlayer } from '@/components/lessons/LessonVideoPlayer';
import { QuizContentTab } from '@/components/lessons/QuizContentTab';
import { LessonSidebar } from '@/components/lessons/LessonSidebar';

interface LessonPageProps {
  params: Promise<{ id: string; lessonId: string }>;
}

export default function LessonPage({ params }: LessonPageProps) {
  const { id: courseId, lessonId } = use(params);
  const router = useRouter();
  const { data: course } = useGetCourseByIdQuery(courseId);
  const { data: lessons, isLoading } = useGetLessonsQuery(courseId);

  const currentLesson = lessons?.find(l => l.id === lessonId);
  const isQuizLesson = currentLesson?.type === 'quiz';

  const [activeTab, setActiveTab] = useState<'content' | 'reviews'>('content');

  const handleNextLesson = () => {
    if (!lessons || !currentLesson) return;

    // Find the next lesson in order
    const currentIndex = lessons.findIndex(l => l.id === lessonId);
    if (currentIndex !== -1 && currentIndex < lessons.length - 1) {
      const nextLesson = lessons[currentIndex + 1];
      router.push(`/courses/${courseId}/lessons/${nextLesson.id}`);
    } else {
      // If last lesson, go back to course page
      router.push(`/courses/${courseId}`);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />
        <div className="mt-6 h-96 animate-pulse rounded-xl bg-gray-200" />
      </div>
    );
  }

  if (!lessons || !currentLesson) {
    return null;
  }

  return (
    <div className="flex min-h-[calc(100vh-theme(spacing.20))] flex-col">
      <LessonHeader courseId={courseId} courseTitle={course?.title} />

      <div className="flex flex-1 flex-col gap-4 overflow-hidden lg:flex-row lg:gap-6">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 sm:p-6">
          <div className="mx-auto max-w-4xl">
            {isQuizLesson ? (
              <>
                <LessonTabs activeTab={activeTab} onTabChange={setActiveTab} />
                {activeTab === 'content' && (
                  <QuizContentTab
                    courseId={courseId}
                    quizId={currentLesson.quizId || ''}
                  />
                )}
                {activeTab === 'reviews' && (
                  <LessonReviewsTab
                    courseId={courseId}
                    lessonId={lessonId}
                    emptyMessage="No reviews yet for this quiz."
                  />
                )}
              </>
            ) : (
              <>
                {/* Video Player - shown before tabs for regular lessons */}
                <LessonVideoPlayer videoUrl={currentLesson.videoUrl} />
                <LessonTabs activeTab={activeTab} onTabChange={setActiveTab} />
                {activeTab === 'content' && (
                  <LessonContentTab
                    courseId={courseId}
                    lesson={currentLesson}
                    onNextLesson={handleNextLesson}
                  />
                )}
                {activeTab === 'reviews' && (
                  <LessonReviewsTab courseId={courseId} lessonId={lessonId} />
                )}
              </>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <LessonSidebar courseId={courseId} lessons={lessons} currentLessonId={lessonId} />
      </div>
    </div>
  );
}
