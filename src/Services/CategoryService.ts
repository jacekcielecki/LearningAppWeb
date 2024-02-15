import { CreateCategoryRequest } from '../Models/Category/CreateCategoryRequest';
import { CategoryDto } from '../Models/Category/CategoryDto'
import http from './Http';

const CategoryService = {
  GetAll: () => {
    return http.get<CategoryDto>(`/Category`);
  },
  Create: (body : CreateCategoryRequest) => {
    return http.post<CategoryDto>(`/Category`, body);
  },
  Delete: (id: number) => {
    return http.delete(`/Category/${id}`);
  }
};

export default CategoryService;