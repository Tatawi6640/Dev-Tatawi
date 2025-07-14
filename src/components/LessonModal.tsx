import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { Lesson } from '../types';
import { Button } from './Button';

interface LessonModalProps {
  lesson: Lesson | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (lessonId: string) => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({ lesson, isOpen, onClose, onComplete }) => {
  if (!lesson) return null;

  const handleComplete = () => {
    onComplete(lesson.id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">{lesson.title}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-6">{lesson.explanation}</p>
              
              {lesson.codeExample && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Code Example:</h3>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto">
                    <pre className="text-sm">
                      <code>{lesson.codeExample}</code>
                    </pre>
                  </div>
                </div>
              )}
              
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl mb-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">Key Points:</h3>
                <ul className="text-purple-700 space-y-1">
                  <li>• {lesson.category} is essential for web development</li>
                  <li>• Practice regularly to improve your skills</li>
                  <li>• Apply what you learn in real projects</li>
                </ul>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button onClick={handleComplete} className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Mark as Complete</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};