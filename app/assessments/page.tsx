'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StatCard } from '@/components/ui/StatCard';

interface Assessment {
  id: string;
  title: string;
  course: string;
  type: 'quiz' | 'exam' | 'assignment' | 'project';
  questions: number;
  duration: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  score?: number;
  maxScore: number;
  attempts: number;
  maxAttempts: number;
}

const mockAssessments: Assessment[] = [
  {
    id: '1',
    title: 'Communication Skills Assessment',
    course: 'Effective Workplace Communication',
    type: 'quiz',
    questions: 20,
    duration: '30 mins',
    dueDate: '2025-01-20',
    status: 'pending',
    maxScore: 100,
    attempts: 0,
    maxAttempts: 3,
  },
  {
    id: '2',
    title: 'Digital Marketing Fundamentals Exam',
    course: 'Digital Marketing Fundamentals',
    type: 'exam',
    questions: 50,
    duration: '1 hour',
    dueDate: '2025-01-18',
    status: 'in_progress',
    maxScore: 100,
    attempts: 1,
    maxAttempts: 2,
  },
  {
    id: '3',
    title: 'Data Analysis Project',
    course: 'Data Analysis with Excel',
    type: 'project',
    questions: 5,
    duration: '3 days',
    dueDate: '2025-01-25',
    status: 'pending',
    maxScore: 100,
    attempts: 0,
    maxAttempts: 1,
  },
  {
    id: '4',
    title: 'Leadership Case Study',
    course: 'Leadership and Team Building',
    type: 'assignment',
    questions: 3,
    duration: '2 hours',
    dueDate: '2025-01-10',
    status: 'completed',
    score: 92,
    maxScore: 100,
    attempts: 1,
    maxAttempts: 2,
  },
  {
    id: '5',
    title: 'Web Development Quiz 1',
    course: 'Web Development Basics',
    type: 'quiz',
    questions: 15,
    duration: '20 mins',
    dueDate: '2025-01-08',
    status: 'completed',
    score: 88,
    maxScore: 100,
    attempts: 2,
    maxAttempts: 3,
  },
  {
    id: '6',
    title: 'Time Management Assessment',
    course: 'Time Management Mastery',
    type: 'quiz',
    questions: 25,
    duration: '45 mins',
    dueDate: '2025-01-05',
    status: 'overdue',
    maxScore: 100,
    attempts: 0,
    maxAttempts: 2,
  },
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'overdue', label: 'Overdue' },
];

const typeOptions = [
  { value: '', label: 'All Types' },
  { value: 'quiz', label: 'Quiz' },
  { value: 'exam', label: 'Exam' },
  { value: 'assignment', label: 'Assignment' },
  { value: 'project', label: 'Project' },
];

function getStatusBadge(status: Assessment['status']) {
  switch (status) {
    case 'pending':
      return <Badge variant="secondary">Pending</Badge>;
    case 'in_progress':
      return <Badge variant="warning">In Progress</Badge>;
    case 'completed':
      return <Badge variant="success">Completed</Badge>;
    case 'overdue':
      return <Badge variant="danger">Overdue</Badge>;
    default:
      return null;
  }
}

