import UserDto from "../User/UserDto";

interface QuestionDto {
  id: number;
  questionContent: string;
  imageUrl: string;
  a: string;
  b: string;
  c: string;
  d: string;
  correctAnswer: string;
  level: number;
  creatorId: number | null;
  dateCreated: Date | null;
  categoryId: number;
  creator: UserDto | null;
}

export default QuestionDto;