// useUpdateProfile.tsx

import { database } from "@/libs/AppWriteClient";

const useUpdateProfile = async (documentId: string, data: { [key: string]: any }) => {
  try {
    const databaseId = "6647001200115f436fbf";
    const collectionId = "66470137001632d54f1d";

    if (!databaseId || !collectionId) {
      throw new Error("Database or Collection ID is missing");
    }

    await database.updateDocument(databaseId, collectionId, documentId, data);
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw error;
  }
};

export default useUpdateProfile;
