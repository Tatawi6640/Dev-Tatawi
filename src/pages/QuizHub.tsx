import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Trophy, Clock, CheckCircle, Send, Eye } from 'lucide-react';
import { Button } from '../components/Button';
import { TopicQuiz } from '../components/TopicQuiz';
import { htmlQuizQuestions } from '../data/htmlQuiz';
import { cssQuizQuestions } from '../data/cssQuiz';
import { jsQuizQuestions } from '../data/jsQuiz';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { QuizResult, QuizSubmission } from '../types';

export const QuizHub: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [quizResults] = useLocalStorage<{ [key: string]: QuizResult[] }>('quizResults', {});
  const [quizSubmissions] = useLocalStorage<QuizSubmission[]>('quizSubmissions', []);

  const quizTopics = [
    {
      id: 'html',
      name: 'HTML',
      description: 'Test your HTML knowledge with 15 questions',
      questions: htmlQuizQuestions,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-800'
    },
    {
      id: 'css',
      name: 'CSS',
      description: 'Test your CSS knowledge with 15 questions',
      questions: cssQuizQuestions,
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-800'
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      description: 'Test your JavaScript knowledge with 15 questions',
      questions: jsQuizQuestions,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-800'
    }
  ];

  const getQuizStatus = (topicId: string) => {
    const results = quizResults[topicId];
    const submissions = quizSubmissions.filter(s => s.topic === topicId);
    const pendingSubmissions = submissions.filter(s => s.status === 'pending');
    
    if (!results || results.length === 0) {
      if (pendingSubmissions.length > 0) {
        return { status: 'pending-review', score: 0, attempts: submissions.length };
      }
      return { status: 'not-started', score: 0, attempts: 0 };
    }
    
    const bestScore = Math.max(...results.map(r => r.score));
    const reviewedResults = results.filter(r => r.status === 'reviewed');
    const passed = reviewedResults.some(r => r.passed);
    
    if (pendingSubmissions.length > 0) {
      return { status: 'pending-review', score: bestScore, attempts: submissions.length };
    }
    
    return {
      status: passed ? 'passed' : 'attempted',
      score: bestScore,
      attempts: submissions.length
    };
  };

  if (selectedTopic) {
    const topic = quizTopics.find(t => t.id === selectedTopic);
    if (topic) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-8">
          <TopicQuiz
            topic={topic.name}
            questions={topic.questions}
            onBack={() => setSelectedTopic(null)}
          />
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Knowledge Quizzes</h1>
          <p className="text-gray-600 text-lg">
            Test your understanding with topic-specific quizzes
          </p>
        </motion.div>

        {/* Quiz Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Quiz Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {Object.values(quizResults).flat().filter(r => r.passed).length}
              </div>
              <div className="text-gray-600">Quizzes Passed</div>
            </div>
            <div className="text-center p-4 bg-teal-50 rounded-xl">
              <div className="text-2xl font-bold text-teal-600 mb-2">
                {Object.values(quizResults).flat().length}
              </div>
              <div className="text-gray-600">Total Attempts</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <div className="text-2xl font-bold text-orange-600 mb-2">
                {Object.keys(quizResults).length}
              </div>
              <div className="text-gray-600">Topics Attempted</div>
            </div>
          </div>
        </motion.div>

        {/* Quiz Topics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizTopics.map((topic, index) => {
            const quizStatus = getQuizStatus(topic.id);
            
            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-gradient-to-r ${topic.color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                    {topic.name}
                  </div>
                  <div className="flex items-center space-x-2">
                    {quizStatus.status === 'passed' && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    {quizStatus.status === 'pending-review' && (
                      <Clock className="w-5 h-5 text-blue-500" />
                    )}
                    {quizStatus.status === 'attempted' && (
                      <Clock className="w-5 h-5 text-orange-500" />
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">{topic.name} Quiz</h3>
                <p className="text-gray-600 mb-4">{topic.description}</p>
                
                {(quizStatus.status !== 'not-started') && (
                  <div className={`mb-4 p-3 ${topic.bgColor} rounded-xl`}>
                    <div className={`text-sm font-medium ${topic.textColor} mb-1`}>
                      {quizStatus.status === 'pending-review' ? (
                        'Awaiting Review by Tatawi'
                      ) : (
                        `Best Score: ${quizStatus.score}/15 (${Math.round((quizStatus.score / 15) * 100)}%)`
                      )}
                    </div>
                    <div className="text-xs text-gray-600">
                      Attempts: {quizStatus.attempts}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Brain className="w-4 h-4" />
                    <span>15 Questions</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Trophy className="w-4 h-4" />
                    <span>70% to Pass</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => setSelectedTopic(topic.id)} 
                  className="w-full"
                  variant={quizStatus.status === 'passed' ? 'secondary' : 'primary'}
                  disabled={quizStatus.status === 'pending-review'}
                >
                  {quizStatus.status === 'not-started' ? (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Start Quiz
                    </>
                  ) : quizStatus.status === 'pending-review' ? (
                    <>
                      <Clock className="w-4 h-4 mr-2" />
                      Under Review
                    </>
                  ) : quizStatus.status === 'passed' ? (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      View Results
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Try Again
                    </>
                  )}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};