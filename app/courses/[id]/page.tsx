'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import { useGetCourseByIdQuery, useGetApplicantsQuery } from '@/store/services/api';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { Student } from '@/types';
import Link from 'next/link';
import { Pagination } from '@/components/ui/Pagination';

interface CourseDetailPageProps {
  params: Promise<{ id: string }>;
}

const limitOptions = [
  { value: '10', label: 'Show 10/page' },
  { value: '5', label: 'Show 5/page' },
  { value: '15', label: 'Show 15/page' },
  { value: '20', label: 'Show 20/page' },
];

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { id } = use(params);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: course, isLoading: courseLoading } = useGetCourseByIdQuery(id);
  const { data: applicantsData, isLoading: applicantsLoading } = useGetApplicantsQuery({
    courseId: id,
    page,
    limit,
  });

  const handleLimitChange = (value: string) => {
    setLimit(Number(value));
    setPage(1);
  };

  if (courseLoading) {
    return (
      <div className="p-6">
        <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />
        <div className="mt-6 h-64 animate-pulse rounded-xl bg-gray-200" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-main-text-2">Course not found</p>
      </div>
    );
  }

  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (student: Student) => (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-neutral-100 flex justify-center items-center">
            {student.avatar ? (
              <Image src={student.avatar} alt={student.name} fill className="object-cover" />
            ) : (
              <Image src="/icons/Person.svg" alt="user" width={24} height={24} className="w-6 h-6" />
            )}
          </div>
          <span className="font-normal text-main-text-2">{student.name}</span>
        </div>
      ),
    },
    {
      key: 'city',
      header: 'City',
    },
    {
      key: 'email',
      header: 'Email Address',
    },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <button className="rounded-lg p-2 text-blue-primary hover:bg-blue-primary/10">
          <Image src="/icons/message-text.svg" alt="message" width={24} height={24} className="w-6 h-6" />
        </button>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6">
      {/* Course Header */}
      <div className="mb-6 flex gap-4 xl:flex-row xl:items-center md:justify-between max-xl:flex-col max-xl:items-start">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex h-11 w-11 items-center justify-center rounded-full bg-border-gray text-text-dark hover:bg-border-gray/80">
            <Image src="/icons/Line arrow-left.svg" alt="back to courses" width={24} height={24} />
          </Link>
          <h1 className="text-2xl font-medium text-main-text ">{course.title}</h1>
          <Badge className="py-2 px-5 max-xl:hidden" variant="secondary">{course.category}</Badge>
        </div>
        <Link href={`/courses/${id}/lessons/1`} className="w-full md:w-auto max-xl:hidden">
          <Button className="w-full py-3 px-6">Start Learning</Button>
        </Link>
        <div className="max-xl:flex gap-4 max-xl:justify-end xl:hidden w-full">
          <Badge className="py-2 px-5 w-max whitespace-nowrap" variant="secondary">{course.category}</Badge>
          <Link href={`/courses/${id}/lessons/1`} className="w-full">
            <Button className="w-full py-3 px-6">Start Learning</Button>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative mb-8 h-64 w-full overflow-hidden rounded-xl">
        <Image src={course.image} alt={course.title} fill className="object-cover" />
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <StatCard
          icon={<Image src="/icons/profile-2user.svg" alt="total applicants" width={24} height={24} />}
          label="Total Applicants"
          value={course.totalApplicants}
          iconBgColor="bg-[linear-gradient(180deg,#BEFDD9_0%,#D4FEB4_53%,#CBFAC2_100%)]"
        />
        <StatCard
          icon={<Image src="/icons/teacher.svg" alt="active learners" width={24} height={24} />}
          label="Active Learners"
          value={course.activeLearnersCount}
          iconBgColor="bg-[linear-gradient(180deg,#CFF4FC_0%,#CFF5FC_50%,#BBF0FA_75%,#D2F6FE_100%)]"
        />
      </div>

      {/* Applicants Table */}
      <div>
        {applicantsLoading ? (
          <div className="h-64 animate-pulse rounded-xl bg-gray-200" />
        ) : (
          <div className="bg-white overflow-x-auto rounded-xl border border-border-gray">
            <Table
              columns={columns}
              data={applicantsData?.applicants || []}
              keyExtractor={(student: Student) => student.id}
            />
            <Pagination
              currentPage={page}
              handleLimitChange={handleLimitChange}
              limit={limit}
              limitOptions={limitOptions}
              onPageChange={setPage}
              totalPages={applicantsData?.pagination.totalPages || 0}
              className="px-6 py-5"
            />
          </div>
        )}
      </div>
    </div>
  );
}
