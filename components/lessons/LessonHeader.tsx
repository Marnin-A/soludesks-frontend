'use client';

import Link from 'next/link';
import Image from 'next/image';

interface LessonHeaderProps {
  courseId: string;
  courseTitle?: string;
}

export function LessonHeader({ courseId, courseTitle }: LessonHeaderProps) {
  return (
    <div className="flex items-center gap-4 px-4 py-4 sm:px-6">
      <Link
        href={`/courses/${courseId}`}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <Image src="/icons/Line arrow-left.svg" alt="Back" className="w-6 h-6" width={24} height={24} />
      </Link>
      <h1 className="text-xl font-bold text-gray-800">{courseTitle}</h1>
    </div>
  );
}
