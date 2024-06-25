import { useState } from 'react';
import { database, Query } from "@/libs/AppWriteClient"
import { ID } from 'appwrite';
import { useRouter } from "next/navigation";
import { DATABASE_ID, COLLECTION_ID_BOOKINGS, COLLECTION_ID_PROFILE } from '@/libs/appwriteConfig';

const useBookHost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const bookHost = async (hostId: string, hostName: string, category: string, price: number, hostUserId: string, userId: string) => {
        setLoading(true);
        setError(null);

        try {
            const profilesResponse = await database.listDocuments(DATABASE_ID, COLLECTION_ID_PROFILE);
            const profiles = profilesResponse.documents;

         
            const user = profiles.find(profile => profile.user_id === userId);
            const host = profiles.find(profile => profile.user_id === hostUserId);

            if (!user || !host) {
                throw new Error('User or host profile not found');
            }

          
            if (user.balance < price) {
                throw new Error('Insufficient balance to book host');
            }

        
            const bookingId = ID.unique();
            const bookingData = {
                hostId,
                host_name: hostName,
                category,
                price,
                host_user_id: hostUserId,
                user_id: userId,
            };
            await database.createDocument(DATABASE_ID, COLLECTION_ID_BOOKINGS, bookingId, bookingData);

           
            const userNewBalance = user.balance - price;
            const hostNewBalance = Math.floor(host.balance + (price * 0.7)); 

        
            await database.updateDocument(DATABASE_ID, COLLECTION_ID_PROFILE, user.$id, {
                balance: userNewBalance,
            });
            console.log('User balance updated');

            console.log('Updating host balance for ID:', host.$id);
            console.log('New host balance:', hostNewBalance);
            await database.updateDocument(DATABASE_ID, COLLECTION_ID_PROFILE, host.$id, {
                balance: hostNewBalance,
            });
            console.log('Host balance updated');

          
            router.push(`/confirmation?bookingId=${bookingId}`);
        } catch (err) {
            const errorMessage = (err as Error).message;
            setError(errorMessage);
            console.error('Error booking host:', err);
        } finally {
            setLoading(false);
        }
    };

    return { bookHost, loading, error };
};

export default useBookHost;
