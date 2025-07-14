import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Trophy, RotateCcw, CheckCircle, XCircle, ArrowLeft, Clock, Send } from 'lucide-react';
import { QuizCard } from './QuizCard';
import { Button } from './Button';
import { QuizQuestion, QuizResult, QuizSubmission } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface TopicQuizProps {
  topic: string;
  questions: QuizQuestion[];
  onBack: () => void;
}

export const TopicQuiz: React.FC<TopicQuizProps> = ({ topic, questions, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResults, setQuizResults] = useLocalStorage<{ [key: string]: QuizResult[] }>('quizResults', {});
  const [quizSubmissions, setQuizSubmissions] = useLocalStorage<QuizSubmission[]>('quizSubmissions', []);

  // Check if there's a reviewed result for this topic
  const getReviewedResult = () => {
    const topicResults = quizResults[topic.toLowerCase()] || [];
    return topicResults.find(result => result.status === 'reviewed');
  };

  const reviewedResult = getReviewedResult();

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newUserAnswers);

    if (isLastQuestion) {
      // Submit quiz for review
      const finalAnswers = [...newUserAnswers];
      
      const submission: QuizSubmission = {
        id: `${topic.toLowerCase()}-${Date.now()}`,
        userId: 'alae',
        userName: 'Alae',
        topic: topic.toLowerCase(),
        answers: finalAnswers,
        submittedAt: new Date(),
        status: 'pending'
      };
      
      setQuizSubmissions([...quizSubmissions, submission]);
      setQuizSubmitted(true);
    } else {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setQuizSubmitted(false);
  };

  // Show reviewed result if available
  if (reviewedResult) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
            reviewedResult.passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {reviewedResult.passed ? (
              <Trophy className="w-12 h-12 text-green-600" />
            ) : (
              <XCircle className="w-12 h-12 text-red-600" />
            )}
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Quiz {reviewedResult.passed ? 'Passed!' : 'Failed'}
          </h1>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-8">
            <div className="text-6xl font-bold mb-4">
              <span className={reviewedResult.passed ? 'text-green-600' : 'text-red-600'}>
                {reviewedResult.score}
              </span>
              <span className="text-gray-400">/{reviewedResult.totalQuestions}</span>
            </div>
            
            <p className="text-xl text-gray-600 mb-6">
              Reviewed by {reviewedResult.reviewedBy || 'Tatawi'}
            </p>
            
            {reviewedResult.feedback && (
              <div className="bg-blue-50 p-4 rounded-xl mb-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Feedback from Tatawi:</h3>
                <p className="text-blue-700">{reviewedResult.feedback}</p>
              </div>
            )}
            
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={onBack} className="flex items-center space-x-2">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Quizzes</span>
              </Button>
              <Button onClick={handleRestart} className="flex items-center space-x-2">
                <RotateCcw className="w-5 h-5" />
                <span>Retake Quiz</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Show submission confirmation
  if (quizSubmitted) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
            <Send className="w-12 h-12 text-blue-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Quiz Submitted Successfully!
          </h1>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-8">
            <p className="text-xl text-gray-600 mb-8">
              Your answers have been submitted and are awaiting review by <strong>Tatawi</strong>.
            </p>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-800">Review Process</h3>
              </div>
              <ul className="text-blue-700 space-y-2">
                <li>• Your answers are being carefully reviewed</li>
                <li>• You'll receive detailed feedback on your performance</li>
                <li>• Check back later or visit your profile for updates</li>
                <li>• Results typically available within 24 hours</li>
              </ul>
            </div>
            
            <Button onClick={onBack} className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Quizzes</span>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Button variant="outline" onClick={onBack} className="flex items-center space-x-2 mb-4">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Quizzes</span>
        </Button>
        
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{topic.toUpperCase()} Quiz</h1>
          <p className="text-gray-600 text-lg">Test your {topic} knowledge</p>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-purple-600" />
            <span className="text-lg font-semibold text-gray-800">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full"
          />
        </div>
      </motion.div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <QuizCard
          key={currentQuestionIndex}
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          showResult={false}
        />
      </AnimatePresence>

      {/* Next Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-center"
      >
        <Button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="flex items-center space-x-2"
        >
          {isLastQuestion ? (
            <>
              <Send className="w-5 h-5" />
              <span>Submit Quiz</span>
            </>
          ) : (
            <>
              <span>Next Question</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                →
              </motion.div>
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
};