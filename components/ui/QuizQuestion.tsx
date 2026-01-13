'use client';

import { useState } from 'react';
import { QuizQuestion as QuizQuestionType } from '@/types';

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionNumber: number;
  onAnswerChange: (questionId: string, answer: string) => void;
  selectedAnswer?: string;
}

export function QuizQuestion({
  question,
  questionNumber,
  onAnswerChange,
  selectedAnswer,
}: QuizQuestionProps) {
  const isMultipleChoice = question.type === 'multiple_choice';

  return (
    <div className="border border-gray-200 rounded-xl p-6 mb-4">
      {/* Question Header */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white text-sm font-semibold ${
            isMultipleChoice ? 'bg-[var(--blue-primary-alpha)]' : 'bg-green-500'
          }`}
        >
          {questionNumber}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{question.question}</h3>
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
            <span>{isMultipleChoice ? 'Multiple Choice' : 'Short answer'}</span>
            <span>|</span>
            <span className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z" fill="#9CA3AF" />
              </svg>
              {question.points} points
            </span>
          </div>
        </div>
      </div>

      {/* Answer Options */}
      {isMultipleChoice && question.options ? (
        <div className="space-y-3 ml-12">
          {question.options.map(option => (
            <label
              key={option.id}
              className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                selectedAnswer === option.id
                  ? 'border-[var(--blue-primary-alpha)] bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option.id}
                checked={selectedAnswer === option.id}
                onChange={() => onAnswerChange(question.id, option.id)}
                className="sr-only"
              />
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-medium ${
                  selectedAnswer === option.id
                    ? 'border-[var(--blue-primary-alpha)] bg-[var(--blue-primary-alpha)] text-white'
                    : 'border-gray-300 text-gray-500'
                }`}
              >
                {option.label}
              </span>
              <span className="text-sm text-gray-700">{option.text}</span>
            </label>
          ))}
        </div>
      ) : (
        <div className="ml-12">
          <textarea
            placeholder="Enter answer here"
            value={selectedAnswer || ''}
            onChange={e => onAnswerChange(question.id, e.target.value)}
            className="w-full min-h-[100px] p-4 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--blue-primary-alpha)] focus:border-transparent resize-none"
          />
        </div>
      )}
    </div>
  );
}
