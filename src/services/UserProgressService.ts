import QuizCompletedDto from '../interfaces/UserProgress/QuizCompletedDto';
import http from './http';

const UserProgressService = {
  CompleteQuiz: (categoryId: number, quizLevelName: string, expGained: number) => {
    return http.patch<QuizCompletedDto>(`/UserProgress/CompleteQuiz/Category/${categoryId}/Level/${quizLevelName}/ExpGained/${expGained}`);
  },
};

export default UserProgressService;