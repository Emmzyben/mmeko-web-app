import { database, Query } from "@/libs/AppWriteClient";

interface Host {
    id: string;
    user_id:string;
    title: string;
    Image_url: string;
    categories: string;
    name: string;
    age: number;
    location: string;
    description: string;
    price: number;
    bodyType: string;
    smoke: boolean;
    drink: boolean;
    interestedIn: string[];
    height: number;
    weight: number;
}

// Function to get all favourite documents for a specific user
const getFavouritesForUser = async (userId: string) => {
    try {
        console.log("Fetching favourite documents for user ID:", userId);
        const response = await database.listDocuments(
            process.env.NEXT_PUBLIC_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_COLLECTION_ID_FAVOURITES as string,
            [Query.equal('user_id', userId)]
        );
        console.log("Favourite documents response:", response);
        return response.documents;
    } catch (error) {
        console.error("Failed to get favourite documents:", error);
        return [];
    }
};

// Function to get host details based on host IDs
const getHostsByHostIds = async (hostIds: string[]): Promise<Host[]> => {
    try {
        console.log("Fetching host details for host IDs:", hostIds);
        const hostPromises = hostIds.map(hostId =>
            database.getDocument(
                process.env.NEXT_PUBLIC_DATABASE_ID as string,
                process.env.NEXT_PUBLIC_COLLECTION_ID_HOST as string,
                hostId
            )
        );
        const hosts = await Promise.all(hostPromises);
        const mappedHosts: Host[] = hosts.map(host => ({
            id: host.$id,
            user_id:host.user_id,
            title: host.title,
            Image_url: host.Image_url,
            categories: host.categories,
            name: host.name,
            age: host.age,
            location: host.location,
            description: host.description,
            price: host.price,
            bodyType: host.bodyType,
            smoke: host.smoke,
            drink: host.drink,
            interestedIn: host.interestedIn,
            height: host.height,
            weight: host.weight,
        }));
        console.log("Mapped host details:", mappedHosts);
        return mappedHosts;
    } catch (error) {
        console.error("Failed to get host details:", error);
        return [];
    }
};

// Main function to get favourite hosts for a specific user
const getFavouriteHostsForUser = async (userId: string): Promise<Host[]> => {
    try {
        // Get all favourite documents for the user
        const favouriteDocuments = await getFavouritesForUser(userId);

        // Extract host IDs from the favourite documents
        const hostIds = favouriteDocuments.map(doc => doc.host_id);
        console.log("Extracted host IDs:", hostIds);

        // Get host details based on host IDs
        const favouriteHosts = await getHostsByHostIds(hostIds);

        return favouriteHosts;
    } catch (error) {
        console.error("Failed to get favourite hosts for user:", error);
        return [];
    }
};

export default getFavouriteHostsForUser;
