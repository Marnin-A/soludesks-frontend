import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Course, Student, Lesson, DashboardStats, User, PaginationData, Review, ReviewStats } from '@/types';

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

    // Update lesson completion status
    updateLessonCompletion: builder.mutation<Lesson, { courseId: string; lessonId: string; isCompleted: boolean }>({
      query: ({ courseId, lessonId, isCompleted }) => ({
        url: `/courses/${courseId}/lessons/${lessonId}`,
        method: 'PATCH',
        body: { isCompleted },
      }),
      transformResponse: (response: { success: boolean; data: Lesson }) => response.data,
      invalidatesTags: (result, error, { courseId }) => [
        { type: 'Lessons', id: courseId },
        { type: 'Course', id: courseId },
      ],
    }),

    // Get course reviews
    getReviews: builder.query<
      { reviews: Review[]; stats: ReviewStats },
      { courseId: string; lessonId?: string }
    >({
      query: ({ courseId, lessonId }) => {
        const params = new URLSearchParams();
        if (lessonId) params.append('lessonId', lessonId);
        return `/courses/${courseId}/reviews?${params.toString()}`;
      },
      transformResponse: (response: { success: boolean; data: { reviews: Review[]; stats: ReviewStats } }) =>
        response.data,
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
  useUpdateLessonCompletionMutation,
  useGetReviewsQuery,
} = api;
