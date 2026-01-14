'use client';

import { use, useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HiOutlinePlay, HiArrowLeft } from 'react-icons/hi';

import {
  useGetCourseByIdQuery,
  useGetLessonsQuery,
  useUpdateLessonCompletionMutation,
  useGetReviewsQuery,
  useGetQuizQuery,
} from '@/store/services/api';
import { Lesson } from '@/types';
import { Button } from '@/components/ui/Button';
import { ReviewCard } from '@/components/ui/ReviewCard';
import { RatingDistribution } from '@/components/ui/RatingDistribution';
import { QuizView } from '@/components/ui/QuizView';
import Image from 'next/image';

interface LessonPageProps {
  params: Promise<{ id: string; lessonId: string }>;
}

export default function LessonPage({ params }: LessonPageProps) {
  const { id: courseId, lessonId } = use(params);
  const router = useRouter();
  const { data: course } = useGetCourseByIdQuery(courseId);
  const { data: lessons, isLoading } = useGetLessonsQuery(courseId);
  const [updateLessonCompletion, { isLoading: isUpdating }] = useUpdateLessonCompletionMutation();
  const { data: reviewsData, isLoading: reviewsLoading } = useGetReviewsQuery({ courseId, lessonId });

  const currentLesson = lessons?.find(l => l.id === lessonId);
  const isQuizLesson = currentLesson?.type === 'quiz';
  
  const { data: quizData, isLoading: quizLoading } = useGetQuizQuery(
    { courseId, quizId: currentLesson?.quizId || '' },
    { skip: !isQuizLesson || !currentLesson?.quizId }
  );
  const totalLessons = lessons?.length || 0;
  const completedLessons = lessons?.filter(l => l.isCompleted).length || 0;

  // Group lessons by section
  const sections =
    lessons?.reduce((acc, lesson) => {
      const section = lesson.section || 'General';
      if (!acc[section]) {
        acc[section] = [];
      }
      acc[section].push(lesson);
      return acc;
    }, {} as Record<string, Lesson[]>) || {};

  // Calculate initial expanded section
  const initialExpandedSection = useMemo(() => {
    return currentLesson ? [currentLesson.section || 'General'] : [];
  }, [currentLesson]);

  const [expandedSections, setExpandedSections] = useState<string[]>(initialExpandedSection);
  const [activeTab, setActiveTab] = useState<'content' | 'reviews'>('content');

  const toggleSection = (section: string) => {
    setExpandedSections(prev => (prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]));
  };

  const handleMarkComplete = async () => {
    if (!currentLesson) return;

    try {
      await updateLessonCompletion({
        courseId,
        lessonId: currentLesson.id,
        isCompleted: true,
      }).unwrap();
    } catch (error) {
      console.error('Failed to mark lesson as complete:', error);
    }
  };

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

  return (
    <div className="flex h-[calc(100vh-theme(spacing.20))] flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 px-6">
        <Link
          href={`/courses/${courseId}`}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <HiArrowLeft className="h-5 w-5 text-gray-600" />
        </Link>
        <h1 className="text-xl font-bold text-gray-800">{course?.title}</h1>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="mx-auto max-w-4xl">
            {/* Show Quiz or Regular Lesson Content */}
            {isQuizLesson ? (
              // Quiz Content
              <>
                {/* Tabs */}
                <div className="mb-6 border-b border-gray-200">
                  <div className="flex gap-8">
                    <button
                      onClick={() => setActiveTab('content')}
                      className={`pb-3 text-sm font-semibold transition-colors ${
                        activeTab === 'content'
                          ? 'border-b-2 border-blue-600 text-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Course Content
                    </button>
                    <button
                      onClick={() => setActiveTab('reviews')}
                      className={`pb-3 text-sm font-semibold transition-colors ${
                        activeTab === 'reviews'
                          ? 'border-b-2 border-blue-600 text-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Review/Feedbacks
                    </button>
                  </div>
                </div>

                {activeTab === 'content' && (
                  quizLoading ? (
                    <div className="space-y-4">
                      <div className="h-32 animate-pulse rounded-xl bg-gray-200" />
                      <div className="h-48 animate-pulse rounded-xl bg-gray-200" />
                      <div className="h-48 animate-pulse rounded-xl bg-gray-200" />
                    </div>
                  ) : quizData ? (
                    <QuizView quiz={quizData} />
                  ) : (
                    <div className="bg-white text-sm rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                      <p className="text-gray-500">Quiz not found</p>
                    </div>
                  )
                )}

                {activeTab === 'reviews' && (
                  <div className="bg-white text-sm rounded-xl shadow-sm border border-gray-100">
                    <h2 className="py-5 font-bold text-gray-900 px-6">Reviews & Feedbacks</h2>
                    <div className="h-px w-full bg-gray-200" />

                    {reviewsLoading ? (
                      <div className="p-6 space-y-4">
                        <div className="h-32 animate-pulse rounded-xl bg-gray-100" />
                        <div className="h-24 animate-pulse rounded bg-gray-100" />
                      </div>
                    ) : (
                      <div className="p-6">
                        {reviewsData?.stats && <RatingDistribution stats={reviewsData.stats} />}
                        <div className="mt-6">
                          <h3 className="font-semibold text-gray-900 mb-2">
                            Student Reviews ({reviewsData?.reviews?.length || 0})
                          </h3>
                          {reviewsData?.reviews && reviewsData.reviews.length > 0 ? (
                            <div className="divide-y divide-gray-100">
                              {reviewsData.reviews.map(review => (
                                <ReviewCard key={review.id} review={review} />
                              ))}
                            </div>
                          ) : (
                            <div className="py-12 text-center text-gray-500">
                              <p>No reviews yet for this quiz.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              // Regular Lesson Content
              <>
                {/* Video Player */}
                <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-xl bg-gray-900 shadow-lg">
                  {currentLesson?.videoUrl ? (
                    <iframe
                      src={currentLesson.videoUrl}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center">
                        <HiOutlinePlay className="mx-auto h-16 w-16 text-gray-400" />
                        <p className="mt-2 text-gray-400">Video content coming soon</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tabs */}
                <div className="mb-6 border-b border-gray-200">
                  <div className="flex gap-8">
                    <button
                      onClick={() => setActiveTab('content')}
                      className={`pb-3 text-sm font-semibold transition-colors ${
                        activeTab === 'content'
                          ? 'border-b-2 border-blue-600 text-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Course Content
                    </button>
                    <button
                      onClick={() => setActiveTab('reviews')}
                      className={`pb-3 text-sm font-semibold transition-colors ${
                        activeTab === 'reviews'
                          ? 'border-b-2 border-blue-600 text-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Review/Feedbacks
                    </button>
                  </div>
                </div>

                {/* Content */}
                {activeTab === 'content' && (
                  <div className="bg-white text-sm rounded-xl shadow-sm border border-gray-100">
                    <h2 className="py-5 font-bold text-gray-900 px-6">
                      Lesson {currentLesson?.order} - {currentLesson?.title}
                    </h2>
                    <div className="h-px mb-5 w-full bg-gray-200" />
                    <div
                      className="text-gray-600 leading-relaxed px-6 pb-[4.5rem]"
                      dangerouslySetInnerHTML={{ __html: currentLesson?.content || '' }}
                    />
                    <div className="w-full flex justify-end pb-6 pr-5">
                      <Button
                        variant="outline"
                        className={`border-blue-primary text-blue-primary font-light px-12 ${
                          currentLesson?.isCompleted ? 'bg-blue-primary text-white' : ''
                        }`}
                        onClick={currentLesson?.isCompleted ? handleNextLesson : handleMarkComplete}
                        disabled={isUpdating}
                      >
                        {isUpdating ? 'Updating...' : currentLesson?.isCompleted ? 'Next Lesson' : 'Mark as Completed'}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Reviews/Feedbacks */}
                {activeTab === 'reviews' && (
                  <div className="bg-white text-sm rounded-xl shadow-sm border border-gray-100">
                    <h2 className="py-5 font-bold text-gray-900 px-6">Reviews & Feedbacks</h2>
                    <div className="h-px w-full bg-gray-200" />

                    {reviewsLoading ? (
                      <div className="p-6 space-y-4">
                        <div className="h-32 animate-pulse rounded-xl bg-gray-100" />
                        <div className="h-24 animate-pulse rounded bg-gray-100" />
                        <div className="h-24 animate-pulse rounded bg-gray-100" />
                      </div>
                    ) : (
                      <div className="p-6">
                        {/* Rating Distribution */}
                        {reviewsData?.stats && <RatingDistribution stats={reviewsData.stats} />}

                        {/* Reviews List */}
                        <div className="mt-6">
                          <h3 className="font-semibold text-gray-900 mb-2">
                            Student Reviews ({reviewsData?.reviews?.length || 0})
                          </h3>

                          {reviewsData?.reviews && reviewsData.reviews.length > 0 ? (
                            <div className="divide-y divide-gray-100">
                              {reviewsData.reviews.map(review => (
                                <ReviewCard key={review.id} review={review} />
                              ))}
                            </div>
                          ) : (
                            <div className="py-12 text-center text-gray-500">
                              <p>No reviews yet for this lesson.</p>
                              <p className="text-sm mt-1">Be the first to leave a review!</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-96 max-h-[70vh] overflow-y-auto border-2 border-y rounded-xl mr-9 border-gray-200 bg-white">
          <div className="p-4 border-b-2 border-gray-100">
            <h2 className="text-sm text-gray-700">
              Lessons ({completedLessons}/{totalLessons})
            </h2>
          </div>

          <div className="">
            {Object.entries(sections).map(([sectionName, sectionLessons]) => {
              const sectionCompleted = sectionLessons.every(l => l.isCompleted);
              const isExpanded = expandedSections.includes(sectionName);
              
              return (
                <div key={sectionName} className="border-b border-gray-100 last:border-0">
                  <button
                    onClick={() => toggleSection(sectionName)}
                    className="flex w-full items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-sm text-gray-800">{sectionName}</span>
                    <div className="flex items-center gap-2">
                      {sectionCompleted && (
                        <Image
                          src="/icons/tick-circle.svg"
                          alt="Section Completed"
                          className="h-5 w-5"
                          width={20}
                          height={20}
                        />
                      )}
                      {isExpanded ? (
                        <Image src="/icons/arrow-up.svg" alt="Up" className="h-5 w-5" width={24} height={24} />
                      ) : (
                        <Image src="/icons/arrow-down.svg" alt="Down" className="h-5 w-5" width={24} height={24} />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="space-y-1 pb-2">
                      {sectionLessons.map(lesson => (
                        <Link
                          key={lesson.id}
                          href={`/courses/${courseId}/lessons/${lesson.id}`}
                          className={`flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                            lesson.id === lessonId
                              ? 'bg-blue-50 text-[var(--blue-primary-alpha)]'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <span className="truncate mr-2 font-medium">{lesson.title}</span>
                          {lesson.isCompleted ? (
                            <Image
                              src="/icons/tick-circle.svg"
                              alt="Completed"
                              className="h-6 w-6 text-blue-primary-alpha shrink-0"
                              width={24}
                              height={24}
                            />
                          ) : (
                            <div
                              className={`h-6 w-6 rounded-full border shrink-0 ${
                                lesson.id === lessonId ? 'border-[var(--blue-primary-alpha)]' : 'border-gray-300'
                              }`}
                            />
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
