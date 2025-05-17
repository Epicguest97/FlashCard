
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  known: boolean;
  subjectId: string;
  chapterId: string;
}

export interface Subject {
  id: string;
  name: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  name: string;
  subjectId: string;
}
