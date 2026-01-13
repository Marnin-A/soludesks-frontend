'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import { HiOutlineUsers, HiOutlineUserGroup, HiOutlineMail } from 'react-icons/hi';
import { useGetCourseByIdQuery, useGetApplicantsQuery } from '@/store/services/api';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { Student } from '@/types';
import Link from 'next/link';
import { Pagination } from '@/components/ui/Pagination';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const { data: course, isLoading: courseLoading } = useGetCourseByIdQuery(id);
  const { data: applicants, isLoading: applicantsLoading } = useGetApplicantsQuery(id);

  const handleLimitChange = (value: string) => {
    setLimit(Number(value));
    setPage(1);
  };
  const handleBackToCourses = () => {
    router.back();
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
        <p className="text-text-gray">Course not found</p>
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
          <span className="font-medium text-text-dark">{student.name}</span>
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
        <button className="rounded-lg p-2 text-[var(--blue-primary)] hover:bg-[var(--blue-primary)]/10">
          <Image src="/icons/message-text.svg" alt="message" width={24} height={24} className="w-6 h-6" />
        </button>
      ),
    },
  ];

  return (
    <div className="p-6">
      {/* Course Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="rounded-full h-11 w-11 p-0" onClick={handleBackToCourses}>
            <Image src="/icons/Line arrow-left.svg" alt="back to courses" width={24} height={24} />
          </Button>
          <h1 className="text-2xl font-bold text-text-dark">{course.title}</h1>
          <Badge className="py-2 px-5">{course.category}</Badge>
        </div>
        <Link href={`/courses/${id}/lessons/1`}>
          <Button className="py-3 px-15">Start Learning</Button>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="relative mb-8 h-64 w-full overflow-hidden rounded-xl">
        <Image src={course.image} alt={course.title} fill className="object-cover" />
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <StatCard
          icon={<HiOutlineUsers className="h-6 w-6 text-amber-500" />}
          label="Total Applicants"
          value={course.totalApplicants}
          iconBgColor="bg-amber-100"
        />
        <StatCard
          icon={<HiOutlineUserGroup className="h-6 w-6 text-[var(--green-stat)]" />}
          label="Active Learners"
          value={course.activeLearnersCount}
          iconBgColor="bg-[var(--green-stat)]/10"
        />
      </div>

      {/* Applicants Table */}
      <div>
        {applicantsLoading ? (
          <div className="h-64 animate-pulse rounded-xl bg-gray-200" />
        ) : (
          <div className="bg-white overflow-x-auto rounded-xl border border-border-gray">
            <Table columns={columns} data={applicants || []} keyExtractor={(student: Student) => student.id} />
            <Pagination
              currentPage={page}
              handleLimitChange={handleLimitChange}
              limit={limit}
              limitOptions={limitOptions}
              onPageChange={setPage}
              totalPages={Math.ceil((applicants?.length || 0) / limit)}
              className="px-6 py-5"
            />
          </div>
        )}
      </div>
    </div>
  );
}
