import { database, Query } from "@/libs/AppWriteClient";

const useGetHostsByUserId = async (userId: string) => {
    try {
        const response = await database.listDocuments(
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_HOST),
            [
                Query.equal('user_id', userId)
            ]
        );
        
        const documents = response.documents;
        const hosts = documents.map(doc => {
            return {
                id: doc?.$id,
                userId: doc?.user_id,
                title: doc?.title,
                description: doc?.description,
                category: doc?.categories,
                price: doc?.price,
                name: doc?.name,
                location: doc?.location,
                age:doc?.age, 
                bodyType:doc?.bodyType,
                smoke:doc?.smoke,
                drink:doc?.drink,
                interestedIn:doc?.interestedIn,
                height:doc?.height ,
                 weight:doc?.weight,
                 status:doc?.status,
                created_at: doc?.created_at,
                imageUrl: doc?.Image_url 
            };
        });

        return hosts;
    } catch (error) {
        throw error;
    }
};

export default useGetHostsByUserId;
