import { NextResponse } from 'next/server';
import { mockCourses } from '@/data/mockData';

export async function GET(request: Request) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '9');
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';

  // Filter courses
  let filteredCourses = mockCourses;

  if (category && category !== 'all') {
    filteredCourses = filteredCourses.filter(course => course.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    filteredCourses = filteredCourses.filter(
      course =>
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

  return NextResponse.json({
    success: true,
    data: {
      courses: paginatedCourses,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredCourses.length / limit),
        itemsPerPage: limit,
        totalItems: filteredCourses.length,
      },
    },
  });
}
