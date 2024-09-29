"use client";
import React, { useEffect, useState } from 'react';
import QuestionSelector from '../../../../../../components/QuestionSelection';

// Define the Question type
interface Question {
    _id: string;
    text: string;
}

const CategoryPage = ({ params }: { params: { id: string; levelId: string; categoryId: string } }) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/question/${params.id}/${params.levelId}/${params.categoryId}`);
                if (!response.ok) {
                    console.error('Fetch failed with status:', response.status, 'and status text:', response.statusText);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const questionsData: Question[] = await response.json();
                setQuestions(questionsData);
            } catch (error: any) {
                console.error('Failed to fetch questions:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [params.id, params.levelId, params.categoryId]);


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-center my-8">Questions</h1>

            {/* Buttons below the title */}
            <div className="flex justify-between mb-4">
                <div>
                    <button onClick={() => window.history.back()} className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-black ml-3">
                        Back
                    </button>
                    <button onClick={() => window.location.href = '/'} className="bg-gray-700 text-white px-4 py-2 rounded ml-2 hover:bg-black">
                        Home
                    </button>
                </div>
            </div>

            <QuestionSelector
                questions={questions}
            />
        </div>
    );
};

export default CategoryPage;
