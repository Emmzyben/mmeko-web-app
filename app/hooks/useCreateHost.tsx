import { database, storage, ID } from "@/libs/AppWriteClient"

const useCreateHost = async (url: string, userId: string, title: string, description: string,categories: string,
price: Number, name: string, location: string, revisions: string, shortDesc: string,) => {
   
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
            created_at: new Date().toISOString(),
            Image_url: url,
        });
    } catch (error) {
        throw error
    }
}

export default useCreateHost