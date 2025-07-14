import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, CheckCircle, Trophy, AlertCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ProjectSubmission } from '../types';

export const FinalProject: React.FC = () => {
  const [html, setHtml] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Your Name</h1>
        <nav>
            <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="about">
            <h2>About Me</h2>
            <p>Write about yourself here...</p>
        </section>
        
        <section id="projects">
            <h2>My Projects</h2>
            <div class="project-grid">
                <div class="project-card">
                    <h3>Project 1</h3>
                    <p>Description of your project...</p>
                    <button onclick="showProject(1)">View Project</button>
                </div>
            </div>
        </section>
        
        <section id="contact">
            <h2>Contact Me</h2>
            <p>Get in touch!</p>
        </section>
    </main>
    
    <script src="script.js"></script>
</body>
</html>`);

  const [css, setCss] = useState(`/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
}

/* Header Styles */
header {
    background: #2c3e50;
    color: white;
    padding: 1rem 0;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
}

header h1 {
    text-align: center;
    margin-bottom: 0.5rem;
}

nav ul {
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 2rem;
}

nav a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
}

nav a:hover {
    color: #3498db;
}

/* Main Content */
main {
    margin-top: 120px;
    padding: 2rem;
}

section {
    margin-bottom: 3rem;
    padding: 2rem;
    background: #f8f9fa;
    border-radius: 8px;
}

h2 {
    color: #2c3e50;
    margin-bottom: 1rem;
}

/* Project Grid */
.project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.project-card {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.project-card:hover {
    transform: translateY(-5px);
}

button {
    background: #3498db;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;
}

button:hover {
    background: #2980b9;
}

/* Responsive Design */
@media (max-width: 768px) {
    nav ul {
        flex-direction: column;
        gap: 1rem;
    }
    
    main {
        margin-top: 160px;
        padding: 1rem;
    }
    
    .project-grid {
        grid-template-columns: 1fr;
    }
}`);

  const [javascript, setJavascript] = useState(`// Portfolio Interactive Features

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Project interaction function
function showProject(projectId) {
    alert(\`Showing details for Project \${projectId}!\`);
    
    // You can expand this to show a modal or navigate to project details
    console.log(\`Project \${projectId} clicked\`);
}

// Add some dynamic content
document.addEventListener('DOMContentLoaded', function() {
    // Add current year to footer if it exists
    const currentYear = new Date().getFullYear();
    
    // Simple form validation example
    const contactForms = document.querySelectorAll('form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message!');
        });
    });
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(44, 62, 80, 0.95)';
        } else {
            header.style.background = '#2c3e50';
        }
    });
});`);

  const [submitted, setSubmitted] = useState(false);
  const [validationResults, setValidationResults] = useState<string[]>([]);
  const [projectSubmissions, setProjectSubmissions] = useLocalStorage<ProjectSubmission[]>('projectSubmissions', []);
  const [userBadges, setUserBadges] = useLocalStorage<string[]>('userBadges', []);

  const validateCode = () => {
    const results: string[] = [];
    
    // HTML Validation
    const requiredHtmlTags = ['<header>', '<section>', '<button>', '<nav>', '<main>'];
    requiredHtmlTags.forEach(tag => {
      if (html.includes(tag)) {
        results.push(`✅ HTML contains ${tag} element`);
      } else {
        results.push(`❌ HTML missing ${tag} element`);
      }
    });
    
    // CSS Validation
    const requiredCssProperties = ['display: flex', 'display: grid', 'transition:', '@media'];
    requiredCssProperties.forEach(prop => {
      if (css.includes(prop)) {
        results.push(`✅ CSS uses ${prop}`);
      } else {
        results.push(`❌ CSS missing ${prop}`);
      }
    });
    
    // JavaScript Validation
    const requiredJsFeatures = ['addEventListener', 'querySelector', 'function'];
    requiredJsFeatures.forEach(feature => {
      if (javascript.includes(feature)) {
        results.push(`✅ JavaScript uses ${feature}`);
      } else {
        results.push(`❌ JavaScript missing ${feature}`);
      }
    });
    
    return results;
  };

  const handleSubmit = () => {
    const validation = validateCode();
    setValidationResults(validation);
    
    const submission: ProjectSubmission = {
      html,
      css,
      javascript,
      submittedAt: new Date()
    };
    
    setProjectSubmissions([...projectSubmissions, submission]);
    
    // Award project completion badge
    if (!userBadges.includes('project-completed')) {
      setUserBadges([...userBadges, 'project-completed']);
    }
    
    setSubmitted(true);
  };

  const resetProject = () => {
    setSubmitted(false);
    setValidationResults([]);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <Trophy className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Project Submitted Successfully! 🎉
            </h1>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-8">
              <p className="text-xl text-gray-600 mb-6">
                Congratulations! You've completed your portfolio project.
              </p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Code Validation Results:</h3>
                <div className="text-left space-y-2 max-h-60 overflow-y-auto">
                  {validationResults.map((result, index) => (
                    <div key={index} className="text-sm font-mono p-2 bg-gray-50 rounded">
                      {result}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl mb-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">🎓 Badge Earned!</h3>
                <p className="text-purple-700">Project Builder - Complete the final project</p>
              </div>
              
              <Button onClick={resetProject} className="flex items-center space-x-2">
                <Code className="w-5 h-5" />
                <span>Create Another Project</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Final Project</h1>
          <p className="text-gray-600 text-lg">
            Build a responsive portfolio page using HTML, CSS, and JavaScript
          </p>
        </motion.div>

        {/* Project Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-orange-50 rounded-xl">
              <h3 className="text-lg font-semibold text-orange-800 mb-2">HTML Structure</h3>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Use semantic HTML elements</li>
                <li>• Include header, main, and sections</li>
                <li>• Add navigation menu</li>
                <li>• Create interactive buttons</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">CSS Styling</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Use Flexbox or Grid layout</li>
                <li>• Add responsive design</li>
                <li>• Include hover effects</li>
                <li>• Style with transitions</li>
              </ul>
            </div>
            <div className="p-4 bg-yellow-50 rounded-xl">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">JavaScript Features</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Add event listeners</li>
                <li>• Use DOM manipulation</li>
                <li>• Create interactive functions</li>
                <li>• Handle user interactions</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Code Editors */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* HTML Editor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100"
          >
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>HTML</span>
              </h3>
            </div>
            <div className="p-4">
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                className="w-full h-96 font-mono text-sm border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                placeholder="Write your HTML here..."
              />
            </div>
          </motion.div>

          {/* CSS Editor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100"
          >
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>CSS</span>
              </h3>
            </div>
            <div className="p-4">
              <textarea
                value={css}
                onChange={(e) => setCss(e.target.value)}
                className="w-full h-96 font-mono text-sm border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                placeholder="Write your CSS here..."
              />
            </div>
          </motion.div>

          {/* JavaScript Editor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100"
          >
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>JavaScript</span>
              </h3>
            </div>
            <div className="p-4">
              <textarea
                value={javascript}
                onChange={(e) => setJavascript(e.target.value)}
                className="w-full h-96 font-mono text-sm border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                placeholder="Write your JavaScript here..."
              />
            </div>
          </motion.div>
        </div>

        {/* Submit Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <AlertCircle className="w-5 h-5 text-blue-500" />
              <span className="text-gray-700">
                Your code will be validated for required HTML elements, CSS properties, and JavaScript features.
              </span>
            </div>
            
            <Button onClick={handleSubmit} size="lg" className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Submit Project</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};