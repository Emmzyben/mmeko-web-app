import { database, Query } from "@/libs/AppWriteClient";

// Function to get all favourite documents for a specific user
const getFavouritesForUser = async (userId: string) => {
    try {
        const response = await database.listDocuments(
            process.env.NEXT_PUBLIC_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_COLLECTION_ID_FAVOURITES as string,
            [Query.equal('user_id', userId.substring(0, 10))]
        );
        console.log("Favourite documents for user:", response.documents);
        return response.documents;
    } catch (error) {
        console.error("Failed to get favourite documents:", error);
        return [];
    }
};

// Function to get host details based on host IDs
const getHostsByHostIds = async (hostIds: string[]) => {
    try {
        const hostPromises = hostIds.map(hostId =>
            database.getDocument(
                process.env.NEXT_PUBLIC_DATABASE_ID as string,
                process.env.NEXT_PUBLIC_COLLECTION_ID_HOST as string,
                hostId
            )
        );
        const hosts = await Promise.all(hostPromises);
        const mappedHosts = hosts.map(host => ({
            id: host.$id,
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
        console.log("Host details:", mappedHosts);
        return mappedHosts;
    } catch (error) {
        console.error("Failed to get host details:", error);
        return [];
    }
};

// Main function to get favourite hosts for a specific user
const getFavouriteHostsForUser = async (userId: string) => {
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
