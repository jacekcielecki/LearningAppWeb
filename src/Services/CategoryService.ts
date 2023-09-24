import { CreateCategoryRequest } from '../Models/Category/CreateCategoryRequest';
import { CategoryDto } from '../Models/CategoryDto'

const API_BASE_URL = 'https://localhost:7280/api';

export async function getCategories(): Promise<CategoryDto[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/Category`);
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
    const response = await fetch(`${API_BASE_URL}/Category`,  {
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
    const response = await fetch(`${API_BASE_URL}/Category/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return false;
      //throw new Error('Failed to delete category');
    }
  } catch (error) {
    return false;
    //throw new Error(`Error deleting category: ${error.message}`);
  }

  return true;
}