// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  isAuthenticated: boolean;
  avatar?: string;
}

// Course Types
export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'Soft Skill' | 'Digital Skills' | 'Technical' | 'Business';
  image: string;
  badge?: string;
  lessons: string[];
  totalApplicants: number;
  activeLearnersCount: number;
  totalLessons: number;
  completedLessons: number;
}

// Student/Applicant Types
export interface Student {
  id: string;
  name: string;
  city: string;
  email: string;
  avatar: string;
  enrolledDate?: string;
}

// Lesson Types
export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl?: string;
  duration?: string;
  order: number;
  isCompleted: boolean;
  content: string;
  section: string;
}

// Stats Types
export interface DashboardStats {
  totalCourses: number;
  totalEnrollments: number;
  avgCompletion: number;
  completionTrend: number; // percentage change
}

export interface CourseStats {
  totalApplicants: number;
  activeLearners: number;
}

// Filter Types
export interface CourseFilters {
  search: string;
  category: string;
  dateRange: string;
}

// Pagination Types
export interface PaginationData {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}
