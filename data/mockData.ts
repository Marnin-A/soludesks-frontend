import { Course, Student, Lesson, DashboardStats, User, LessonReview } from '@/types';

// Mock User Data
export const mockUser: User = {
  id: '1',
  name: 'Madison Greg',
  email: 'Madison.reertr@gmail.com',
  isAuthenticated: true,
  avatar: '/Avatar.png',
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
    lessons: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
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
    lessons: [],
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
    lessons: [],
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
    lessons: [],
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
    lessons: [],
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
    lessons: [],
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
    lessons: [],
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
    lessons: [],
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
    lessons: [],
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
    lessons: [],
  },
];

// Mock Students Data
export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Nithya Menon',
    city: 'New York',
    email: 'nithya.menon@email.com',
    avatar: '/people/Nithya-Menon.png',
  },
  {
    id: '2',
    name: 'Meera Gonzalez',
    city: 'Toronto',
    email: 'meera.gonzalez@email.com',
    avatar: '/people/Meera-Gonzalez.png',
  },
  {
    id: '3',
    name: 'Monica Patel',
    city: 'Paris',
    email: 'monica.patel@email.com',
    avatar: '/people/Monica-Patel.png',
  },
  {
    id: '4',
    name: 'Dinesh Kumar',
    city: 'Tokyo',
    email: 'dinesh.kumar@email.com',
    avatar: '/people/Dinesh-Kumar.png',
  },
  {
    id: '5',
    name: 'Karthik Subramanian',
    city: 'London',
    email: 'karthik.subramanian@email.com',
    avatar: '',
  },
  {
    id: '6',
    name: 'Monica Patel',
    city: 'Paris',
    email: 'jagathesh.narayanan@email.com',
    avatar: '/people/Dinesh-Kumar.png',
  },
  {
    id: '7',
    name: 'Jagathesh Narayanan',
    city: 'Berlin',
    email: 'jagathesh.narayanan@email.com',
    avatar: '/people/Jagathesh-Narayanan.png',
  },
  {
    id: '8',
    name: 'Monica Patel',
    city: 'Paris',
    email: 'monica.patel@email.com',
    avatar: '/people/Monica-Patel.png',
  },
  {
    id: '9',
    name: 'Nithya Menon',
    city: 'New York',
    email: 'nithya.menon@email.com',
    avatar: '/people/Nithya-Menon-2.png',
  },
  {
    id: '10',
    name: 'Jagathesh Narayanan',
    city: 'Tokyo',
    email: 'dinesh.kumar@email.com',
    avatar: '/people/Jagathesh-Narayanan-2.png',
  },
];

