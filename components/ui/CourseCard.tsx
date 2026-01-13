import Image from 'next/image';
import Link from 'next/link';
import { Course } from '@/types';
import { Badge } from './Badge';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`} className="group block">
      <div className="overflow-hidden rounded-xl border border-[var(--border-gray)] bg-white transition-shadow hover:shadow-lg">
        {/* Image */}
        <div className="relative h-40 w-full overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="text-base font-semibold text-text-dark line-clamp-1">{course.title}</h3>
          <p className="mb-6 text-sm text-text-gray line-clamp-2">{course.description}</p>
          <div className="mb-2">
            <Badge>{course.category}</Badge>
          </div>
        </div>
      </div>
    </Link>
  );
}
