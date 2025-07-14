import { QuizQuestion } from '../types';

export const jsQuizQuestions: QuizQuestion[] = [
  {
    id: 'js-q1',
    question: 'Which keyword is used to declare a variable that cannot be reassigned?',
    options: ['var', 'let', 'const', 'static'],
    correctAnswer: 2,
    explanation: 'const declares a constant variable that cannot be reassigned after initialization.'
  },
  {
    id: 'js-q2',
    question: 'What will be the output of: console.log(typeof "Hello");',
    options: ['string', 'text', 'String', 'undefined'],
    correctAnswer: 0,
    explanation: 'The typeof operator returns "string" for string values.'
  },
  {
    id: 'js-q3',
    question: 'Which method is used to add an element to the end of an array?',
    options: ['push()', 'pop()', 'shift()', 'unshift()'],
    correctAnswer: 0,
    explanation: 'push() adds one or more elements to the end of an array.'
  },
  {
    id: 'js-q4',
    question: 'What is the correct way to write a JavaScript function?',
    options: ['function = myFunction() {}', 'function myFunction() {}', 'function:myFunction() {}', 'def myFunction() {}'],
    correctAnswer: 1,
    explanation: 'Functions are declared with the function keyword followed by the function name and parentheses.'
  },
  {
    id: 'js-q5',
    question: 'Which operator is used to compare both value and type?',
    options: ['==', '===', '!=', '!=='],
    correctAnswer: 1,
    explanation: 'The === operator performs strict equality comparison, checking both value and type.'
  },
  {
    id: 'js-q6',
    question: 'What will be the result of: 5 + "5"?',
    options: ['10', '55', '"55"', 'Error'],
    correctAnswer: 2,
    explanation: 'JavaScript converts the number 5 to string and concatenates, resulting in "55".'
  },
  {
    id: 'js-q7',
    question: 'Which method is used to select an element by its ID?',
    options: ['querySelector()', 'getElementById()', 'getElementsByClassName()', 'getElement()'],
    correctAnswer: 1,
    explanation: 'getElementById() specifically selects an element by its ID attribute.'
  },
  {
    id: 'js-q8',
    question: 'What does the addEventListener method do?',
    options: ['Creates an event', 'Removes an event', 'Attaches an event handler', 'Triggers an event'],
    correctAnswer: 2,
    explanation: 'addEventListener attaches an event handler function to an element.'
  },
  {
    id: 'js-q9',
    question: 'Which loop is guaranteed to execute at least once?',
    options: ['for loop', 'while loop', 'do-while loop', 'forEach loop'],
    correctAnswer: 2,
    explanation: 'A do-while loop executes the code block first, then checks the condition.'
  },
  {
    id: 'js-q10',
    question: 'What is the correct way to write an arrow function?',
    options: ['const func = () -> {}', 'const func = () => {}', 'const func = () >> {}', 'const func = () << {}'],
    correctAnswer: 1,
    explanation: 'Arrow functions use the => syntax: const func = () => {}'
  },
  {
    id: 'js-q11',
    question: 'Which method converts a string to uppercase?',
    options: ['toUpperCase()', 'uppercase()', 'toUpper()', 'upper()'],
    correctAnswer: 0,
    explanation: 'The toUpperCase() method converts a string to uppercase letters.'
  },
  {
    id: 'js-q12',
    question: 'What is the purpose of the return statement in a function?',
    options: ['To stop the function', 'To send a value back', 'To declare a variable', 'To create a loop'],
    correctAnswer: 1,
    explanation: 'The return statement sends a value back to the code that called the function.'
  },
  {
    id: 'js-q13',
    question: 'Which method is used to remove the last element from an array?',
    options: ['pop()', 'push()', 'shift()', 'splice()'],
    correctAnswer: 0,
    explanation: 'pop() removes and returns the last element from an array.'
  },
  {
    id: 'js-q14',
    question: 'What is the correct way to write a conditional statement?',
    options: ['if x = 5 then', 'if (x == 5) {}', 'if x == 5 {}', 'if (x = 5) {}'],
    correctAnswer: 1,
    explanation: 'Conditional statements use if followed by a condition in parentheses.'
  },
  {
    id: 'js-q15',
    question: 'Which event is fired when a user clicks on an element?',
    options: ['onclick', 'click', 'onmousedown', 'tap'],
    correctAnswer: 1,
    explanation: 'The "click" event is fired when an element is clicked.'
  }
];