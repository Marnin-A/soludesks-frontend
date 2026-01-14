'use client';

import { useState } from 'react';
import { Quiz } from '@/types';
import { QuizQuestion } from './QuizQuestion';
import { Button } from './Button';

interface QuizViewProps {
  quiz: Quiz;
  onSubmit?: (answers: Record<string, string>) => void;
}

export function QuizView({ quiz, onSubmit }: QuizViewProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(answers);
    } else {
      // Default behavior: log answers
      console.log('Quiz submitted:', answers);
      alert('Quiz submitted successfully!');
    }
  };

  const answeredCount = Object.keys(answers).filter(key => answers[key]?.trim()).length;
  const totalQuestions = quiz.questions.length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Quiz Header */}
      <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-200">
        <h2 className="text-base sm:text-lg font-medium text-main-text">{quiz.title}</h2>
      </div>

      {/* Questions */}
      <div className="px-4 py-4 sm:px-6 sm:py-5">
        {quiz.questions.map((question, index) => (
          <QuizQuestion
            key={question.id}
            question={question}
            questionNumber={index + 1}
            onAnswerChange={handleAnswerChange}
            selectedAnswer={answers[question.id]}
          />
        ))}
      </div>

      {/* Submit Button */}
      <div className="px-4 py-4 sm:px-6 sm:py-5 border-t border-gray-200 flex justify-end">
        <Button
          onClick={handleSubmit}
          className="px-10 sm:px-16 py-2.5 sm:py-3 border-blue-primary text-blue-primary font-light"
          variant="outline"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
