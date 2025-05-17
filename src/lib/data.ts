
import { Flashcard, Subject, Chapter } from './types';

export const subjects: Subject[] = [
  {
    id: 'math',
    name: 'Mathematics',
    chapters: [
      { id: 'algebra', name: 'Algebra', subjectId: 'math' },
      { id: 'geometry', name: 'Geometry', subjectId: 'math' },
      { id: 'calculus', name: 'Calculus', subjectId: 'math' },
    ]
  },
  {
    id: 'science',
    name: 'Science',
    chapters: [
      { id: 'physics', name: 'Physics', subjectId: 'science' },
      { id: 'chemistry', name: 'Chemistry', subjectId: 'science' },
      { id: 'biology', name: 'Biology', subjectId: 'science' },
    ]
  },
  {
    id: 'history',
    name: 'History',
    chapters: [
      { id: 'ancient', name: 'Ancient History', subjectId: 'history' },
      { id: 'medieval', name: 'Medieval History', subjectId: 'history' },
      { id: 'modern', name: 'Modern History', subjectId: 'history' },
    ]
  }
];

export const flashcards: Flashcard[] = [
  {
    id: '1',
    question: 'What is the Pythagorean theorem?',
    answer: 'In a right triangle, the square of the length of the hypotenuse equals the sum of the squares of the lengths of the other two sides. (a² + b² = c²)',
    known: false,
    subjectId: 'math',
    chapterId: 'geometry'
  },
  {
    id: '2',
    question: 'What is the quadratic formula?',
    answer: 'For a quadratic equation ax² + bx + c = 0, the solutions are x = (-b ± √(b² - 4ac)) / 2a',
    known: false,
    subjectId: 'math',
    chapterId: 'algebra'
  },
  {
    id: '3',
    question: 'What is the derivative of sin(x)?',
    answer: 'The derivative of sin(x) is cos(x)',
    known: false,
    subjectId: 'math',
    chapterId: 'calculus'
  },
  {
    id: '4',
    question: "What is Newton's First Law of Motion?",
    answer: "An object at rest stays at rest and an object in motion stays in motion with the same speed and direction unless acted upon by an unbalanced force.",
    known: false,
    subjectId: 'science',
    chapterId: 'physics'
  },
  {
    id: '5',
    question: "What is the periodic table?",
    answer: "A tabular arrangement of chemical elements, organized by atomic number, electron configuration, and recurring chemical properties.",
    known: false,
    subjectId: 'science',
    chapterId: 'chemistry'
  },
  {
    id: '6',
    question: "What is photosynthesis?",
    answer: "The process by which green plants and some other organisms use sunlight to synthesize foods with carbon dioxide and water.",
    known: false,
    subjectId: 'science',
    chapterId: 'biology'
  },
  {
    id: '7',
    question: "When was the Great Pyramid of Giza built?",
    answer: "Around 2560 BCE during Egypt's Old Kingdom period.",
    known: false,
    subjectId: 'history',
    chapterId: 'ancient'
  },
  {
    id: '8',
    question: "What was the Magna Carta?",
    answer: "A charter of rights agreed to by King John of England in 1215 CE, limiting the monarch's power and establishing that everyone is subject to the law.",
    known: false,
    subjectId: 'history',
    chapterId: 'medieval'
  },
  {
    id: '9',
    question: "When did World War II end?",
    answer: "World War II ended in 1945 with the surrender of Germany in May and Japan in September.",
    known: false,
    subjectId: 'history',
    chapterId: 'modern'
  },
];
