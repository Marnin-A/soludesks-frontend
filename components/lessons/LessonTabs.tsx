'use client';

interface LessonTabsProps {
  activeTab: 'content' | 'reviews';
  onTabChange: (tab: 'content' | 'reviews') => void;
}

export function LessonTabs({ activeTab, onTabChange }: LessonTabsProps) {
  return (
    <div className="mb-6 border-b border-gray-200">
      <div className="flex flex-wrap gap-4 sm:gap-8">
        <button
          onClick={() => onTabChange('content')}
          className={`pb-3 text-sm font-semibold transition-colors ${
            activeTab === 'content'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Course Content
        </button>
        <button
          onClick={() => onTabChange('reviews')}
          className={`pb-3 text-sm font-semibold transition-colors ${
            activeTab === 'reviews'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Review/Feedbacks
        </button>
      </div>
    </div>
  );
}