// Mock Lessons Data
export const mockLessons: Lesson[] = [
  // Introduction Section
  {
    id: '1',
    courseId: '1',
    title: 'Welcome Message',
    description: 'Introduction to the course and what you will learn',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '5:30',
    order: 1,
    isCompleted: false,
    section: 'Introduction',
    content: `<p class="mb-4">Welcome to 'Communicate with Confidence'! In an era where the pace of work is ever-increasing and the demands on our time are relentless, the ability to communicate effectively has never been more crucial. This comprehensive course is meticulously crafted to equip you with the essential skills that will not only enhance your communication abilities but also empower you to thrive in any professional environment you find yourself in.</p>

<h3 class="font-bold mt-6 mb-3">Why Communication Matters</h3>

<p class="mb-4">Effective communication is the cornerstone of success in the workplace. It is the bridge that connects individuals, teams, and organizations, facilitating collaboration and understanding. In today's diverse and dynamic work settings, the ability to convey your thoughts clearly and listen actively is paramount. This course aims to illuminate the significance of communication and provide you with the tools necessary to master it.</p>

<h3 class="font-bold mt-6 mb-3">What You'll Learn</h3>

<p class="mb-4">Throughout this course, you will delve into various aspects of communication, each designed to build upon the last, creating a robust foundation for your skills:</p>

<ul class="list-decimal list-inside space-y-2 mb-6 ml-4">
  <li><strong>Clear Articulation:</strong> You will learn techniques to express your ideas with clarity and precision, ensuring that your message is understood as intended. This includes understanding your audience and tailoring your message accordingly.</li>
  <li><strong>Active Listening:</strong> Developing the ability to listen actively is crucial. You will practice techniques that enhance your listening skills, enabling you to fully engage with others and respond thoughtfully.</li>
  <li><strong>Confident Conversations:</strong> Navigating challenging discussions can be daunting. This course will provide you with strategies to approach these conversations with poise and assurance, transforming potential conflicts into constructive dialogues.</li>
  <li><strong>Non-Verbal Communication:</strong> Communication is not just about words. You will explore the nuances of non-verbal cues, such as body language and facial expressions, and learn how to utilize them to reinforce your message.</li>
  <li><strong>Persuasive Language:</strong> Crafting compelling arguments is an art. You will learn how to influence others positively through the use of persuasive language, enabling you to advocate for your ideas effectively.</li>
</ul>

<h3 class="font-bold mt-6 mb-3">Building a Collaborative Environment</h3>

<p class="mb-4">Mastering these skills will not only enhance your personal communication but will also contribute to building stronger interpersonal relationships within your team. A collaborative work environment is vital for team success, and effective communication is the key to fostering this atmosphere. You will learn how to create an inclusive environment where ideas can flourish, and everyone feels valued.</p>

<h3 class="font-bold mt-6 mb-3">Course Outcomes</h3>

<p class="mb-4">By the end of this transformative course, you will be equipped to:</p>

<ul class="list-none list-inside space-y-2 mb-6 ml-4">
  <li>- Communicate effectively in any situation, whether in meetings, presentations, or casual conversations.</li>
  <li>- Navigate complex challenges with confidence, turning potential obstacles into opportunities for growth.</li>
  <li>- Contribute significantly to your organization's success through improved communication practices, fostering a culture of openness and collaboration.</li>
</ul>

<p>Join us on this journey to transform your communication skills and unlock new heights in your career! Together, we will explore the depths of effective communication, ensuring that you emerge not just as a better communicator, but as a more confident and capable professional.</p>`,
  },
  {
    id: '2',
    courseId: '1',
    title: 'A Note on Style',
    description: 'Understanding the style of communication taught in this course',
    duration: '3:15',
    order: 2,
    isCompleted: false,
    section: 'Introduction',
    content: 'Content about style...',
  },
  {
    id: '3',
    courseId: '1',
    title: "What You'll Learn",
    description: 'Overview of the course curriculum',
    duration: '4:20',
    order: 3,
    isCompleted: false,
    section: 'Introduction',
    content: 'Content about what you will learn...',
  },
  {
    id: '4',
    courseId: '1',
    title: 'Meet Your Instructor',
    description: 'Get to know your course instructor',
    duration: '2:45',
    order: 4,
    isCompleted: false,
    section: 'Introduction',
    content: 'Content about the instructor...',
  },

  // Setting Up Your Workspace Section
  {
    id: '5',
    courseId: '1',
    title: 'Ergonomic Basics',
    description: 'Setting up your desk for comfort',
    duration: '8:00',
    order: 5,
    isCompleted: false,
    section: 'Setting Up Your Workspace',
    content: 'Content about ergonomics...',
  },
  {
    id: '6',
    courseId: '1',
    title: 'Lighting and Sound',
    description: 'Optimizing your environment for video calls',
    duration: '6:30',
    order: 6,
    isCompleted: false,
    section: 'Setting Up Your Workspace',
    content: 'Content about lighting and sound...',
  },

  // Navigating the Course Section
  {
    id: '7',
    courseId: '1',
    title: 'Using the Dashboard',
    description: 'How to navigate the learning platform',
    duration: '4:15',
    order: 7,
    isCompleted: false,
    section: 'Navigating the Course',
    content: 'Content about dashboard...',
  },

  // Course Resources Section
  {
    id: '8',
    courseId: '1',
    title: 'Downloadable Materials',
    description: 'Accessing course PDFs and worksheets',
    duration: '2:00',
    order: 8,
    isCompleted: false,
    section: 'Course Resources',
    content: 'Content about resources...',
  },

  // Getting Started Section
  {
    id: '9',
    courseId: '1',
    title: 'Pre-course Assessment',
    description: 'Check your current knowledge',
    duration: '10:00',
    order: 9,
    isCompleted: false,
    section: 'Getting Started',
    content: 'Content for pre-course assessment...',
  },
];

