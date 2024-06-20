import { database, Query } from "@/libs/AppWriteClient";

const useRemoveFavourite = async (userId: string, hostId: string) => {
    try {
        const response = await database.listDocuments(
            process.env.NEXT_PUBLIC_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_COLLECTION_ID_FAVOURITES as string,
            [
                Query.equal('user_id', userId),
                Query.equal('host_id', hostId),
            ]
        );

        const documents = response.documents;
        if (documents.length === 0) {
            console.log("No favourite found to remove.");
            return;
        }

        for (const document of documents) {
            await database.deleteDocument(
                process.env.NEXT_PUBLIC_DATABASE_ID as string,
                process.env.NEXT_PUBLIC_COLLECTION_ID_FAVOURITES as string,
                document.$id
            );
        }
        console.log("Favourite(s) removed successfully!");
    } catch (error) {
        console.error("Failed to remove favourite document(s):", error);
    }
};

export default useRemoveFavourite;
