"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Level {
    _id: string;
    name: string;
}

interface LevelSelectorProps {
    levelIds?: { _id: string }[]; // Array of level IDs
    communityId: string;
}

const LevelSelector = ({ levelIds = [], communityId }: LevelSelectorProps) => {
    const [levels, setLevels] = useState<Level[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter()

    const fetchLevels = async () => {
        if (levelIds.length === 0) {
            setLoading(false);
            return;
        }

        try {
            const responses = await Promise.all(
                levelIds.map(async (level) => {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/level/${level._id}`);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch level with ID: ${level._id}`);
                    }
                    return response.json();
                })
            );

            setLevels(responses);
            setLoading(false);
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLevels(); // Fetch levels when component mounts
    }, [levelIds]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    // if (levelIds.length === 0) return <div>No levels available.</div>;

    return (
        <div className="container mx-auto relative">
            <div className="flex justify-between my-8">
                <div className="flex gap-2">
                    <button
                        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-black ml-3"
                        onClick={() => router.back()}
                    >
                        Back
                    </button>
                    <Link href="/" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-black">
                        Home
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
                {levels.map((level) => (
                    <div key={level._id} className="relative border p-2 rounded shadow hover:bg-gray-100 transition-colors">
                        <Link href={`/community/${communityId}/level/${level._id}`} className="text-center block mb-2">
                            <div>
                                {level.name}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default LevelSelector;
