import { database, storage, ID } from "@/libs/AppWriteClient"

const useCreateHost = async (file: File, userId: string, title: string, description: string,categories: string,
price: string, name: string, location: string, revisions: string, shortDesc: string,) => {
    let imageId = Math.random().toString(36).slice(2, 22)

    try {
        await database.createDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID), 
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_HOST), 
            ID.unique(), 
        {
            user_id: userId,
            title: title,
            description: description,
            categories: categories,
            price: price,
            name: name,
            location: location,
            revisions: revisions,
            shortDesc: shortDesc,
            image_url: imageId,
            created_at: new Date().toISOString(),
        });
        await storage.createFile(String(process.env.NEXT_PUBLIC_BUCKET_ID_HOST), imageId, file)
    } catch (error) {
        throw error
    }
}

export default useCreateHost