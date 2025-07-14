import { Lesson } from '../types';

export const lessons: Lesson[] = [
  {
    id: 'html-basics',
    title: 'HTML Fundamentals',
    summary: 'Learn the basic structure and elements of HTML',
    category: 'HTML',
    difficulty: 'Beginner',
    codeExample: `<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Welcome to HTML!</h1>
    <p>This is a paragraph.</p>
</body>
</html>`,
    explanation: 'HTML provides the basic structure for web pages using elements like headings, paragraphs, and links.'
  },
  {
    id: 'html-forms',
    title: 'HTML Forms & Input',
    summary: 'Master form elements and user input handling',
    category: 'HTML',
    difficulty: 'Intermediate',
    codeExample: `<form>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    
    <button type="submit">Submit</button>
</form>`,
    explanation: 'Forms are essential for collecting user input. Learn about different input types and form validation.'
  },
  {
    id: 'css-basics',
    title: 'CSS Fundamentals',
    summary: 'Style your web pages with CSS properties',
    category: 'CSS',
    difficulty: 'Beginner',
    codeExample: `/* CSS Styling */
h1 {
    color: #333;
    font-size: 2rem;
    text-align: center;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}`,
    explanation: 'CSS controls the visual presentation of HTML elements. Learn selectors, properties, and layout techniques.'
  },
  {
    id: 'css-flexbox',
    title: 'CSS Flexbox Layout',
    summary: 'Create responsive layouts with Flexbox',
    category: 'CSS',
    difficulty: 'Intermediate',
    codeExample: `.flex-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.flex-item {
    flex: 1;
    padding: 20px;
    background: #f0f0f0;
}`,
    explanation: 'Flexbox is a powerful layout system that makes it easy to create responsive designs and align elements.'
  },
  {
    id: 'js-variables',
    title: 'JavaScript Variables',
    summary: 'Understanding variables, data types, and scope',
    category: 'JavaScript',
    difficulty: 'Beginner',
    codeExample: `// Variable declarations
let name = "Alae";
const age = 25;
var isStudent = true;

// Different data types
let number = 42;
let text = "Hello World";
let isActive = false;
let items = [1, 2, 3];`,
    explanation: 'Variables store data values. Learn about let, const, var and different data types in JavaScript.'
  },
  {
    id: 'js-functions',
    title: 'JavaScript Functions',
    summary: 'Create reusable code blocks with functions',
    category: 'JavaScript',
    difficulty: 'Intermediate',
    codeExample: `// Function declaration
function greet(name) {
    return "Hello, " + name + "!";
}

// Arrow function
const add = (a, b) => a + b;

// Function usage
console.log(greet("Alae"));
console.log(add(5, 3));`,
    explanation: 'Functions are reusable blocks of code that perform specific tasks. Learn function syntax and best practices.'
  },
  {
    id: 'js-dom',
    title: 'DOM Manipulation',
    summary: 'Interact with HTML elements using JavaScript',
    category: 'JavaScript',
    difficulty: 'Intermediate',
    codeExample: `// Select elements
const button = document.getElementById('myButton');
const output = document.querySelector('.output');

// Add event listener
button.addEventListener('click', function() {
    output.textContent = 'Button clicked!';
    output.style.color = 'blue';
});`,
    explanation: 'The DOM (Document Object Model) allows JavaScript to interact with HTML elements and respond to user events.'
  },
  {
    id: 'js-arrays',
    title: 'JavaScript Arrays',
    summary: 'Work with arrays and array methods',
    category: 'JavaScript',
    difficulty: 'Intermediate',
    codeExample: `const fruits = ['apple', 'banana', 'orange'];

// Array methods
fruits.push('grape');
const upperFruits = fruits.map(fruit => fruit.toUpperCase());
const longFruits = fruits.filter(fruit => fruit.length > 5);

console.log(upperFruits);
console.log(longFruits);`,
    explanation: 'Arrays store multiple values and provide powerful methods for data manipulation like map, filter, and reduce.'
  }
];