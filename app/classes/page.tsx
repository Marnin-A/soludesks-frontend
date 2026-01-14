'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface ClassSession {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar: string;
  date: string;
  time: string;
  duration: string;
  status: 'upcoming' | 'live' | 'completed';
  attendees: number;
  maxAttendees: number;
  category: string;
}

const mockClasses: ClassSession[] = [
  {
    id: '1',
    title: 'Advanced Communication Strategies',
    instructor: 'Dr. Sarah Chen',
    instructorAvatar: '/people/Monica-Patel.png',
    date: '2025-01-15',
    time: '10:00 AM',
    duration: '1h 30min',
    status: 'upcoming',
    attendees: 24,
    maxAttendees: 30,
    category: 'Soft Skills',
  },
  {
    id: '2',
    title: 'Data Analytics Workshop',
    instructor: 'Prof. Michael Ross',
    instructorAvatar: '/people/Dinesh-Kumar.png',
    date: '2025-01-14',
    time: '2:00 PM',
    duration: '2h',
    status: 'live',
    attendees: 18,
    maxAttendees: 25,
    category: 'Technical',
  },
  {
    id: '3',
    title: 'Project Management Fundamentals',
    instructor: 'Emma Thompson',
    instructorAvatar: '/people/Nithya-Menon.png',
    date: '2025-01-13',
    time: '11:00 AM',
    duration: '1h',
    status: 'completed',
    attendees: 28,
    maxAttendees: 30,
    category: 'Business',
  },
  {
    id: '4',
    title: 'Digital Marketing Trends 2025',
    instructor: 'Alex Rivera',
    instructorAvatar: '/people/Jagathesh-Narayanan.png',
    date: '2025-01-16',
    time: '3:00 PM',
    duration: '1h 30min',
    status: 'upcoming',
    attendees: 15,
    maxAttendees: 40,
    category: 'Digital Skills',
  },
  {
    id: '5',
    title: 'Leadership in Remote Teams',
    instructor: 'Dr. Lisa Park',
    instructorAvatar: '/people/Meera-Gonzalez.png',
    date: '2025-01-17',
    time: '9:00 AM',
    duration: '2h',
    status: 'upcoming',
    attendees: 32,
    maxAttendees: 35,
    category: 'Soft Skills',
  },
  {
    id: '6',
    title: 'Python for Beginners',
    instructor: 'James Wilson',
    instructorAvatar: '/people/Dinesh-Kumar.png',
    date: '2025-01-12',
    time: '4:00 PM',
    duration: '1h 30min',
    status: 'completed',
    attendees: 40,
    maxAttendees: 40,
    category: 'Technical',
  },
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'live', label: 'Live Now' },
  { value: 'completed', label: 'Completed' },
];

const categoryOptions = [
  { value: '', label: 'All Categories' },
  { value: 'Soft Skills', label: 'Soft Skills' },
  { value: 'Technical', label: 'Technical' },
  { value: 'Business', label: 'Business' },
  { value: 'Digital Skills', label: 'Digital Skills' },
];

function getStatusBadge(status: ClassSession['status']) {
  switch (status) {
    case 'live':
      return <Badge variant="danger" className="animate-pulse">● Live Now</Badge>;
    case 'upcoming':
      return <Badge variant="secondary">Upcoming</Badge>;
    case 'completed':
      return <Badge variant="success">Completed</Badge>;
    default:
      return null;
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export default function ClassesPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');

  const filteredClasses = mockClasses.filter(cls => {
    const matchesSearch = cls.title.toLowerCase().includes(search.toLowerCase()) ||
                         cls.instructor.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !status || cls.status === status;
    const matchesCategory = !category || cls.category === category;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="p-4 sm:p-6">
      {/* Page Header */}
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-bold text-text-dark">Classes</h1>
        <p className="text-sm text-text-gray">Join live sessions and interactive workshops with instructors</p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <div className="flex items-center p-4 bg-white rounded-xl border border-gray-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
            <Image src="/icons/board-math.svg" alt="Classes" width={24} height={24} />
          </div>
          <div className="ml-4">
            <p className="text-sm text-text-gray">Total Classes</p>
            <p className="text-2xl font-bold text-text-dark">48</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded-xl border border-gray-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-50">
            <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-text-gray">Live Now</p>
            <p className="text-2xl font-bold text-text-dark">2</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded-xl border border-gray-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50">
            <Image src="/icons/calendar.svg" alt="Upcoming" width={24} height={24} />
          </div>
          <div className="ml-4">
            <p className="text-sm text-text-gray">Upcoming</p>
            <p className="text-2xl font-bold text-text-dark">12</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded-xl border border-gray-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50">
            <Image src="/icons/tick-circle.svg" alt="Completed" width={24} height={24} />
          </div>
          <div className="ml-4">
            <p className="text-sm text-text-gray">Completed</p>
            <p className="text-2xl font-bold text-text-dark">34</p>
          </div>
        </div>
      </div>

      {/* Filters and Classes List */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6">
        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="w-full md:w-80">
            <Input
              icon={<Image src="/icons/search-normal.svg" alt="search" width={20} height={20} />}
              iconPosition="right"
              placeholder="Search classes or instructors"
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
            <div className="w-full min-w-[140px] sm:w-40">
              <Select
                options={categoryOptions}
                value={category}
                onChange={setCategory}
                placeholder="Category"
              />
            </div>
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredClasses.map(cls => (
            <div
              key={cls.id}
              className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                    <Image src={cls.instructorAvatar} alt={cls.instructor} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-main-text">{cls.instructor}</p>
                    <p className="text-xs text-gray-500">{cls.category}</p>
                  </div>
                </div>
                {getStatusBadge(cls.status)}
              </div>

              <h3 className="font-semibold text-main-text mb-2 line-clamp-2">{cls.title}</h3>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Image src="/icons/calendar.svg" alt="Date" width={16} height={16} />
                  <span>{formatDate(cls.date)}</span>
                </div>
                <span>{cls.time}</span>
                <span>·</span>
                <span>{cls.duration}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(Math.min(3, cls.attendees))].map((_, i) => (
                      <div
                        key={i}
                        className="h-6 w-6 rounded-full border-2 border-white bg-gray-200"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    {cls.attendees}/{cls.maxAttendees} attendees
                  </span>
                </div>

                <Button
                  size="sm"
                  variant={cls.status === 'live' ? 'primary' : cls.status === 'upcoming' ? 'outline' : 'ghost'}
                  className="text-xs"
                  disabled={cls.status === 'completed'}
                >
                  {cls.status === 'live' ? 'Join Now' : cls.status === 'upcoming' ? 'Register' : 'View Recording'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredClasses.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            <Image src="/icons/board-math.svg" alt="No classes" width={48} height={48} className="mx-auto opacity-50 mb-4" />
            <p>No classes found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
