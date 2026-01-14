import { NextResponse } from 'next/server';
import { mockStudents } from '@/data/mockData';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const { id } = await params;
  const { searchParams } = new URL(request.url);
  
  // Get pagination parameters
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  // In a real app, we'd filter students by courseId
  // For now, return all mock students with pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedStudents = mockStudents.slice(startIndex, endIndex);
  
  return NextResponse.json({
    success: true,
    data: {
      applicants: paginatedStudents,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(mockStudents.length / limit),
        totalItems: mockStudents.length,
        itemsPerPage: limit,
      },
    },
  });
}
