import { CreateCategoryRequest } from '../Models/Category/CreateCategoryRequest';
import { CategoryDto } from '../Models/Category/CategoryDto'
import config from '../config';
import Http from './Http';

const CategoryService = {
  async GetAll(): Promise<CategoryDto[]> {
    const response = await Http.getList<CategoryDto>(`${config.apiUrl}/Category`);
    return response;
  },
  async Create(body : CreateCategoryRequest): Promise<boolean> {
    const response = await Http.post<CreateCategoryRequest>(`${config.apiUrl}/Category`, body);
    return response;
  },
  async Delete(id: number): Promise<boolean> {
    const response = await Http.delete(`${config.apiUrl}/Category/${id}`);
    return response;
  }
};

export default CategoryService;