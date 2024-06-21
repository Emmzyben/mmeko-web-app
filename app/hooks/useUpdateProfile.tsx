import { database } from "@/libs/AppWriteClient";
const DATABASE_ID = '6647001200115f436fbf';
const COLLECTION_ID_PROFILE = '66470137001632d54f1d';

const useUpdateProfile = async (id: string, ...data: { [key: string]: any }[]) => {
  try {
    await database.updateDocument(
      DATABASE_ID,
      COLLECTION_ID_PROFILE,
      id,
      ...data
    );
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw error;
  }
};

export default useUpdateProfile;
