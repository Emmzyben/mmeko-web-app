import { database, Query } from "@/libs/AppWriteClient"
import { DATABASE_ID, COLLECTION_ID_PROFILE } from "@/libs/appwriteConfig" 

const useGetProfileStatusByUserId = async (userId: string) => {
  try {
    const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID_PROFILE, [
      Query.equal('user_id', userId)  
    ]);

    if (response.documents.length > 0) {
      return response.documents[0].Status;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch profile status:", error);
    throw error;
  }
};

export default useGetProfileStatusByUserId;
