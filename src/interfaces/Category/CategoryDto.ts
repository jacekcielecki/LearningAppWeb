import QuestionDto from "../Question/QuestionDto";
import UserDto from "../User/UserDto";

interface CategoryDto {
  id: number;
  name: string;
  description: string;
  iconUrl: string;
  questionsPerQuiz: number;
  quizPerLevel: number;
  creatorId?: number;
  dateCreated?: Date;
  creator?: UserDto;
  questions: QuestionDto[];
}

export default CategoryDto;