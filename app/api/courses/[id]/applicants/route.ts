import { NextResponse } from 'next/server';
import { mockStudents } from '@/data/mockData';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const { id } = await params;

  // In a real app, we'd filter students by courseId
  // For now, return all mock students
  return NextResponse.json({
    success: true,
    data: mockStudents,
  });
}