// Mock Lesson Reviews
export const mockLessonReviews: LessonReview[] = [
  {
    id: 'r1',
    courseId: '1',
    lessonId: '1',
    name: 'Nithya Menon',
    role: 'Product Manager',
    city: 'New York',
    avatar: '/people/Nithya-Menon.png',
    rating: 4.9,
    comment:
      'Loved how actionable the exercises were. The pacing felt natural and the examples mirrored real situations I face with my team.',
    tags: ['Actionable tips', 'Great pacing', 'Real scenarios'],
    submittedAt: '2024-11-12',
    highlight: 'Completed Module 3',
    attachments: ['meeting-script.pdf'],
  },
  {
    id: 'r2',
    courseId: '1',
    lessonId: '1',
    name: 'Meera Gonzalez',
    role: 'Operations Lead',
    city: 'Toronto',
    avatar: '/people/Meera-Gonzalez.png',
    rating: 4.8,
    comment:
      'Instructor explanations are clear and concise. The downloadable worksheets helped me coach my direct reports better.',
    tags: ['Clear explanation', 'Helpful resources'],
    submittedAt: '2024-11-04',
    highlight: 'Worksheet applied to weekly sync',
    attachments: ['coaching-worksheet.pdf'],
  },
  {
    id: 'r3',
    courseId: '1',
    lessonId: '1',
    name: 'Jagathesh Narayanan',
    role: 'Team Lead',
    city: 'Berlin',
    avatar: '/people/Jagathesh-Narayanan.png',
    rating: 4.7,
    comment:
      'Strong focus on structure and tone. The role-play clips were especially useful and I replayed them a couple of times.',
    tags: ['Role-play', 'Tone & structure'],
    submittedAt: '2024-10-28',
    highlight: 'Rewatched role-play clips',
  },
  {
    id: 'r4',
    courseId: '1',
    lessonId: '1',
    name: 'Monica Patel',
    role: 'Customer Success',
    city: 'Paris',
    avatar: '/people/Monica-Patel.png',
    rating: 4.6,
    comment:
      'Course layout is intuitive. Would love a few more examples for dealing with tough stakeholders but overall excellent.',
    tags: ['Layout', 'Stakeholder comms'],
    submittedAt: '2024-10-16',
    highlight: 'Used in QBR prep',
  },
  {
    id: 'r5',
    courseId: '1',
    lessonId: '1',
    name: 'Dinesh Kumar',
    role: 'Engineering Manager',
    city: 'Tokyo',
    avatar: '/people/Dinesh-Kumar.png',
    rating: 4.8,
    comment:
      'Short chapters keep attention high. I shared the feedback checklist with my team and saw immediate improvement.',
    tags: ['Short chapters', 'Feedback checklist'],
    submittedAt: '2024-09-29',
    highlight: 'Shared checklist with squad',
  },
  {
    id: 'r6',
    courseId: '1',
    lessonId: '1',
    name: 'Madison Greg',
    role: 'People Partner',
    city: 'London',
    avatar: '/Avatar.png',
    rating: 4.9,
    comment:
      'Exactly matches the communication tone we use internally. The templates are polished and easy to adapt for onboarding.',
    tags: ['Templates', 'Great tone match'],
    submittedAt: '2024-09-10',
    highlight: 'Onboarding template adopted',
  },
];
