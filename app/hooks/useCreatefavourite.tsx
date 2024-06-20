import { database, ID } from "@/libs/AppWriteClient";

const useCreateFavourite = async (userId: string, hostId: string) => {
    try {
        await database.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_COLLECTION_ID_FAVOURITES as string,
            ID.unique(),
            {
                user_id: userId,
                host_id: hostId,
            }
        );
    } catch (error) {
        console.error("Failed to create favourite document:", error);
    }
};

export default useCreateFavourite;
