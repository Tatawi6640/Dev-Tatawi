import { QuizQuestion } from '../types';

export const cssQuizQuestions: QuizQuestion[] = [
  {
    id: 'css-q1',
    question: 'What does CSS stand for?',
    options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'],
    correctAnswer: 1,
    explanation: 'CSS stands for Cascading Style Sheets, used to style and layout web pages.'
  },
  {
    id: 'css-q2',
    question: 'Which property is used to change the background color?',
    options: ['color', 'bgcolor', 'background-color', 'background'],
    correctAnswer: 2,
    explanation: 'The background-color property sets the background color of an element.'
  },
  {
    id: 'css-q3',
    question: 'How do you select an element with id "header"?',
    options: ['.header', '#header', 'header', '*header'],
    correctAnswer: 1,
    explanation: 'The # symbol is used to select elements by their ID in CSS.'
  },
  {
    id: 'css-q4',
    question: 'Which property is used to change the text color?',
    options: ['text-color', 'font-color', 'color', 'text-style'],
    correctAnswer: 2,
    explanation: 'The color property sets the color of text content.'
  },
  {
    id: 'css-q5',
    question: 'How do you make text bold in CSS?',
    options: ['font-weight: bold', 'text-style: bold', 'font-style: bold', 'text-weight: bold'],
    correctAnswer: 0,
    explanation: 'font-weight: bold makes text appear bold.'
  },
  {
    id: 'css-q6',
    question: 'Which property is used to change the font size?',
    options: ['text-size', 'font-style', 'font-size', 'text-style'],
    correctAnswer: 2,
    explanation: 'The font-size property sets the size of the font.'
  },
  {
    id: 'css-q7',
    question: 'How do you select all <p> elements?',
    options: ['.p', '#p', 'p', '*p'],
    correctAnswer: 2,
    explanation: 'Element selectors use just the element name without any prefix.'
  },
  {
    id: 'css-q8',
    question: 'Which property is used to create space around elements?',
    options: ['padding', 'margin', 'spacing', 'border'],
    correctAnswer: 1,
    explanation: 'The margin property creates space around elements, outside of any defined borders.'
  },
  {
    id: 'css-q9',
    question: 'What is the correct CSS syntax for making all <p> elements bold?',
    options: ['p {text-size: bold}', '<p style="font-weight: bold">', 'p {font-weight: bold}', 'p {text-weight: bold}'],
    correctAnswer: 2,
    explanation: 'CSS syntax uses selectors followed by properties in curly braces.'
  },
  {
    id: 'css-q10',
    question: 'Which property is used to align text?',
    options: ['text-align', 'align', 'text-alignment', 'alignment'],
    correctAnswer: 0,
    explanation: 'The text-align property specifies the horizontal alignment of text.'
  },
  {
    id: 'css-q11',
    question: 'How do you display hyperlinks without an underline?',
    options: ['a {text-decoration: none}', 'a {underline: none}', 'a {decoration: no-underline}', 'a {text-underline: none}'],
    correctAnswer: 0,
    explanation: 'text-decoration: none removes the default underline from links.'
  },
  {
    id: 'css-q12',
    question: 'Which property is used to change the left margin of an element?',
    options: ['margin-left', 'left-margin', 'margin: left', 'indent'],
    correctAnswer: 0,
    explanation: 'margin-left sets the left margin of an element.'
  },
  {
    id: 'css-q13',
    question: 'What is the default value of the position property?',
    options: ['relative', 'fixed', 'absolute', 'static'],
    correctAnswer: 3,
    explanation: 'The default value of the position property is static.'
  },
  {
    id: 'css-q14',
    question: 'Which CSS property controls the text size?',
    options: ['font-style', 'text-size', 'font-size', 'text-style'],
    correctAnswer: 2,
    explanation: 'The font-size property controls the size of text.'
  },
  {
    id: 'css-q15',
    question: 'How do you make a list that lists its items with squares?',
    options: ['list-style-type: square', 'list-type: square', 'list-style: square', 'list: square'],
    correctAnswer: 0,
    explanation: 'list-style-type: square makes list items display with square bullets.'
  }
];