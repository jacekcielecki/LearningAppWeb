import { CreateCategoryRequest } from '../Models/Category/CreateCategoryRequest';
import { CategoryDto } from '../Models/Category/CategoryDto'
import config from '../config';
import Http from './Http';

export async function getCategories(): Promise<CategoryDto[]> {
  const http = new Http();
  const response = await http.getList<CategoryDto>(`${config.apiUrl}/Category`);
  return response;
}

export async function createCategory(body : CreateCategoryRequest): Promise<boolean> {
  const http = new Http();
  const response = await http.post<CreateCategoryRequest>(`${config.apiUrl}/Category`, body);
  return response;
}

export async function deleteCategory(id: number): Promise<boolean> {
  const http = new Http();
  const response = await http.delete(`${config.apiUrl}/Category/${id}`);
  return response;
}