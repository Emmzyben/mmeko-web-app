import { database, storage, ID } from "@/libs/AppWriteClient";

const useCreateHost = async (
  urls: string[],
  userId: string,
  title: string,
  description: string,
  categories: string,
  price: number,
  name: string,
  location: string,
  age: number,
  bodyType: string,
  smoke: string,
  drink: string,
  interestedIn: string,
  height: string,
  weight: string,
  duration: string
): Promise<void> => {
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
        age: age,
        bodyType: bodyType,
        smoke: smoke,
        drink: drink,
        interestedIn: interestedIn,
        height: height,
        weight: weight,
        Duration: duration,
        created_at: new Date().toISOString(),
        Image_urls: urls, // Changed from Image_url to Image_urls
      }
    );
  } catch (error) {
    throw error;
  }
};

export default useCreateHost;