function getTypeBadge(type: Assessment['type']) {
  switch (type) {
    case 'quiz':
      return <Badge className="bg-purple-100 text-purple-700">Quiz</Badge>;
    case 'exam':
      return <Badge className="bg-blue-100 text-blue-700">Exam</Badge>;
    case 'assignment':
      return <Badge className="bg-amber-100 text-amber-700">Assignment</Badge>;
    case 'project':
      return <Badge className="bg-green-100 text-green-700">Project</Badge>;
    default:
      return null;
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getDaysUntil(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
  if (diffDays === 0) return 'Due today';
  if (diffDays === 1) return 'Due tomorrow';
  return `${diffDays} days left`;
}

export default function AssessmentsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');

  const filteredAssessments = mockAssessments.filter(assessment => {
    const matchesSearch = assessment.title.toLowerCase().includes(search.toLowerCase()) ||
                         assessment.course.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !status || assessment.status === status;
    const matchesType = !type || assessment.type === type;
    return matchesSearch && matchesStatus && matchesType;
  });

  const pendingCount = mockAssessments.filter(a => a.status === 'pending').length;
  const completedCount = mockAssessments.filter(a => a.status === 'completed').length;
  const averageScore = mockAssessments
    .filter(a => a.score !== undefined)
    .reduce((acc, a) => acc + (a.score || 0), 0) / mockAssessments.filter(a => a.score !== undefined).length || 0;

  return (
    <div className="p-4 sm:p-6">
      {/* Page Header */}
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-bold text-text-dark">Assessments</h1>
        <p className="text-sm text-text-gray">Track your quizzes, exams, and assignments progress</p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <StatCard
          icon={<Image src="/icons/assessment-book.svg" alt="Pending" width={24} height={24} />}
          label="Pending Assessments"
          value={pendingCount}
          iconBgColor="bg-amber-100"
        />
        <StatCard
          icon={<Image src="/icons/tick-circle.svg" alt="Completed" width={24} height={24} />}
          label="Completed"
          value={completedCount}
          iconBgColor="bg-green-100"
        />
        <StatCard
          icon={<Image src="/icons/award.svg" alt="Average Score" width={24} height={24} />}
          label="Average Score"
          value={`${averageScore.toFixed(0)}%`}
          iconBgColor="bg-[linear-gradient(180deg,#F3F1FC_0%,#FBEEFE_36%,#ECE2FE_75%,#DCD5FD_100%)]"
        />
      </div>

      {/* Filters and Assessments List */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6">
        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="w-full md:w-80">
            <Input
              icon={<Image src="/icons/search-normal.svg" alt="search" width={20} height={20} />}
              iconPosition="right"
              placeholder="Search assessments"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="rounded-full w-full"
            />
          </div>
          <div className="flex w-full flex-wrap gap-3 sm:justify-start md:w-auto md:justify-end">
            <div className="w-full min-w-[140px] sm:w-36">
              <Select
                options={statusOptions}
                value={status}
                onChange={setStatus}
                placeholder="Status"
              />
            </div>
            <div className="w-full min-w-[140px] sm:w-36">
              <Select
                options={typeOptions}
                value={type}
                onChange={setType}
                placeholder="Type"
              />
            </div>
          </div>
        </div>

        {/* Assessments Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-4 text-left text-sm font-medium text-gray-500">Assessment</th>
                <th className="pb-4 text-left text-sm font-medium text-gray-500">Type</th>
                <th className="pb-4 text-left text-sm font-medium text-gray-500">Duration</th>
                <th className="pb-4 text-left text-sm font-medium text-gray-500">Due Date</th>
                <th className="pb-4 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="pb-4 text-left text-sm font-medium text-gray-500">Score</th>
                <th className="pb-4 text-right text-sm font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssessments.map(assessment => (
                <tr key={assessment.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-4">
                    <div>
                      <p className="font-medium text-main-text">{assessment.title}</p>
                      <p className="text-sm text-gray-500">{assessment.course}</p>
                    </div>
                  </td>
                  <td className="py-4">{getTypeBadge(assessment.type)}</td>
                  <td className="py-4">
                    <div className="text-sm">
                      <p className="text-main-text">{assessment.duration}</p>
                      <p className="text-gray-500">{assessment.questions} questions</p>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="text-sm">
                      <p className="text-main-text">{formatDate(assessment.dueDate)}</p>
                      <p className={`text-xs ${assessment.status === 'overdue' ? 'text-red-500' : 'text-gray-500'}`}>
                        {getDaysUntil(assessment.dueDate)}
                      </p>
                    </div>
                  </td>
                  <td className="py-4">{getStatusBadge(assessment.status)}</td>
                  <td className="py-4">
                    {assessment.score !== undefined ? (
                      <div className="text-sm">
                        <p className="font-medium text-main-text">{assessment.score}/{assessment.maxScore}</p>
                        <p className="text-gray-500">
                          {assessment.attempts}/{assessment.maxAttempts} attempts
                        </p>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-4 text-right">
                    <Button
                      size="sm"
                      variant={
                        assessment.status === 'pending' || assessment.status === 'overdue'
                          ? 'primary'
                          : assessment.status === 'in_progress'
                          ? 'outline'
                          : 'ghost'
                      }
                      disabled={assessment.status === 'completed' && assessment.attempts >= assessment.maxAttempts}
                    >
                      {assessment.status === 'pending' || assessment.status === 'overdue'
                        ? 'Start'
                        : assessment.status === 'in_progress'
                        ? 'Continue'
                        : 'Review'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAssessments.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            <Image src="/icons/assessment-book.svg" alt="No assessments" width={48} height={48} className="mx-auto opacity-50 mb-4" />
            <p>No assessments found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
