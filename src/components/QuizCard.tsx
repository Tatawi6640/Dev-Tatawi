import React from 'react';
import { motion } from 'framer-motion';
import { QuizQuestion } from '../types';

interface QuizCardProps {
  question: QuizQuestion;
  selectedAnswer: number | null;
  onAnswerSelect: (answerIndex: number) => void;
  showResult?: boolean;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  showResult = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 max-w-2xl mx-auto"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h3>
      
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctAnswer;
          
          let buttonClass = 'w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ';
          
          if (showResult) {
            if (isCorrect) {
              buttonClass += 'bg-green-50 border-green-500 text-green-800';
            } else if (isSelected && !isCorrect) {
              buttonClass += 'bg-red-50 border-red-500 text-red-800';
            } else {
              buttonClass += 'bg-gray-50 border-gray-200 text-gray-600';
            }
          } else {
            if (isSelected) {
              buttonClass += 'bg-purple-50 border-purple-500 text-purple-800';
            } else {
              buttonClass += 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100';
            }
          }
          
          return (
            <motion.button
              key={index}
              whileHover={{ scale: showResult ? 1 : 1.01 }}
              whileTap={{ scale: showResult ? 1 : 0.99 }}
              className={buttonClass}
              onClick={() => !showResult && onAnswerSelect(index)}
              disabled={showResult}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isSelected ? 'border-current' : 'border-gray-300'
                }`}>
                  {isSelected && <div className="w-3 h-3 rounded-full bg-current" />}
                </div>
                <span className="font-medium">{option}</span>
              </div>
            </motion.button>
          );
        })}
      </div>
      
      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200"
        >
          <p className="text-blue-800 font-medium">Explanation:</p>
          <p className="text-blue-700 mt-1">{question.explanation}</p>
        </motion.div>
      )}
    </motion.div>
  );
};