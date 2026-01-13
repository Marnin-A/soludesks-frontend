'use client';

import { use, useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HiOutlinePlay, HiArrowLeft } from 'react-icons/hi';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

import {
  useGetCourseByIdQuery,
  useGetLessonsQuery,
  useGetLessonReviewsQuery,
  useUpdateLessonCompletionMutation,
} from '@/store/services/api';
import { Lesson, LessonReview } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import Image from 'next/image';

const feedbackHighlights = [
  { label: 'Content quality', score: 4.9 },
  { label: 'Instructor clarity', score: 4.8 },
  { label: 'Real-world examples', score: 4.7 },
  { label: 'Lesson pacing', score: 4.6 },
];

const feedbackKeywords = [
  'Concise explanations',
  'Practical prompts',
  'Downloadable assets',
  'Role-play videos',
  'Stakeholder focus',
  'Pacing & flow',
];

const reviewSortOptions = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'highest', label: 'Highest Rated' },
  { value: 'lowest', label: 'Lowest Rated' },
];

const calculateReviewStats = (reviews: LessonReview[]) => {
  const total = reviews.length;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  reviews.forEach(review => {
    const key = Math.round(review.rating);
    counts[key] = (counts[key] || 0) + 1;
  });

  const distribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: counts[star],
    percent: total ? Math.round((counts[star] / total) * 100) : 0,
  }));

  return { total, average: total ? sum / total : 0, distribution };
};

interface LessonPageProps {
  params: Promise<{ id: string; lessonId: string }>;
}

