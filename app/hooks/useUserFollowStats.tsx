import { useEffect, useState } from 'react';
import { database, Query } from '@/libs/AppWriteClient';

const useUserFollowStats = (userId: string) => {
    const [followersCount, setFollowersCount] = useState<number>(0);
    const [followingCount, setFollowingCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchFollowStats = async () => {
            try {
                const followers = await database.listDocuments(
                    process.env.NEXT_PUBLIC_DATABASE_ID as string,
                    process.env.NEXT_PUBLIC_COLLECTION_ID_FOLLOWING as string,
                    [
                        Query.equal('followed_user_id', userId)
                    ]
                );

                const following = await database.listDocuments(
                    process.env.NEXT_PUBLIC_DATABASE_ID as string,
                    process.env.NEXT_PUBLIC_COLLECTION_ID_FOLLOWING as string,
                    [
                        Query.equal('follower_user_id', userId)
                    ]
                );

                setFollowersCount(followers.total);
                setFollowingCount(following.total);
            } catch (error) {
                console.error("Failed to fetch follow stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowStats();
    }, [userId]);

    return { followersCount, followingCount, loading };
};

export default useUserFollowStats;
