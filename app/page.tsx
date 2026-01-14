'use client';

import { useState } from 'react';
import { useGetCoursesQuery, useGetStatsQuery } from '@/store/services/api';
import { StatCard } from '@/components/ui/StatCard';
import { CourseCard } from '@/components/ui/CourseCard';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Pagination } from '@/components/ui/Pagination';
import Image from 'next/image';

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

const limitOptions = [
  { value: '10', label: 'Show 10/page' },
  { value: '5', label: 'Show 5/page' },
  { value: '15', label: 'Show 15/page' },
  { value: '20', label: 'Show 20/page' },
];

export default function CoursesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [limit, setLimit] = useState(10);

  const { data: stats, isLoading: statsLoading } = useGetStatsQuery();
  const { data: coursesData, isLoading: coursesLoading } = useGetCoursesQuery({
    page,
    limit,
    category,
    search,
  });
  const handleLimitChange = (value: string) => {
    setLimit(Number(value));
    setPage(1);
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Page Header */}
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-medium text-text-dark">Course Management</h1>
        <p className="text-sm font-light text-text-gray">Create, organize, and assign courses to teams and individuals</p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <StatCard
          icon={<Image src="/icons/book-purple.svg" alt="Book" width={24} height={24} />}
          label="Total Courses"
          value={statsLoading ? '...' : stats?.totalCourses || 0}
          iconBgColor="bg-[linear-gradient(180deg,#F3F1FC_0%,#FBEEFE_36%,#ECE2FE_75%,#DCD5FD_100%)]"
        />
        <StatCard
          icon={<Image src="/icons/teacher.svg" alt="Users" width={24} height={24} />}
          label="Total Enrollments"
          value={statsLoading ? '...' : stats?.totalEnrollments || 0}
          iconBgColor="bg-[linear-gradient(180deg,#CFF4FC_0%,#CFF5FC_50%,#BBF0FA_75%,#D2F6FE_100%)]"
        />
        <StatCard
          icon={<Image src="/icons/task.svg" alt="Average Completion" width={24} height={24} />}
          label="Avg Completion"
          value={statsLoading ? '...' : `${stats?.avgCompletion || 0}%`}
          trend={stats?.completionTrend}
          iconBgColor="bg-[linear-gradient(180deg,#F3C9A5_0%,#F8DFC9_36%,#F9E1CD_75%,#FBE4D0_100%)]"
        />
      </div>
      <div className="p-4 sm:p-5 bg-white rounded-lg">
        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="w-full md:max-w-md">
            <Input
              icon={<Image src="/icons/search-normal.svg" alt="search" width={20} height={20} />}
              iconPosition="right"
              placeholder="Search Course"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="rounded-full w-full"
            />
          </div>
          <div className="flex w-full flex-wrap gap-3 sm:justify-start md:w-auto md:justify-end">
            <div className="w-full min-w-[150px] sm:w-40">
              <Select
                options={dateOptions}
                value={dateRange}
                onChange={setDateRange}
                placeholder="Date"
                className="pr-2"
                icon="/icons/calendar.svg"
              />
            </div>
            <div className="w-full min-w-[150px] sm:w-44">
              <Select
                options={categoryOptions}
                value={category}
                onChange={setCategory}
                placeholder="Category"
                className="rounded-full"
              />
            </div>
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
            <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
              {coursesData?.courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {/* Pagination */}
            {/* {coursesData && coursesData.pagination.totalPages > 1 && ( */}

            <Pagination
              limit={limit}
              limitOptions={limitOptions}
              currentPage={coursesData?.pagination.currentPage || 1}
              totalPages={coursesData?.pagination.totalPages || 1}
              onPageChange={setPage}
              handleLimitChange={handleLimitChange}
            />
            {/* )} */}
          </>
        )}
      </div>
    </div>
  );
}
