export interface CategoryDto {
    id: number;
    name: string;
    description: string;
    iconUrl: string | null;
    questionsPerLesson: number;
    lessonsPerLevel: number;
  }
  