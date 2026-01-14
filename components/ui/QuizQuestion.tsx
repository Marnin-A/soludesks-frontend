'use client';

import { useState } from 'react';
import { QuizQuestion as QuizQuestionType } from '@/types';
import Image from 'next/image';

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
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white text-sm font-semibold bg-blue-primary-alpha`}
        >
          {questionNumber}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-main-text">{question.question}</h3>
          <div className="flex items-center gap-2 mt-1 text-sm text-main-text-2">
            <span className='border rounded-md px-2 py-0.5 text-xxs font-light text-base text-main-text'>{isMultipleChoice ? 'Multiple Choice' : 'Short answer'}</span>
      
            <span className="flex items-center gap-1 text-main-text-2 text-xxs">
              <Image src="/icons/ribbon.svg" alt="ribbon" width={12} height={12} />
              <span className='text-xxs font-light text-base text-main-text'>{question.points} points</span>
            </span>
          </div>
        </div>
      </div>

      {/* Answer Options */}
      {isMultipleChoice && question.options ? (
        <div className="space-y-2 ml-12">
          {question.options.map(option => (
            <label
              key={option.id}
              className={`flex items-center gap-3 p-2 rounded-lg border cursor-pointer transition-colors ${
                selectedAnswer === option.id
                  ? 'border-blue-primary-alpha bg-blue-50'
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
                className={`flex h-6 w-6 shrink-0 items-center justify-center text-xs font-medium ${
                  selectedAnswer === option.id
                    ? 'border-blue-primary-alpha bg-blue-primary-alpha rounded-full text-white'
                    : 'border-gray-300 text-main-text-2'
                }`}
              >
                {option.label}.
              </span>
              <span className="text-sm text-main-text-2 font-normal">{option.text}</span>
            </label>
          ))}
        </div>
      ) : (
        <div className="ml-12">
          <textarea
            placeholder="Enter answer here"
            value={selectedAnswer || ''}
            onChange={e => onAnswerChange(question.id, e.target.value)}
            className="w-full min-h-[100px] p-4 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-primary-alpha focus:border-transparent resize-none"
          />
        </div>
      )}
    </div>
  );
}
