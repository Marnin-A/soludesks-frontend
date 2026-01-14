# Soludesks - Learning Management System

A modern, responsive Learning Management System (LMS) built with Next.js, featuring course management, assessments, and user progress tracking.

## 🚀 Live Demo

[View Live Application](https://soludesks-frontend-five.vercel.app/)

## 🛠️ Tech Stack

### Core Framework
- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type-safe JavaScript

### State Management
- **Redux Toolkit 2.11.2** - State management
- **RTK Query** - Data fetching and caching

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible UI primitives
- **React Icons 5.5.0** - Icon library
- **Lucide React** - Additional icons
- **Tailwind Typography** - Typography utilities

### Development Tools
- **ESLint 9** - Code linting
- **TypeScript** - Type checking
- **PostCSS** - CSS processing

## 📁 Project Structure

```
soludesks-frontend/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   └── courses/              # Course-related API endpoints
│   ├── assessments/              # Assessments page
│   ├── classes/                  # Classes page
│   ├── courses/                  # Courses pages with dynamic routing
│   │   └── [id]/                 # Course detail page
│   │       └── lessons/          # Lesson pages
│   │           └── [lessonId]/   # Individual lesson page
│   ├── globals.css               # Global styles and Tailwind config
│   ├── layout.tsx                # Root layout with Redux provider
│   └── page.tsx                  # Home page
├── components/                   # Reusable UI components
│   ├── layout/                   # Layout components (Header, Sidebar)
│   └── ui/                       # UI components (Button, Card, etc.)
├── data/                         # Mock data and constants
├── lib/                          # Utility functions
├── public/                       # Static assets (images, icons)
├── store/                        # Redux store configuration
│   ├── services/                 # RTK Query API services
│   └── slices/                   # Redux slices (user state)
├── types/                        # TypeScript type definitions
└── package.json                  # Dependencies and scripts
```

## 🏁 Getting Started

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm**, **yarn**, **pnpm**, or **bun** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Marnin-A/soludesks-frontend.git
   cd soludesks-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install (recommended, that's what I use)
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev (recommended)
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Features

### Core Functionality
- **Course Management**: Browse and enroll in courses
- **Lesson Progress Tracking**: Mark lessons as completed
- **Interactive Quizzes**: Take assessments with multiple choice and short answer questions
- **User Dashboard**: View enrolled courses and progress
- **Student Management**: Track applicants and active learners

### UI/UX Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Semantic HTML and proper ARIA labels
- **Dark/Light Theme Support**: Built-in theme switching capability
- **Loading States**: Smooth loading indicators

### Technical Features
- **Type Safety**: Full TypeScript implementation
- **State Management**: Redux Toolkit with RTK Query
- **API Integration**: RESTful API endpoints with mock data
- **Component Architecture**: Reusable and composable components
- **Performance**: Optimized with Next.js features (I used mostly client components to avoid complexity)
---
