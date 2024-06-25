"use client"
import React, { useState, useEffect } from 'react';
import client, { databases, DATABASE_ID, COLLECTION_ID_HOST, COLLECTION_ID_FAVOURITES } from '@/libs/appwriteConfig';
import { useRouter } from "next/navigation";
import { Query } from 'appwrite';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from "../context/user";
import useCreateFavourite from '../hooks/useCreatefavourite';
import useRemoveFavourite from '../hooks/useRemovefavourite';
import useGetProfileStatusByUserId from '../hooks/useGetProfileStatusByUserId';
import useBookHost from '../hooks/useBookHost';
import "../components/style.css";

interface Host {
    user_id: string;
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

const HostDetails = () => {
    const { user } = useUser() ?? { user: null };  
    const router = useRouter();
    const [host, setHost] = useState<Host | null>(null);
    const [hostId, setHostId] = useState<string | null>(null);
    const [isFavourite, setIsFavourite] = useState<boolean>(false);
    const [status, setStatus] = useState<string>('offline');
    const { bookHost, loading, error } = useBookHost();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const hostId = queryParams.get('id');
        if (hostId) {
            setHostId(hostId);
            getHostDetails(hostId);
            if (user?.id) {
                checkIfFavourite(user.id, hostId);
            }
        }
    }, [user]);

    const getHostDetails = async (hostId: string) => {
        try {
            console.log('Fetching host details for ID:', hostId);
            const response = await databases.getDocument(DATABASE_ID, COLLECTION_ID_HOST, hostId);
            const hostData = mapDocumentToHost(response);
            setHost(hostData);

            // Fetch status for the host's user_id
            console.log('Fetching profile status for user ID:', response.user_id);
            const hostStatus = await useGetProfileStatusByUserId(response.user_id);
            setStatus(hostStatus || 'offline');
        } catch (error) {
            console.error('Error fetching host details:', error);
        }
    };

    const checkIfFavourite = async (userId: string | null, hostId: string) => {
        if (!userId) return;
        try {
            console.log('Checking if host is a favourite for user ID:', userId);
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID_FAVOURITES,
                [
                    Query.equal('user_id', userId),
                    Query.equal('host_id', hostId),
                ]
            );
            setIsFavourite(response.documents.length > 0);
        } catch (error) {
            console.error('Error checking favourite status:', error);
        }
    };

    const toggleFavourite = async () => {
        if (!user?.id || !hostId) return;

        if (isFavourite) {
            try {
                console.log('Removing from favourites for user ID:', user.id, 'and host ID:', hostId);
                await useRemoveFavourite(user.id, hostId);
                setIsFavourite(false);
            } catch (error) {
                console.error('Error removing from favorites:', error);
            }
        } else {
            try {
                console.log('Adding to favourites for user ID:', user.id, 'and host ID:', hostId);
                await useCreateFavourite(user.id, hostId);
                setIsFavourite(true);
            } catch (error) {
                console.error('Error adding to favorites:', error);
            }
        }
    };

    const handleBookNow = async () => {
        if (host && user?.id) {
            console.log('Booking host with ID:', hostId);
            await bookHost(hostId!, host.name, host.categories, host.price, host.user_id, user.id);
        }
    };

    const mapDocumentToHost = (document: any): Host => {
        return {
            user_id: document.user_id,
            title: document.title,
            Image_url: document.Image_url,
            categories: document.categories,
            name: document.name,
            age: document.age,
            location: document.location,
            description: document.description,
            price: document.price,
            bodyType: document.bodyType,
            smoke: document.smoke,
            drink: document.drink,
            interestedIn: document.interestedIn,
            height: document.height,
            weight: document.weight,
        };
    };

    if (!host) {
        return <div>Loading...</div>;
    }

    return (
        <div id='details'>
            <div id='indetail'>
                <div>
                    {host.Image_url && (
                        <Image
                            src={host.Image_url}
                            alt={host.categories}
                            width={300}
                            height={200}
                            id='image'
                        />
                    )}
                </div>
                <div id='data'>
                    <div>
                        <p><strong>Name:</strong> {host.name}</p>
                        <p><strong>Age:</strong> {host.age}</p>
                        <p><strong>Location:</strong> {host.location}</p>
                        <p><strong>Price:</strong> {host.price} Gold</p>
                        <p><strong>Body Type:</strong> {host.bodyType}</p>
                        <p><strong>Smoker:</strong> {host.smoke}</p>
                        <p><strong>Drinker:</strong> {host.drink}</p>
                        <p><strong>Interested In:</strong> {host.interestedIn}</p>
                        <p><strong>Height:</strong> {host.height}</p>
                        <p><strong>Weight:</strong> {host.weight}</p>
                    </div>
                    <br />
                    <div>
                        <button 
                            className='p-1 bg-purple-200 text-[white] rounded-full px-2 text-[12px]'
                            style={{ backgroundColor: status === 'online' ? "green" : "red" }}
                        >
                            {status === 'online' ? 'Online' : 'Offline'}
                        </button>
                        <div id='buttonz'>
                            <button id='btn1'>Message</button>
                            <button onClick={toggleFavourite} id='btn1'>{isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}</button>
                        </div>
                        {hostId && (
                            <button id='btn2' onClick={handleBookNow} disabled={loading}>
                                {loading ? 'Processing...' : 'Book Now'}
                            </button>
                        )}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>
                </div>
            </div>
            <div style={{ marginTop: "20px" }}>
                <h1><strong>Title:</strong> {host.title}</h1>
                <p><strong>Description:</strong> {host.description}</p>
            </div>
            
        </div>
    );
};

export default HostDetails;
