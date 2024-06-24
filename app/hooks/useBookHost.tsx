import { useState } from 'react';
import { databases, DATABASE_ID, COLLECTION_ID_BOOKINGS, COLLECTION_ID_PROFILE } from '@/libs/appwriteConfig';
import { ID } from 'appwrite';
import { useRouter } from "next/navigation";

const useBookHost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const bookHost = async (hostId: string, userId: string, hostUserId: string, name: string, category: string, price: number) => {
        setLoading(true);
        setError(null);
        
        try {
            // Create booking
            await databases.createDocument(DATABASE_ID, COLLECTION_ID_BOOKINGS, ID.unique(), {
                hostId,
                userId,
                hostUserId,
                name,
                category,
                price,
            });

            // Get user and host profiles
            const userProfile = await databases.getDocument(DATABASE_ID, COLLECTION_ID_PROFILE, userId);
            const hostProfile = await databases.getDocument(DATABASE_ID, COLLECTION_ID_PROFILE, hostUserId);

            // Calculate new balances
            const userNewBalance = userProfile.balance - price;
            const hostNewBalance = hostProfile.balance + (price * 0.7);

            // Update balances
            await databases.updateDocument(DATABASE_ID, COLLECTION_ID_PROFILE, userId, {
                balance: userNewBalance,
            });
            await databases.updateDocument(DATABASE_ID, COLLECTION_ID_PROFILE, hostUserId, {
                balance: hostNewBalance,
            });

            // Redirect to booking confirmation page or show success message
            router.push(`/confirmation?bookingId=${ID.unique()}`);
        } catch (err) {
            setError('An error occurred while booking the host. Please try again.');
            console.error('Error booking host:', err);
        } finally {
            setLoading(false);
        }
    };

    return { bookHost, loading, error };
};

export default useBookHost;
