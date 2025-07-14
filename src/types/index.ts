export interface Lesson {
  id: string;
  title: string;
  summary: string;
  category: 'HTML' | 'CSS' | 'JavaScript';
  difficulty: 'Beginner' | 'Intermediate';
  codeExample?: string;
  explanation: string;
  completed?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  passed: boolean;
  completedAt: Date;
  reviewedBy?: string;
  feedback?: string;
  status: 'pending' | 'reviewed';
}

export interface QuizSubmission {
  id: string;
  userId: string;
  userName: string;
  topic: string;
  answers: number[];
  submittedAt: Date;
  status: 'pending' | 'reviewed';
  result?: QuizResult;
}

export interface UserProfile {
  name: string;
  xp: number;
  level: number;
  completedLessons: string[];
  passedQuizzes: { [key: string]: QuizResult[] };
  badges: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: (profile: UserProfile) => boolean;
}

export interface ProjectSubmission {
  html: string;
  css: string;
  javascript: string;
  submittedAt: Date;
}