import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Brain, Trophy, Code, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';

export const Home: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Lessons',
      description: 'Learn HTML, CSS, and JavaScript with hands-on examples',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      icon: Brain,
      title: 'Knowledge Quizzes',
      description: 'Test your understanding with challenging questions',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      icon: Trophy,
      title: 'Track Progress',
      description: 'Monitor your learning journey and achievements',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Code,
      title: 'Code Examples',
      description: 'Practice with real-world code snippets',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-teal-600 bg-clip-text text-transparent mb-6">
              Welcome to Dev & Tatawi
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Master web development with our interactive learning platform. 
              Learn HTML, CSS, and JavaScript through engaging lessons and quizzes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/lessons">
                <Button size="lg" className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Start Learning</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/quiz">
                <Button variant="secondary" size="lg" className="flex items-center space-x-2">
                  <Brain className="w-5 h-5" />
                  <span>Take Quiz</span>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Hello, <span className="text-purple-600">Alae</span>! 👋
              </h2>
              <p className="text-gray-600 text-lg">
                Ready to continue your web development journey? Pick up where you left off or explore new topics.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600 mb-2">8</div>
                <div className="text-gray-600">Lessons Available</div>
              </div>
              <div className="text-center p-4 bg-teal-50 rounded-xl">
                <div className="text-2xl font-bold text-teal-600 mb-2">15</div>
                <div className="text-gray-600">Quiz Questions</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <div className="text-2xl font-bold text-orange-600 mb-2">Level 1</div>
                <div className="text-gray-600">Current Level</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Dev & Tatawi?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our platform offers a comprehensive learning experience designed to help you master web development fundamentals.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-8 shadow-2xl"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of developers who have improved their skills with our interactive lessons.
            </p>
            <Link to="/lessons">
              <Button variant="secondary" size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Get Started Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};