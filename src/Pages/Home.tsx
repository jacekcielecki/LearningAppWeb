import { CategoryDto } from '../Models/CategoryDto'
import { useEffect, useState } from 'react';

export const Home = () => {
    const [categories, setCategories] = useState<CategoryDto[] | null>(null);

    useEffect(() => {
        try {
            fetch('https://localhost:7280/api/Category')
                .then(response => response.json())
                .then((data: CategoryDto[]) => {
                    const parsedData = data.map(item => new CategoryDto(
                        item.id,
                        item.name,
                        item.description,
                        item.iconUrl,
                        item.questionsPerLesson,
                        item.lessonsPerLevel,
                    ));
                    setCategories(parsedData);
                });
            } catch (error) {
                console.error(error);
            }
    }, []);

    return (
        <div className='Home'>
            <h3>Home</h3>
            {<ul>
                {categories?.map((category: CategoryDto) => (
                    <li key={category.id}>
                        <p>{category.id}</p>
                        <p>{category.name}</p>
                        <p>{category.description}</p>
                        <p>{category.iconUrl}</p>
                    </li>
                ))}
            </ul>}
        </div>
     );
}