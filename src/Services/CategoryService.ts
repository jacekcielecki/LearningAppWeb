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

export async function createCategory(dto : CreateCategoryRequest): Promise<boolean> {
  try {
    let accessToken = localStorage.getItem("token");
    alert(accessToken);
    const response = await fetch(`${config.apiUrl}/Category`,  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(dto),
    });
    if (!response.ok) {
      throw new Error('Failed to create category');
    }
    return true;
  } catch (error : any) {
    console.log(error.message);
    return false;
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