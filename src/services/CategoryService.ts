
import CategoryDto from '../interfaces/Category/CategoryDto';
import CreateCategoryRequest from '../interfaces/Category/CreateCategoryRequest';
import http from './http';

const CategoryService = {
  GetAll: () => {
    return http.get<CategoryDto[]>(`/Category`);
  },
  Create: (body : CreateCategoryRequest) => {
    return http.post<CategoryDto>(`/Category`, body);
  },
  Delete: (id: number) => {
    return http.delete(`/Category/${id}`);
  }
};

export default CategoryService;