export default function LessonPage({ params }: LessonPageProps) {
  const { id: courseId, lessonId } = use(params);
  const router = useRouter();
  const { data: course } = useGetCourseByIdQuery(courseId);
  const { data: lessons, isLoading } = useGetLessonsQuery(courseId);
  const { data: lessonReviews = [], isLoading: reviewsLoading } = useGetLessonReviewsQuery({ courseId, lessonId });
  const [updateLessonCompletion, { isLoading: isUpdating }] = useUpdateLessonCompletionMutation();

  const currentLesson = lessons?.find(l => l.id === lessonId);
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
  const [reviewSearch, setReviewSearch] = useState('');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'highest' | 'lowest'>('recent');

  const reviewStats = useMemo(() => calculateReviewStats(lessonReviews), [lessonReviews]);

  const filteredReviews = useMemo(() => {
    let filtered = lessonReviews;

    if (selectedRating) {
      filtered = filtered.filter(review => Math.round(review.rating) === selectedRating);
    }

    if (reviewSearch.trim()) {
      const term = reviewSearch.toLowerCase();
      filtered = filtered.filter(review => {
        const matchesText =
          review.comment.toLowerCase().includes(term) ||
          review.name.toLowerCase().includes(term) ||
          review.role.toLowerCase().includes(term) ||
          review.city.toLowerCase().includes(term);
        const matchesTag = review.tags?.some(tag => tag.toLowerCase().includes(term));
        return matchesText || matchesTag;
      });
    }

    return [...filtered].sort((a, b) => {
      if (sortBy === 'highest') return b.rating - a.rating;
      if (sortBy === 'lowest') return a.rating - b.rating;
      return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
    });
  }, [reviewSearch, selectedRating, sortBy]);

  const renderStars = (value: number) =>
    Array.from({ length: 5 }).map((_, index) => {
      const starValue = index + 1;
      if (value >= starValue) return <FaStar key={starValue} className="h-4 w-4 text-amber-400" />;
      if (value > index && value < starValue) return <FaStarHalfAlt key={starValue} className="h-4 w-4 text-amber-400" />;
      return <FaRegStar key={starValue} className="h-4 w-4 text-amber-300" />;
    });

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

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
                    className={`border-blue-primary px-12 ${
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
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {reviewsLoading ? (
                  <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
                    <div className="h-32 animate-pulse rounded-t-xl bg-gray-100" />
                    <div className="p-6 space-y-3">
                      <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
                      <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100" />
                      <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 px-6 py-5">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500">Overall satisfaction</p>
                      <div className="mt-2 flex items-end gap-3">
                        <span className="text-4xl font-bold text-gray-900">{reviewStats.average.toFixed(1)}</span>
                        <div className="mb-1 flex items-center gap-1">{renderStars(reviewStats.average)}</div>
                      </div>
                      <p className="text-xs text-gray-500">Based on {reviewStats.total} responses</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="w-64">
                        <Input
                          placeholder="Search feedback"
                          value={reviewSearch}
                          onChange={e => setReviewSearch(e.target.value)}
                          icon={<Image src="/icons/search-normal.svg" alt="search" width={18} height={18} />}
                          iconPosition="right"
                          className="rounded-full"
                        />
                      </div>
                      <Select
                        options={reviewSortOptions}
                        value={sortBy}
                        onChange={value => setSortBy(value as 'recent' | 'highest' | 'lowest')}
                        className="rounded-full pr-9"
                      />
                      <div className="flex flex-wrap items-center gap-2">
                        {[5, 4, 3, 2, 1].map(rating => (
                          <button
                            key={rating}
                            onClick={() => setSelectedRating(prev => (prev === rating ? null : rating))}
                            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                              selectedRating === rating
                                ? 'border-[var(--blue-primary-alpha)] bg-blue-50 text-[var(--blue-primary-alpha)]'
                                : 'border-gray-200 text-gray-600 hover:border-[var(--blue-primary-alpha)]/50'
                            }`}
                          >
                            {rating}★
                          </button>
                        ))}
                        <button
                          onClick={() => setSelectedRating(null)}
                          className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:border-[var(--blue-primary-alpha)]/50"
                        >
                          All
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 px-6 py-6 lg:grid-cols-3">
                    <div className="rounded-lg border border-gray-100 bg-blue-50/60 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">Rating breakdown</p>
                          <p className="text-xs text-gray-500">Distribution across the course</p>
                        </div>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
                          {reviewStats.total} reviews
                        </span>
                      </div>
                      <div className="mt-4 space-y-3">
                        {reviewStats.distribution.map(item => (
                          <div key={item.star} className="flex items-center gap-3">
                            <div className="flex w-14 items-center justify-between text-xs font-semibold text-gray-700">
                              <span>{item.star}</span>
                              <FaStar className="h-4 w-4 text-amber-400" />
                            </div>
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white shadow-inner">
                              <div
                                className="h-full rounded-full bg-[var(--blue-primary-alpha)]"
                                style={{ width: `${item.percent}%` }}
                              />
                            </div>
                            <span className="w-12 text-right text-xs font-medium text-gray-600">{item.percent}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-[0_1px_6px_rgba(16,24,40,0.05)]">
                      <p className="text-sm font-semibold text-gray-900">Feedback focus</p>
                      <p className="text-xs text-gray-500">How each area performed</p>
                      <div className="mt-4 space-y-3">
                        {feedbackHighlights.map(item => (
                          <div key={item.label} className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs font-medium text-gray-700">
                              <span>{item.label}</span>
                              <span>{item.score.toFixed(1)}</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                              <div
                                className="h-full rounded-full bg-[linear-gradient(90deg,#0A60E1,#7EB6FF)]"
                                style={{ width: `${(item.score / 5) * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-[0_1px_6px_rgba(16,24,40,0.05)]">
                      <p className="text-sm font-semibold text-gray-900">Top keywords</p>
                      <p className="text-xs text-gray-500">Themes learners mention most</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {feedbackKeywords.map(keyword => (
                          <span
                            key={keyword}
                            className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[var(--blue-primary-alpha)]"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  </div>
                )}

                <div className="space-y-4">
                  {filteredReviews.map(review => (
                    <div
                      key={review.id}
                      className="rounded-xl border border-gray-100 bg-white p-5 shadow-[0_1px_6px_rgba(16,24,40,0.05)]"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                            {review.avatar ? (
                              <Image src={review.avatar} alt={review.name} fill className="object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-gray-600">
                                {review.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                            <p className="text-xs text-gray-500">
                              {review.role} · {review.city}
                            </p>
                            {review.highlight && <p className="text-xs text-[var(--blue-primary-alpha)]">{review.highlight}</p>}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                            <span className="text-sm font-semibold text-gray-900">{review.rating.toFixed(1)}</span>
                          </div>
                          <p className="text-xs text-gray-500">{formatDate(review.submittedAt)}</p>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-gray-700">{review.comment}</p>
                      {review.tags && review.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {review.tags.map(tag => (
                            <span
                              key={tag}
                              className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {review.attachments && review.attachments.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-3">
                          {review.attachments.map(file => (
                            <div
                              key={file}
                              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-700"
                            >
                              <Image src="/file.svg" alt="file" width={16} height={16} className="h-4 w-4" />
                              <span className="truncate">{file}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  {filteredReviews.length === 0 && (
                    <div className="rounded-xl border border-gray-100 bg-white p-6 text-center text-sm text-gray-600 shadow-sm">
                      No feedback matches your filters yet.
                    </div>
                  )}
                </div>
              </div>
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
            {Object.entries(sections).map(([sectionName, sectionLessons]) => (
              <div key={sectionName} className="border-b border-gray-100 last:border-0">
                <button
                  onClick={() => toggleSection(sectionName)}
                  className="flex w-full items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-sm text-gray-800">{sectionName}</span>
                  {expandedSections.includes(sectionName) ? (
                    <Image src="/icons/arrow-up.svg" alt="Up" className="h-5 w-5" width={24} height={24} />
                  ) : (
                    <Image src="/icons/arrow-down.svg" alt="Down" className="h-5 w-5" width={24} height={24} />
                  )}
                </button>

                {expandedSections.includes(sectionName) && (
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
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
