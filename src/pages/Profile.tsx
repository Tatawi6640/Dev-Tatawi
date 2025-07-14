import React from 'react';
import { motion } from 'framer-motion';
import { User, Trophy, BookOpen, Brain, Star, Calendar } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { QuizResult, UserProfile } from '../types';
import { lessons } from '../data/lessons';
import { badges } from '../data/badges';

export const Profile: React.FC = () => {
  const [completedLessons] = useLocalStorage<string[]>('completedLessons', []);
  const [quizResults] = useLocalStorage<{ [key: string]: QuizResult[] }>('quizResults', {});
  const [userBadges] = useLocalStorage<string[]>('userBadges', []);

  const userName = 'Alae';
  const completedLessonsCount = completedLessons.length;
  const passedQuizzesCount = Object.values(quizResults).flat().filter(result => result.passed).length;
  const totalXP = completedLessonsCount * 100 + passedQuizzesCount * 200;
  const currentLevel = Math.floor(totalXP / 500) + 1;
  const xpToNextLevel = 500 - (totalXP % 500);

  const userProfile: UserProfile = {
    name: userName,
    xp: totalXP,
    level: currentLevel,
    completedLessons,
    passedQuizzes: quizResults,
    badges: userBadges
  };

  const earnedBadges = badges.filter(badge => badge.requirement(userProfile));

  const getCompletedLessonsDetails = () => {
    return lessons.filter(lesson => completedLessons.includes(lesson.id));
  };

  const getAverageScore = () => {
    const allResults = Object.values(quizResults).flat();
    if (allResults.length === 0) return 0;
    const totalScore = allResults.reduce((sum, result) => sum + result.score, 0);
    const totalQuestions = allResults.reduce((sum, result) => sum + result.totalQuestions, 0);
    return Math.round((totalScore / totalQuestions) * 100);
  };

  const completedLessonsDetails = getCompletedLessonsDetails();
  const averageScore = getAverageScore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Profile</h1>
          <p className="text-gray-600 text-lg">Track your learning progress</p>
        </motion.div>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome, {userName}!</h2>
              <p className="text-gray-600 mb-4">Keep up the great work on your learning journey</p>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-lg font-semibold text-gray-700">Level {currentLevel}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-purple-500" />
                  <span className="text-lg font-semibold text-gray-700">{totalXP} XP</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* XP Progress */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Progress to Level {currentLevel + 1}</span>
              <span className="text-sm text-gray-600">{xpToNextLevel} XP to go</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((500 - xpToNextLevel) / 500) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 h-3 rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Badges Section */}
        {earnedBadges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span>Earned Badges</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {earnedBadges.map((badge) => (
                <div key={badge.id} className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <span className="text-3xl">{badge.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-yellow-800">{badge.name}</div>
                    <div className="text-sm text-yellow-600">{badge.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
            <BookOpen className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800 mb-2">{completedLessonsCount}</div>
            <div className="text-gray-600">Lessons Completed</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
            <Brain className="w-8 h-8 text-teal-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800 mb-2">{passedQuizzesCount}</div>
            <div className="text-gray-600">Quizzes Passed</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
            <Trophy className="w-8 h-8 text-orange-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800 mb-2">{averageScore}%</div>
            <div className="text-gray-600">Average Score</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800 mb-2">{totalXP}</div>
            <div className="text-gray-600">Total XP</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Completed Lessons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-purple-500" />
              <span>Completed Lessons</span>
            </h3>
            
            {completedLessonsDetails.length > 0 ? (
              <div className="space-y-3">
                {completedLessonsDetails.map((lesson) => (
                  <div key={lesson.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <div className={`w-3 h-3 rounded-full ${
                      lesson.category === 'HTML' ? 'bg-orange-500' :
                      lesson.category === 'CSS' ? 'bg-blue-500' : 'bg-yellow-500'
                    }`} />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{lesson.title}</div>
                      <div className="text-sm text-gray-600">{lesson.category}</div>
                    </div>
                    <div className="text-green-500">
                      <Trophy className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No lessons completed yet. Start learning!</p>
            )}
          </motion.div>

          {/* Quiz Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <Brain className="w-5 h-5 text-teal-500" />
              <span>Quiz Results</span>
            </h3>
            
            {Object.values(quizResults).flat().length > 0 ? (
              <div className="space-y-3">
                {Object.entries(quizResults).map(([topic, results]) => 
                  results.slice(-2).reverse().map((result, index) => (
                  <div key={`${topic}-${index}`} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <div className={`w-3 h-3 rounded-full ${result.passed ? 'bg-green-500' : 'bg-red-500'}`} />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">
                        {topic.toUpperCase()}: {result.score}/{result.totalQuestions} ({Math.round((result.score / result.totalQuestions) * 100)}%)
                      </div>
                      <div className="text-sm text-gray-600 flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(result.completedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className={result.passed ? 'text-green-500' : 'text-red-500'}>
                      {result.passed ? <Trophy className="w-4 h-4" /> : <span className="text-sm">Try again</span>}
                    </div>
                  </div>
                  ))
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No quiz attempts yet. Take your first quiz!</p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};