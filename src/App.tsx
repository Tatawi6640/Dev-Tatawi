import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { ProgressSidebar } from './components/ProgressSidebar';
import { Home } from './pages/Home';
import { Lessons } from './pages/Lessons';
import { QuizHub } from './pages/QuizHub';
import { FinalProject } from './pages/FinalProject';
import { Profile } from './pages/Profile';
import { AdminReview } from './pages/AdminReview';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <ProgressSidebar />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="ml-80"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/quiz" element={<QuizHub />} />
            <Route path="/project" element={<FinalProject />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin/review" element={<AdminReview />} />
          </Routes>
        </motion.main>
      </div>
    </Router>
  );
}

export default App;