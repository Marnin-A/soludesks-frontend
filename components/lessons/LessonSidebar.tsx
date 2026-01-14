'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Lesson } from '@/types';

interface LessonSidebarProps {
  courseId: string;
  lessons: Lesson[];
  currentLessonId: string;
}

export function LessonSidebar({ courseId, lessons, currentLessonId }: LessonSidebarProps) {
  const totalLessons = lessons.length;
  const completedLessons = lessons.filter(l => l.isCompleted).length;

  // Group lessons by section
  const sections = useMemo(() => {
    return lessons.reduce((acc, lesson) => {
      const section = lesson.section || 'General';
      if (!acc[section]) {
        acc[section] = [];
      }
      acc[section].push(lesson);
      return acc;
    }, {} as Record<string, Lesson[]>);
  }, [lessons]);

  // Calculate initial expanded section
  const currentLesson = lessons.find(l => l.id === currentLessonId);
  const initialExpandedSection = useMemo(() => {
    return currentLesson ? [currentLesson.section || 'General'] : [];
  }, [currentLesson]);

  const [expandedSections, setExpandedSections] = useState<string[]>(initialExpandedSection);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => (prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]));
  };

  return (
    <aside className="w-full overflow-hidden rounded-xl border-2 border-y border-gray-200 bg-white lg:mr-9 lg:w-96 lg:max-h-[70vh] lg:overflow-y-auto">
      <div className="border-b-2 border-gray-100 p-4">
        <h2 className="text-sm text-gray-700">
          Lessons ({completedLessons}/{totalLessons})
        </h2>
      </div>

      <div className="overflow-y-auto">
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
                      src="/icons/tick-circle-green.svg"
                      alt="Section Completed"
                      className="w-6 h-6"
                      width={24}
                      height={24}
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
                        lesson.id === currentLessonId
                          ? 'bg-blue-50 text-blue-primary-alpha'
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
                            lesson.id === currentLessonId ? 'border-blue-primary-alpha' : 'border-gray-300'
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
  );
}
