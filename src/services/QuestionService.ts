import CreateQuestionRequest from '../interfaces/Question/CreateQuestionRequest';
import QuestionDto from '../interfaces/Question/QuestionDto';
import http from './http';

const QuestionService = {
  Create: (body : CreateQuestionRequest, categoryId: number) => {
    return http.post<QuestionDto>(`/Question/${categoryId}`, body);
  }
};

export default QuestionService;