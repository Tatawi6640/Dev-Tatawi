import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Lock, Trophy } from 'lucide-react';
import { lessons } from '../data/lessons';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { QuizResult, UserProfile, QuizSubmission } from '../types';
import { badges } from '../data/badges';

export const ProgressSidebar: React.FC = () => {
  const [completedLessons] = useLocalStorage<string[]>('completedLessons', []);
  const [quizResults] = useLocalStorage<{ [key: string]: QuizResult[] }>('quizResults', {});
  const [quizSubmissions] = useLocalStorage<QuizSubmission[]>('quizSubmissions', []);
  const [userBadges] = useLocalStorage<string[]>('userBadges', []);

  const passedQuizzesCount = Object.values(quizResults).flat().filter(result => result.passed && result.status === 'reviewed').length;
  const xp = completedLessons.length * 100 + passedQuizzesCount * 200;

  const userProfile: UserProfile = {
    name: 'Alae',
    xp,
    level: Math.floor(xp / 500) + 1,
    completedLessons,
    passedQuizzes: quizResults,
    badges: userBadges
  };

  const earnedBadges = badges.filter(badge => badge.requirement(userProfile));

  const getQuizStatus = (topic: string) => {
    const results = quizResults[topic] || [];
    const submissions = quizSubmissions.filter(s => s.topic === topic);
    const pendingSubmissions = submissions.filter(s => s.status === 'pending');
    
    if (pendingSubmissions.length > 0) return 'pending';
    if (results.length === 0) return 'not-started';
    return results.some(r => r.passed && r.status === 'reviewed') ? 'completed' : 'failed';
  };

  const canAccessFinalProject = () => {
    const allLessonsCompleted = lessons.every(lesson => completedLessons.includes(lesson.id));
    const allQuizzesPassed = ['html', 'css', 'javascript'].every(topic => 
      getQuizStatus(topic) === 'completed'
    );
    return allLessonsCompleted && allQuizzesPassed;
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-white shadow-lg border-r border-gray-100 overflow-y-auto z-40"
    >
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Learning Progress</h2>
        
        {/* XP and Level */}
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-purple-700">Level {userProfile.level}</span>
            <span className="text-sm text-purple-600">{userProfile.xp} XP</span>
          </div>
          <div className="w-full bg-purple-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(userProfile.xp % 500) / 5}%` }}
            />
          </div>
        </div>

        {/* Lessons Progress */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Lessons</h3>
          <div className="space-y-2">
            {lessons.map((lesson) => {
              const isCompleted = completedLessons.includes(lesson.id);
              return (
                <div key={lesson.id} className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50">
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-gray-400" />
                  )}
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${isCompleted ? 'text-green-700' : 'text-gray-600'}`}>
                      {lesson.title}
                    </div>
                    <div className="text-xs text-gray-500">{lesson.category}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quizzes Progress */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Quizzes</h3>
          <div className="space-y-2">
            {['HTML', 'CSS', 'JavaScript'].map((topic) => {
              const status = getQuizStatus(topic.toLowerCase());
              const icon = status === 'completed' ? CheckCircle :
                          status === 'pending' ? Clock :
                          status === 'failed' ? Clock : Clock;
              const color = status === 'completed' ? 'text-green-500' :
                           status === 'pending' ? 'text-blue-500' :
                           status === 'failed' ? 'text-orange-500' : 'text-gray-400';
              
              return (
                <div key={topic} className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50">
                  {React.createElement(icon, { className: `w-5 h-5 ${color}` })}
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${
                      status === 'completed' ? 'text-green-700' :
                      status === 'pending' ? 'text-blue-700' : 'text-gray-600'
                    }`}>
                      {topic} Quiz
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {status === 'pending' ? 'Under Review' : status.replace('-', ' ')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Final Project */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Final Project</h3>
          <div className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50">
            {canAccessFinalProject() ? (
              <CheckCircle className="w-5 h-5 text-purple-500" />
            ) : (
              <Lock className="w-5 h-5 text-gray-400" />
            )}
            <div className="flex-1">
              <div className={`text-sm font-medium ${canAccessFinalProject() ? 'text-purple-700' : 'text-gray-600'}`}>
                Portfolio Project
              </div>
              <div className="text-xs text-gray-500">
                {canAccessFinalProject() ? 'Available' : 'Complete all lessons & quizzes'}
              </div>
            </div>
          </div>
        </div>

        {/* Badges */}
        {earnedBadges.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Badges</h3>
            <div className="space-y-2">
              {earnedBadges.map((badge) => (
                <div key={badge.id} className="flex items-center space-x-3 p-2 bg-yellow-50 rounded-xl">
                  <span className="text-2xl">{badge.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-yellow-800">{badge.name}</div>
                    <div className="text-xs text-yellow-600">{badge.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};