export interface Question {
  id: number;
  question: string;
  description?: string;
  answers: { [key: string]: string | null };
  multiple_correct_answers: string;
  correct_answer: string;
  // correct_answers: { [key: string]: string };
  explanation?: string;
  tip?: string;
  tags: Tag[];
  category: string;
  difficulty: string;
  userAnswer: string;
}

interface Tag {
  name: string;
}
