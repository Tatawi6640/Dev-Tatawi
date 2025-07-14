import { Badge, UserProfile } from '../types';

export const badges: Badge[] = [
  {
    id: 'html-master',
    name: 'HTML Master',
    description: 'Complete all HTML lessons and pass the HTML quiz',
    icon: '🏗️',
    requirement: (profile: UserProfile) => {
      const htmlLessons = ['html-basics', 'html-forms'];
      const completedHtmlLessons = htmlLessons.every(lesson => 
        profile.completedLessons.includes(lesson)
      );
      const passedHtmlQuiz = profile.passedQuizzes['html']?.some(result => result.passed);
      return completedHtmlLessons && passedHtmlQuiz;
    }
  },
  {
    id: 'css-master',
    name: 'CSS Master',
    description: 'Complete all CSS lessons and pass the CSS quiz',
    icon: '🎨',
    requirement: (profile: UserProfile) => {
      const cssLessons = ['css-basics', 'css-flexbox'];
      const completedCssLessons = cssLessons.every(lesson => 
        profile.completedLessons.includes(lesson)
      );
      const passedCssQuiz = profile.passedQuizzes['css']?.some(result => result.passed);
      return completedCssLessons && passedCssQuiz;
    }
  },
  {
    id: 'js-master',
    name: 'JavaScript Master',
    description: 'Complete all JavaScript lessons and pass the JavaScript quiz',
    icon: '⚡',
    requirement: (profile: UserProfile) => {
      const jsLessons = ['js-variables', 'js-functions', 'js-dom', 'js-arrays'];
      const completedJsLessons = jsLessons.every(lesson => 
        profile.completedLessons.includes(lesson)
      );
      const passedJsQuiz = profile.passedQuizzes['javascript']?.some(result => result.passed);
      return completedJsLessons && passedJsQuiz;
    }
  },
  {
    id: 'full-stack-beginner',
    name: 'Full Stack Beginner',
    description: 'Complete all lessons and pass all quizzes',
    icon: '🎓',
    requirement: (profile: UserProfile) => {
      const allLessons = ['html-basics', 'html-forms', 'css-basics', 'css-flexbox', 'js-variables', 'js-functions', 'js-dom', 'js-arrays'];
      const completedAllLessons = allLessons.every(lesson => 
        profile.completedLessons.includes(lesson)
      );
      const passedAllQuizzes = ['html', 'css', 'javascript'].every(topic =>
        profile.passedQuizzes[topic]?.some(result => result.passed)
      );
      return completedAllLessons && passedAllQuizzes;
    }
  },
  {
    id: 'project-builder',
    name: 'Project Builder',
    description: 'Complete the final project',
    icon: '🚀',
    requirement: (profile: UserProfile) => {
      return profile.badges.includes('project-completed');
    }
  }
];