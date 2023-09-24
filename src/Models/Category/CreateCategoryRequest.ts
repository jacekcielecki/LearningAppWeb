export interface CreateCategoryRequest {
    name: string;
    description: string;
    iconUrl: string | null;
    questionsPerLesson: number;
    quizPerLevel: number;
  }
  