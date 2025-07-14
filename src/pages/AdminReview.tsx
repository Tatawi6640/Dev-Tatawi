import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Calendar,
  MessageSquare,
  Trophy,
  Eye,
  Save
} from 'lucide-react';
import { Button } from '../components/Button';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { QuizSubmission, QuizResult, QuizQuestion } from '../types';
import { htmlQuizQuestions } from '../data/htmlQuiz';
import { cssQuizQuestions } from '../data/cssQuiz';
import { jsQuizQuestions } from '../data/jsQuiz';

export const AdminReview: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [quizSubmissions, setQuizSubmissions] = useLocalStorage<QuizSubmission[]>('quizSubmissions', []);
  const [quizResults, setQuizResults] = useLocalStorage<{ [key: string]: QuizResult[] }>('quizResults', {});
  const [selectedSubmission, setSelectedSubmission] = useState<QuizSubmission | null>(null);
  const [feedback, setFeedback] = useState('');
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

  const ADMIN_PASSWORD = 'tatawi123'; // Simple password for demo

  const getQuestionsForTopic = (topic: string): QuizQuestion[] => {
    switch (topic) {
      case 'html': return htmlQuizQuestions;
      case 'css': return cssQuizQuestions;
      case 'javascript': return jsQuizQuestions;
      default: return [];
    }
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const calculateScore = (submission: QuizSubmission): number => {
    const questions = getQuestionsForTopic(submission.topic);
    return submission.answers.reduce((score, answer, index) => {
      return score + (answer === questions[index]?.correctAnswer ? 1 : 0);
    }, 0);
  };

  const handleReview = (submission: QuizSubmission, passed: boolean) => {
    const score = calculateScore(submission);
    const result: QuizResult = {
      score,
      totalQuestions: submission.answers.length,
      passed,
      completedAt: new Date(),
      reviewedBy: 'Tatawi',
      feedback: feedback.trim() || undefined,
      status: 'reviewed'
    };

    // Update quiz results
    const topicResults = quizResults[submission.topic] || [];
    setQuizResults({
      ...quizResults,
      [submission.topic]: [...topicResults, result]
    });

    // Update submission status
    const updatedSubmissions = quizSubmissions.map(s => 
      s.id === submission.id 
        ? { ...s, status: 'reviewed' as const, result }
        : s
    );
    setQuizSubmissions(updatedSubmissions);

    // Reset form
    setSelectedSubmission(null);
    setFeedback('');
    setShowCorrectAnswers(false);
  };

  const pendingSubmissions = quizSubmissions.filter(s => s.status === 'pending');
  const reviewedSubmissions = quizSubmissions.filter(s => s.status === 'reviewed');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-8">
        <div className="max-w-md mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Access</h1>
              <p className="text-gray-600">Enter password to access quiz review panel</p>
            </div>
            
            <div className="space-y-4">
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
              <Button onClick={handleLogin} className="w-full">
                Login as Tatawi
              </Button>
            </div>
            
            <div className="mt-6 p-3 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-700">
                <strong>Demo Password:</strong> tatawi123
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (selectedSubmission) {
    const questions = getQuestionsForTopic(selectedSubmission.topic);
    const score = calculateScore(selectedSubmission);
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button 
              variant="outline" 
              onClick={() => setSelectedSubmission(null)}
              className="mb-6"
            >
              ← Back to Review Panel
            </Button>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Review: {selectedSubmission.userName}'s {selectedSubmission.topic.toUpperCase()} Quiz
                </h2>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">
                    {score}/{questions.length}
                  </div>
                  <div className="text-sm text-gray-600">{percentage}%</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-blue-50 rounded-xl">
                  <User className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <div className="text-sm text-blue-800">{selectedSubmission.userName}</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <div className="text-sm text-green-800">
                    {new Date(selectedSubmission.submittedAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-xl">
                  <Trophy className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                  <div className="text-sm text-purple-800">
                    {percentage >= 70 ? 'Passing Grade' : 'Below Passing'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <Button
                  variant="outline"
                  onClick={() => setShowCorrectAnswers(!showCorrectAnswers)}
                  className="flex items-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>{showCorrectAnswers ? 'Hide' : 'Show'} Correct Answers</span>
                </Button>
              </div>
            </div>
            
            {/* Questions Review */}
            <div className="space-y-4 mb-6">
              {questions.map((question, index) => {
                const userAnswer = selectedSubmission.answers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-start space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCorrect ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-3">
                          {index + 1}. {question.question}
                        </h3>
                        
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => {
                            const isUserAnswer = userAnswer === optionIndex;
                            const isCorrectAnswer = question.correctAnswer === optionIndex;
                            
                            let className = 'p-3 rounded-xl border ';
                            if (isUserAnswer && isCorrectAnswer) {
                              className += 'bg-green-50 border-green-500 text-green-800';
                            } else if (isUserAnswer && !isCorrectAnswer) {
                              className += 'bg-red-50 border-red-500 text-red-800';
                            } else if (showCorrectAnswers && isCorrectAnswer) {
                              className += 'bg-blue-50 border-blue-500 text-blue-800';
                            } else {
                              className += 'bg-gray-50 border-gray-200 text-gray-700';
                            }
                            
                            return (
                              <div key={optionIndex} className={className}>
                                <div className="flex items-center space-x-2">
                                  <div className={`w-4 h-4 rounded-full border-2 ${
                                    isUserAnswer ? 'border-current bg-current' : 'border-gray-300'
                                  }`}>
                                    {isUserAnswer && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />}
                                  </div>
                                  <span>{option}</span>
                                  {isUserAnswer && <span className="text-xs">(User's answer)</span>}
                                  {showCorrectAnswers && isCorrectAnswer && (
                                    <span className="text-xs">(Correct)</span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        
                        {showCorrectAnswers && (
                          <div className="mt-4 p-3 bg-blue-50 rounded-xl">
                            <p className="text-sm text-blue-800">
                              <strong>Explanation:</strong> {question.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Review Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Review Decision</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Feedback for Student (Optional)
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide feedback to help the student improve..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  rows={4}
                />
              </div>
              
              <div className="flex space-x-4">
                <Button
                  onClick={() => handleReview(selectedSubmission, true)}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Mark as Passed</span>
                </Button>
                
                <Button
                  onClick={() => handleReview(selectedSubmission, false)}
                  variant="outline"
                  className="flex items-center space-x-2 border-red-500 text-red-600 hover:bg-red-50"
                >
                  <XCircle className="w-5 h-5" />
                  <span>Mark as Failed</span>
                </Button>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-50 rounded-xl">
                <p className="text-sm text-yellow-800">
                  <strong>Suggested Grade:</strong> {percentage >= 70 ? 'PASS' : 'FAIL'} 
                  ({percentage}% - {score}/{questions.length} correct)
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-800">Admin Review Panel</h1>
          </div>
          <p className="text-gray-600 text-lg">Welcome, Tatawi! Review student quiz submissions</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
            <Clock className="w-8 h-8 text-orange-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800 mb-2">{pendingSubmissions.length}</div>
            <div className="text-gray-600">Pending Review</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800 mb-2">{reviewedSubmissions.length}</div>
            <div className="text-gray-600">Reviewed</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
            <Trophy className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800 mb-2">
              {reviewedSubmissions.filter(s => s.result?.passed).length}
            </div>
            <div className="text-gray-600">Passed</div>
          </div>
        </motion.div>

        {/* Pending Submissions */}
        {pendingSubmissions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Pending Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingSubmissions.map((submission) => {
                const score = calculateScore(submission);
                const percentage = Math.round((score / submission.answers.length) * 100);
                
                return (
                  <div key={submission.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-5 h-5 text-gray-600" />
                        <span className="font-semibold text-gray-800">{submission.userName}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-600">
                          {score}/{submission.answers.length}
                        </div>
                        <div className="text-sm text-gray-600">{percentage}%</div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        submission.topic === 'html' ? 'bg-orange-100 text-orange-800' :
                        submission.topic === 'css' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {submission.topic.toUpperCase()} Quiz
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(submission.submittedAt).toLocaleDateString()}</span>
                    </div>
                    
                    <Button
                      onClick={() => setSelectedSubmission(submission)}
                      className="w-full flex items-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Review Submission</span>
                    </Button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Recently Reviewed */}
        {reviewedSubmissions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recently Reviewed</h2>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Topic
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Result
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reviewedSubmissions.slice(-10).reverse().map((submission) => (
                      <tr key={submission.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <User className="w-5 h-5 text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-gray-900">
                              {submission.userName}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            submission.topic === 'html' ? 'bg-orange-100 text-orange-800' :
                            submission.topic === 'css' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {submission.topic.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {submission.result?.score}/{submission.result?.totalQuestions}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            submission.result?.passed 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {submission.result?.passed ? 'PASSED' : 'FAILED'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(submission.submittedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {pendingSubmissions.length === 0 && reviewedSubmissions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Submissions Yet</h3>
            <p className="text-gray-500">Quiz submissions will appear here for review</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};