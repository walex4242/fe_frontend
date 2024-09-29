import React from 'react';

interface Question {
    _id: string;
    text: string;
}

interface QuestionSelectorProps {
    questions: Question[];
}

const QuestionSelector: React.FC<QuestionSelectorProps> = ({
    questions,
}) => {

    return (
        <div>
            <ul className="list-disc list-outside p-10"> {/* Added list-inside */}
                {questions.map((question) => (
                    <li key={question._id} className="mb-4">
                        <p className="cursor-pointer text-lg hover:text-blue-600">
                            {question.text}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionSelector;
