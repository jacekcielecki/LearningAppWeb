export class CategoryDto {
    id: number;
    name: string;
    description: string;
    iconUrl: string | null;
    questionsPerLesson: number;
    lessonsPerLevel: number;
  
    constructor(
      id: number,
      name: string,
      description: string,
      iconUrl: string | null,
      questionsPerLesson: number,
      lessonsPerLevel: number,
    ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.iconUrl = iconUrl;
      this.questionsPerLesson = questionsPerLesson;
      this.lessonsPerLevel = lessonsPerLevel;
    }
  }
  