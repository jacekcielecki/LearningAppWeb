import { CreateCategoryRequest } from '../Models/Category/CreateCategoryRequest';
import { CategoryDto } from '../Models/Category/CategoryDto'
import config from '../config';

export async function getCategories(): Promise<CategoryDto[]> {
  try {
    const response = await fetch(`${config.apiUrl}/Category`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const categories: CategoryDto[] = await response.json();
    return categories;
  } catch (error : any) {
    throw new Error(`Error fetching categories: ${error.message}`);
  }
}

export async function createCategory(dto : CreateCategoryRequest): Promise<CategoryDto> {
  try {
    const response = await fetch(`${config.apiUrl}/Category`,  {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(dto),
    });
    if (!response.ok) {
      throw new Error('Failed to create category');
    }
    const category: CategoryDto = await response.json();
    console.log('Created post:', category);

    return category;
  } catch (error : any) {
    console.log(error.message)
    throw new Error(`Error creating category: ${error.message}`);
  }
}

export async function deleteCategory(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${config.apiUrl}/Category/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return false;
    }
  } catch (error) {
    return false;
  }
  return true;
}