'use client';

import { useState } from 'react';
import { HiOutlineSearch, HiOutlineBookOpen, HiOutlineUsers, HiOutlineTrendingUp } from 'react-icons/hi';
import { useGetCoursesQuery, useGetStatsQuery } from '@/store/services/api';
import { StatCard } from '@/components/ui/StatCard';
import { CourseCard } from '@/components/ui/CourseCard';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Pagination } from '@/components/ui/Pagination';

const categoryOptions = [
  { value: '', label: 'All Categories' },
  { value: 'soft skill', label: 'Soft Skill' },
  { value: 'digital skills', label: 'Digital Skills' },
  { value: 'technical', label: 'Technical' },
  { value: 'business', label: 'Business' },
];

const dateOptions = [
  { value: '', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
];

export default function CoursesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [dateRange, setDateRange] = useState('');

  const { data: stats, isLoading: statsLoading } = useGetStatsQuery();
  const { data: coursesData, isLoading: coursesLoading } = useGetCoursesQuery({
    page,
    limit: 9,
    category,
    search,
  });

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-dark)]">Courses</h1>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <StatCard
          icon={<HiOutlineBookOpen className="h-6 w-6 text-[var(--blue-primary)]" />}
          label="Total Courses"
          value={statsLoading ? '...' : stats?.totalCourses || 0}
          iconBgColor="bg-[var(--blue-primary)]/10"
        />
        <StatCard
          icon={<HiOutlineUsers className="h-6 w-6 text-[var(--green-stat)]" />}
          label="Total Enrollments"
          value={statsLoading ? '...' : stats?.totalEnrollments || 0}
          iconBgColor="bg-[var(--green-stat)]/10"
        />
        <StatCard
          icon={<HiOutlineTrendingUp className="h-6 w-6 text-purple-600" />}
          label="Avg Completion"
          value={statsLoading ? '...' : `${stats?.avgCompletion || 0}%`}
          trend={stats?.completionTrend}
          iconBgColor="bg-purple-100"
        />
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="w-72">
          <Input
            icon={<HiOutlineSearch className="h-5 w-5" />}
            placeholder="Search courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="w-40">
          <Select options={dateOptions} value={dateRange} onChange={setDateRange} placeholder="Date" />
        </div>
        <div className="w-44">
          <Select options={categoryOptions} value={category} onChange={setCategory} placeholder="Category" />
        </div>
      </div>

      {/* Course Grid */}
      {coursesLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-xl bg-gray-200" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {coursesData?.courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {/* Pagination */}
          {coursesData && coursesData.pagination.totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={coursesData.pagination.currentPage}
                totalPages={coursesData.pagination.totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
