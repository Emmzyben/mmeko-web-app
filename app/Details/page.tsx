"use client";
import React, { useState, useEffect } from 'react';
import client, { databases, DATABASE_ID, COLLECTION_ID_HOST, COLLECTION_ID_FAVOURITES } from '@/libs/appwriteConfig';
import { useRouter } from "next/navigation";
import { Query } from 'appwrite';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from "../context/user";
import useCreateFavourite from '../hooks/useCreatefavourite';
import useRemoveFavourite from '../hooks/useRemovefavourite';
import "../components/style.css";

interface Host {
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
            const response = await databases.getDocument(DATABASE_ID, COLLECTION_ID_HOST, hostId);
            const hostData = mapDocumentToHost(response);
            setHost(hostData);
        } catch (error) {
            console.error('Error fetching host details:', error);
        }
    };

    const checkIfFavourite = async (userId: string | null, hostId: string) => {
        if (!userId) return;
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID_FAVOURITES,
                [
                    Query.equal('user_id', userId.substring(0, 25)),
                    Query.equal('host_id', hostId.substring(0, 25)),
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
                await useRemoveFavourite(user.id, hostId);
                setIsFavourite(false);
            } catch (error) {
                console.error('Error removing from favorites:', error);
            }
        } else {
            try {
                await useCreateFavourite(user.id, hostId);
                setIsFavourite(true);
            } catch (error) {
                console.error('Error adding to favorites:', error);
            }
        }
    };

    const mapDocumentToHost = (document: any): Host => {
        return {
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
                        <p><strong>Price:</strong> ${host.price}</p>
                        <p><strong>Body Type:</strong> {host.bodyType}</p>
                        <p><strong>Smoker:</strong> {host.smoke}</p>
                        <p><strong>Drinker:</strong> {host.drink}</p>
                        <p><strong>Interested In:</strong> {host.interestedIn}</p>
                        <p><strong>Height:</strong> {host.height} cm</p>
                        <p><strong>Weight:</strong> {host.weight} kg</p>
                    </div>
                    <br />
                    <div>
                        <button className='p-1 bg-purple-200 text-[white] rounded-full px-2 text-[12px]' style={{ backgroundColor: "green" }}> Online</button>
                        <div id='buttonz'>
                            <button id='btn1'>Message</button>
                            <button onClick={toggleFavourite} id='btn1'>{isFavourite ? 'Remove from Favorites' : 'Add to Favorites'}</button>
                        </div>
                        {hostId && (
                            <Link href={`/book?id=${hostId}`}><button id='btn2'>Book Now</button></Link>
                        )}
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
