export interface CreateCategoryRequest {
    name: string;
    description: string;
    iconUrl: string | null;
    questionsPerQuiz: number;
    quizPerLevel: number;
  }
  