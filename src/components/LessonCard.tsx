import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Code } from 'lucide-react';
import { Lesson } from '../types';
import { Button } from './Button';

interface LessonCardProps {
  lesson: Lesson;
  onStart: (lesson: Lesson) => void;
  isCompleted?: boolean;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, onStart, isCompleted = false }) => {
  const categoryColors = {
    HTML: 'from-orange-500 to-red-500',
    CSS: 'from-blue-500 to-indigo-500',
    JavaScript: 'from-yellow-500 to-orange-500',
  };

  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`bg-gradient-to-r ${categoryColors[lesson.category]} text-white px-3 py-1 rounded-full text-sm font-medium`}>
          {lesson.category}
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[lesson.difficulty]}`}>
            {lesson.difficulty}
          </span>
          {isCompleted && <CheckCircle className="w-5 h-5 text-green-500" />}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-2">{lesson.title}</h3>
      <p className="text-gray-600 mb-4">{lesson.summary}</p>
      
      <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>10-15 min</span>
        </div>
        <div className="flex items-center space-x-1">
          <Code className="w-4 h-4" />
          <span>Interactive</span>
        </div>
      </div>
      
      <Button onClick={() => onStart(lesson)} className="w-full">
        {isCompleted ? 'Review Lesson' : 'Start Lesson'}
      </Button>
    </motion.div>
  );
};