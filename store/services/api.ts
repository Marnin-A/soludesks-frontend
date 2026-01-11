import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Course, Student, Lesson, DashboardStats, User, PaginationData } from '@/types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Courses', 'Course', 'Stats', 'User', 'Applicants', 'Lessons'],
  endpoints: builder => ({
    // Get dashboard stats
    getStats: builder.query<DashboardStats, void>({
      query: () => '/stats',
      transformResponse: (response: { success: boolean; data: DashboardStats }) => response.data,
      providesTags: ['Stats'],
    }),

    // Get courses with filters and pagination
    getCourses: builder.query<
      { courses: Course[]; pagination: PaginationData },
      { page?: number; limit?: number; category?: string; search?: string }
    >({
      query: ({ page = 1, limit = 9, category = '', search = '' }) => {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        if (category) params.append('category', category);
        if (search) params.append('search', search);
        return `/courses?${params.toString()}`;
      },
      transformResponse: (response: { success: boolean; data: { courses: Course[]; pagination: PaginationData } }) =>
        response.data,
      providesTags: ['Courses'],
    }),

    // Get single course by ID
    getCourseById: builder.query<Course, string>({
      query: id => `/courses/${id}`,
      transformResponse: (response: { success: boolean; data: Course }) => response.data,
      providesTags: (result, error, id) => [{ type: 'Course', id }],
    }),

    // Get course applicants
    getApplicants: builder.query<Student[], string>({
      query: courseId => `/courses/${courseId}/applicants`,
      transformResponse: (response: { success: boolean; data: Student[] }) => response.data,
      providesTags: (result, error, courseId) => [{ type: 'Applicants', id: courseId }],
    }),

    // Get course lessons
    getLessons: builder.query<Lesson[], string>({
      query: courseId => `/courses/${courseId}/lessons`,
      transformResponse: (response: { success: boolean; data: Lesson[] }) => response.data,
      providesTags: (result, error, courseId) => [{ type: 'Lessons', id: courseId }],
    }),

    // Get user profile
    getUser: builder.query<User, void>({
      query: () => '/user',
      transformResponse: (response: { success: boolean; data: User }) => response.data,
      providesTags: ['User'],
    }),
  }),
});

export const {
  useGetStatsQuery,
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useGetApplicantsQuery,
  useGetLessonsQuery,
  useGetUserQuery,
} = api;
