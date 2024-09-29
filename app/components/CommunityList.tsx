"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Community {
    _id: string;            // Community ID
    name: string;           // Community name
}

const CommunityList = () => {
    const [communities, setCommunities] = useState<Community[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/community`);
                if (!res.ok) throw new Error('Failed to fetch communities');
                const data = await res.json();
                setCommunities(data);
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCommunities();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto">
            {/* <h1 className="text-2xl font-bold text-center my-4">Communities</h1> */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
                {communities.map((community) => (
                    <div key={community._id} className="border p-4 rounded shadow text-center hover:bg-gray-100">
                        <Link href={`/community/${community._id}`} className="text-lg font-bold text-gray-500 hover:text-black ">
                            <div>
                                {community.name}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>  
        </div>
    );
};

export default CommunityList;
