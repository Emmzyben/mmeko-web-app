import { database, ID } from "@/libs/AppWriteClient";

const useCreateFollower = async (followerUserId: string, followedUserId: string) => {
    try {
        await database.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_COLLECTION_ID_FOLLOWING as string,
            ID.unique(),
            {
                follower_user_id: followerUserId,
                followed_user_id: followedUserId,
            }
        );
    } catch (error) {
        console.error("Failed to create follower document:", error);
    }
};

export default useCreateFollower;
