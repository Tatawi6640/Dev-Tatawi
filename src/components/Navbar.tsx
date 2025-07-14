import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Home, Brain, User, Code, Shield } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/lessons', label: 'Lessons', icon: BookOpen },
  { path: '/quiz', label: 'Quizzes', icon: Brain },
  { path: '/project', label: 'Project', icon: Code },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/admin/review', label: 'Admin', icon: Shield },
];

export const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white w-10 h-10 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Dev & Tatawi
              </span>
            </Link>
          </div>
          
          <div className="flex space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative flex items-center space-x-2 px-3 py-2 rounded-2xl transition-all duration-200"
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
                  <span className={`font-medium ${isActive ? 'text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-purple-50 rounded-2xl border border-purple-200"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};