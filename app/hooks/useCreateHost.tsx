import { database, storage, ID } from "@/libs/AppWriteClient"

const useCreateHost = async (url: string, userId: string, title: string, description: string,categories: string,
price: Number, name: string, location: string, age:Number, bodyType:string, smoke:string, drink:string, interestedIn:string, height:string, weight:string) => {
   
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
            age:age, 
            bodyType:bodyType,
            smoke:smoke,
            drink:drink,
            interestedIn:interestedIn,
            height:height ,
             weight:weight,
            created_at: new Date().toISOString(),
            Image_url: url,
        });
    } catch (error) {
        throw error
    }
}

export default useCreateHost