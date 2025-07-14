import { QuizQuestion } from '../types';

export const htmlQuizQuestions: QuizQuestion[] = [
  {
    id: 'html-q1',
    question: 'What does HTML stand for?',
    options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink and Text Markup Language'],
    correctAnswer: 0,
    explanation: 'HTML stands for Hyper Text Markup Language, which is the standard markup language for creating web pages.'
  },
  {
    id: 'html-q2',
    question: 'Which HTML element is used for the largest heading?',
    options: ['<h6>', '<h1>', '<header>', '<heading>'],
    correctAnswer: 1,
    explanation: '<h1> represents the largest heading, with <h6> being the smallest.'
  },
  {
    id: 'html-q3',
    question: 'What is the correct HTML element for inserting a line break?',
    options: ['<break>', '<br>', '<lb>', '<newline>'],
    correctAnswer: 1,
    explanation: '<br> is a self-closing tag used to insert a line break in HTML.'
  },
  {
    id: 'html-q4',
    question: 'Which attribute is used to provide alternative text for an image?',
    options: ['title', 'alt', 'src', 'description'],
    correctAnswer: 1,
    explanation: 'The alt attribute provides alternative text for images, important for accessibility and SEO.'
  },
  {
    id: 'html-q5',
    question: 'What is the correct HTML for creating a hyperlink?',
    options: ['<a url="http://example.com">Link</a>', '<a href="http://example.com">Link</a>', '<link href="http://example.com">Link</link>', '<a>http://example.com</a>'],
    correctAnswer: 1,
    explanation: 'The <a> tag with href attribute is used to create hyperlinks in HTML.'
  },
  {
    id: 'html-q6',
    question: 'Which HTML element defines the document type?',
    options: ['<doctype>', '<!DOCTYPE html>', '<html>', '<document>'],
    correctAnswer: 1,
    explanation: '<!DOCTYPE html> declares the document type and version of HTML being used.'
  },
  {
    id: 'html-q7',
    question: 'What is the correct HTML element for playing video files?',
    options: ['<movie>', '<video>', '<media>', '<play>'],
    correctAnswer: 1,
    explanation: 'The <video> element is used to embed video content in HTML5.'
  },
  {
    id: 'html-q8',
    question: 'Which HTML attribute specifies an input field must be filled out?',
    options: ['validate', 'required', 'mandatory', 'placeholder'],
    correctAnswer: 1,
    explanation: 'The required attribute specifies that an input field must be filled out before submitting the form.'
  },
  {
    id: 'html-q9',
    question: 'What is the correct HTML for making a checkbox?',
    options: ['<input type="check">', '<input type="checkbox">', '<checkbox>', '<check>'],
    correctAnswer: 1,
    explanation: '<input type="checkbox"> creates a checkbox input element.'
  },
  {
    id: 'html-q10',
    question: 'Which HTML element is used to specify a footer for a document?',
    options: ['<bottom>', '<footer>', '<section>', '<end>'],
    correctAnswer: 1,
    explanation: 'The <footer> element represents a footer for its nearest sectioning content or sectioning root element.'
  },
  {
    id: 'html-q11',
    question: 'What is the correct HTML element for inserting a background image?',
    options: ['<img>', '<background>', 'CSS background property', '<bg>'],
    correctAnswer: 2,
    explanation: 'Background images are set using CSS background properties, not HTML elements.'
  },
  {
    id: 'html-q12',
    question: 'Which HTML element defines navigation links?',
    options: ['<navigation>', '<nav>', '<navigate>', '<menu>'],
    correctAnswer: 1,
    explanation: 'The <nav> element defines a section of navigation links.'
  },
  {
    id: 'html-q13',
    question: 'What is the correct HTML for making a drop-down list?',
    options: ['<input type="dropdown">', '<select>', '<list>', '<dropdown>'],
    correctAnswer: 1,
    explanation: 'The <select> element creates a drop-down list with <option> elements inside.'
  },
  {
    id: 'html-q14',
    question: 'Which HTML element is used to display a scalar value within a range?',
    options: ['<gauge>', '<meter>', '<measure>', '<range>'],
    correctAnswer: 1,
    explanation: 'The <meter> element displays a scalar value within a known range or a fractional value.'
  },
  {
    id: 'html-q15',
    question: 'What is the correct HTML element for the largest heading?',
    options: ['<head>', '<h6>', '<heading>', '<h1>'],
    correctAnswer: 3,
    explanation: '<h1> defines the most important heading and is typically the largest by default.'
  }
];