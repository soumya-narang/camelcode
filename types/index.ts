export interface Lesson {
  slug: string;
  title: string;
  description: string;
  chapter: string;
  chapterTitle: string;
  order: number;
  content: string;
}

export interface Chapter {
  slug: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface CodeExecutionResult {
  output: string;
  error: string | null;
  success: boolean;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  expectedOutput?: string;
  hints: string[];
}
