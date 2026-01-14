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
  category: 'Soft Skill' | 'Digital Skills' | 'Onboarding' | 'Business & Strategy' | 'Compliance & Policy' ;
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
export type LessonType = 'content' | 'quiz';

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
  type?: LessonType;
  quizId?: string;
}

// Quiz Types
export type QuestionType = 'multiple_choice' | 'short_answer';

export interface QuizOption {
  id: string;
  label: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  points: number;
  options?: QuizOption[];
  correctAnswer?: string;
}

export interface Quiz {
  id: string;
  lessonId: string;
  courseId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  totalPoints: number;
  passingScore: number;
  timeLimit?: number;
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

// Review Types
export interface Review {
  id: string;
  lessonId: string;
  courseId: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}
