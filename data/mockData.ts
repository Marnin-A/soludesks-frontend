import { Course, Student, Lesson, DashboardStats, User } from '@/types';

// Mock User Data
export const mockUser: User = {
  id: '1',
  name: 'Madison Greg',
  email: 'madison.greg@example.com',
  isAuthenticated: true,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Madison',
};

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalCourses: 123,
  totalEnrollments: 11,
  avgCompletion: 99,
  completionTrend: 12,
};

// Mock Courses Data
export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Effective Workplace Communication',
    description: 'Master the art of professional communication in modern workplace environments.',
    category: 'Soft Skill',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    badge: 'Popular',
    totalApplicants: 1223,
    activeLearnersCount: 13,
    totalLessons: 32,
    completedLessons: 0,
  },
  {
    id: '2',
    title: 'Digital Marketing Fundamentals',
    description: 'Learn the essentials of digital marketing and grow your online presence.',
    category: 'Digital Skills',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    totalApplicants: 856,
    activeLearnersCount: 24,
    totalLessons: 28,
    completedLessons: 0,
  },
  {
    id: '3',
    title: 'Project Management Essentials',
    description: 'Develop essential project management skills for successful project delivery.',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
    badge: 'New',
    totalApplicants: 642,
    activeLearnersCount: 18,
    totalLessons: 24,
    completedLessons: 0,
  },
  {
    id: '4',
    title: 'Data Analysis with Excel',
    description: 'Master data analysis techniques using Microsoft Excel.',
    category: 'Technical',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    totalApplicants: 934,
    activeLearnersCount: 31,
    totalLessons: 20,
    completedLessons: 0,
  },
  {
    id: '5',
    title: 'Leadership and Team Building',
    description: 'Build strong leadership skills and create high-performing teams.',
    category: 'Soft Skill',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop',
    totalApplicants: 1105,
    activeLearnersCount: 27,
    totalLessons: 30,
    completedLessons: 0,
  },
  {
    id: '6',
    title: 'Web Development Basics',
    description: 'Start your journey in web development with HTML, CSS, and JavaScript.',
    category: 'Technical',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
    badge: 'Popular',
    totalApplicants: 1567,
    activeLearnersCount: 45,
    totalLessons: 36,
    completedLessons: 0,
  },
  {
    id: '7',
    title: 'Social Media Strategy',
    description: 'Create effective social media strategies for business growth.',
    category: 'Digital Skills',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop',
    totalApplicants: 723,
    activeLearnersCount: 19,
    totalLessons: 22,
    completedLessons: 0,
  },
  {
    id: '8',
    title: 'Time Management Mastery',
    description: 'Learn proven techniques to manage your time effectively.',
    category: 'Soft Skill',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop',
    totalApplicants: 891,
    activeLearnersCount: 22,
    totalLessons: 18,
    completedLessons: 0,
  },
  {
    id: '9',
    title: 'Financial Planning Basics',
    description: 'Understand the fundamentals of personal and business financial planning.',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
    totalApplicants: 567,
    activeLearnersCount: 15,
    totalLessons: 26,
    completedLessons: 0,
  },
  {
    id: '10',
    title: 'Graphic Design Fundamentals',
    description: 'Learn the principles of graphic design and visual communication.',
    category: 'Digital Skills',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
    badge: 'New',
    totalApplicants: 1034,
    activeLearnersCount: 28,
    totalLessons: 25,
    completedLessons: 0,
  },
];

// Mock Students Data
export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Olivia Mason',
    city: 'New York',
    email: 'olivia.mason@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia',
  },
  {
    id: '2',
    name: 'James Gonzalez',
    city: 'Toronto',
    email: 'james.gonzalez@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
  },
  {
    id: '3',
    name: 'Amelia Patel',
    city: 'Paris',
    email: 'amelia.p@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amelia',
  },
  {
    id: '4',
    name: 'Dinesh Kumar',
    city: 'Mumbai',
    email: 'dinesh.kumar@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dinesh',
  },
  {
    id: '5',
    name: 'Kamila Subramanian',
    city: 'London',
    email: 'kamila.subramanian@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kamila',
  },
  {
    id: '6',
    name: 'Amelia Paul',
    city: 'Paris',
    email: 'paul.amelia@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Paul',
  },
  {
    id: '7',
    name: 'Catherine Hernandez',
    city: 'Madrid',
    email: 'catherine.hernandez@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Catherine',
  },
  {
    id: '8',
    name: 'Liam Chen',
    city: 'Singapore',
    email: 'liam.chen@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Liam',
  },
];

// Mock Lessons Data
export const mockLessons: Lesson[] = [
  {
    id: '1',
    courseId: '1',
    title: 'Lesson 1 - Welcome Message',
    description: 'Introduction to the course and what you will learn',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '5:30',
    order: 1,
    isCompleted: false,
    content: `Welcome to Effective Workplace Communication! In this comprehensive course, you'll learn the essential skills needed to communicate effectively in professional settings.

Throughout this course, we'll cover:
• Verbal and non-verbal communication techniques
• Email etiquette and professional writing
• Presentation skills and public speaking
• Active listening and feedback
• Conflict resolution and difficult conversations
• Cross-cultural communication

By the end of this course, you'll be able to communicate with confidence, clarity, and professionalism in any workplace situation.`,
  },
  {
    id: '2',
    courseId: '1',
    title: 'Lesson 2 - Setting Up Your Workspace',
    description: 'Learn how to create an effective communication environment',
    duration: '8:15',
    order: 2,
    isCompleted: false,
    content: 'Content for lesson 2...',
  },
  {
    id: '3',
    courseId: '1',
    title: 'Lesson 3 - Understanding Communication Styles',
    description: 'Explore different communication styles and how to adapt',
    duration: '12:45',
    order: 3,
    isCompleted: false,
    content: 'Content for lesson 3...',
  },
  {
    id: '4',
    courseId: '1',
    title: 'Lesson 4 - Email Etiquette',
    description: 'Master professional email communication',
    duration: '10:20',
    order: 4,
    isCompleted: false,
    content: 'Content for lesson 4...',
  },
  {
    id: '5',
    courseId: '1',
    title: 'Lesson 5 - Presentation Basics',
    description: 'Learn the fundamentals of effective presentations',
    duration: '15:00',
    order: 5,
    isCompleted: false,
    content: 'Content for lesson 5...',
  },
];
