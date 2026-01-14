'use client';

import { Lesson } from '@/types';
import { Button } from '@/components/ui/Button';
import { useUpdateLessonCompletionMutation } from '@/store/services/api';

interface LessonContentTabProps {
  courseId: string;
  lesson: Lesson;
  onNextLesson?: () => void;
}

export function LessonContentTab({ courseId, lesson, onNextLesson }: LessonContentTabProps) {
  const [updateLessonCompletion, { isLoading: isUpdating }] = useUpdateLessonCompletionMutation();

  const handleMarkComplete = async () => {
    try {
      await updateLessonCompletion({
        courseId,
        lessonId: lesson.id,
        isCompleted: true,
      }).unwrap();
    } catch (error) {
      console.error('Failed to mark lesson as complete:', error);
    }
  };

  return (
    <div className="bg-white text-sm rounded-xl shadow-sm border border-gray-100">
      <h2 className="py-5 font-bold text-main-text px-6">
        Lesson {lesson.order} - {lesson.title}
      </h2>
      <div className="h-px mb-5 w-full bg-gray-200" />
      <div
        className="text-main-text-2 font-normal leading-relaxed px-6 pb-10"
        dangerouslySetInnerHTML={{ __html: lesson.content || '' }}
      />
      <div className="w-full flex justify-end pb-6 pr-5">
        <Button
          variant="outline"
          className={`border-blue-primary text-blue-primary font-light px-12 ${
            lesson.isCompleted ? 'bg-blue-primary text-white' : ''
          }`}
          onClick={lesson.isCompleted ? onNextLesson : handleMarkComplete}
          disabled={isUpdating}
        >
          {isUpdating ? 'Updating...' : lesson.isCompleted ? 'Next Lesson' : 'Mark as Completed'}
        </Button>
      </div>
    </div>
  );
}
