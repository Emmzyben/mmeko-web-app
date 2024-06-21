import { database, Query } from "@/libs/AppWriteClient";

const useUnfollow = async (followerUserId: string, followedUserId: string) => {
    try {
        // Construct a query to find the document with both follower_user_id and followed_user_id
        const query = [
            Query.equal('follower_user_id', followerUserId),
            Query.equal('followed_user_id', followedUserId)
        ];

        // Search for the document based on the query
        const existingDocuments = await database.listDocuments(
            process.env.NEXT_PUBLIC_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_COLLECTION_ID_FOLLOWING as string,
            query
        );

        // Check if any matching document found
        if (existingDocuments.documents.length === 0) {
            // Document not found, handle gracefully
            console.warn("Document not found:", existingDocuments);
            return true; // Treat as successful unfollow
        }

        // Delete the found document
        await database.deleteDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_COLLECTION_ID_FOLLOWING as string,
            existingDocuments.documents[0].$id // Assuming you have the document ID in the $id property
        );

        return true; // Unfollow successful
    } catch (error) {
        console.error("Failed to unfollow:", error);
        return false; // Unfollow failed
    }
};

export default useUnfollow;
