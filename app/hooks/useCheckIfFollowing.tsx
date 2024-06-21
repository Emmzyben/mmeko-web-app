import { database, ID, Query } from "@/libs/AppWriteClient";

const useCheckIfFollowing = async (followerUserId: string, followedUserId: string) => {
    try {
        const existingFollower = await database.listDocuments(
            process.env.NEXT_PUBLIC_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_COLLECTION_ID_FOLLOWING as string,
            [
                Query.equal('follower_user_id', followerUserId),
                Query.equal('followed_user_id', followedUserId)
            ]
        );

        return existingFollower.documents.length > 0;
    } catch (error) {
        console.error("Failed to check follow status:", error);
        return false; 
    }
};

export default useCheckIfFollowing;
