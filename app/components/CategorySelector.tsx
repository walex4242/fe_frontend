"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Category {
    _id: string;
    name: string;
}

interface CategorySelectorProps {
    community: string;
    level: string;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ community, level }) => {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/${community}/${level}`);
            const data = await response.json();
            setCategories(data);
        };

        fetchCategories();
    }, [community, level]);

    const handleCategorySelect = (categoryId: string) => {
        router.push(`/community/${community}/level/${level}/category/${categoryId}`); // Update the URL here
    };

    return (
        <div>
            <div className="flex justify-between mb-4">
                <div className='flex gap-2'>
                    <button onClick={() => router.back()} className="bg-gray-700 text-white px-4 py-2 rounded ml-3 hover:bg-black">
                        Back
                    </button>
                    <button onClick={() => router.push('/')} className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-black">
                        Home
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((category) => (
                    <div key={category._id} className="border p-4 rounded shadow-md">
                        <h3 onClick={() => handleCategorySelect(category._id)} className="text-lg font-semibold cursor-pointer text-center">
                            {category.name}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategorySelector;
