"use client"
import React, { useState, useEffect } from 'react';
import client, { databases, DATABASE_ID, COLLECTION_ID_HOST } from '@/libs/appwriteConfig';
import Image from 'next/image';
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
    const [host, setHost] = useState<Host | null>(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const hostId = queryParams.get('id');
        if (hostId) {
            getHostDetails(hostId);
        }

        // Cleanup function to ensure proper unmounting
        return () => {
            setHost(null); // Reset host state to null when unmounting
        };
    }, []);

    const getHostDetails = async (hostId: string) => {
        try {
            const response = await databases.getDocument(DATABASE_ID, COLLECTION_ID_HOST, hostId);
            const hostData = mapDocumentToHost(response);
            setHost(hostData);
        } catch (error) {
            console.error('Error fetching host details:', error);
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
            weight: document.weight
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
                <p><strong>Drinker:</strong> {host.drink }</p>
                <p><strong>Interested In:</strong> {host.interestedIn}</p>
                <p><strong>Height:</strong> {host.height} cm</p>
                <p><strong>Weight:</strong> {host.weight} kg</p>
              </div>
              <br />
               <div>
                <button className='p-1 bg-purple-200 text-[white] rounded-full px-2 text-[12px]' style={{backgroundColor:"green"}}> Online</button>
                
                <div id='buttonz'>
                     <button id='btn1'>Message</button>
                     <button>Book Now</button>
                </div>
                </div>

            </div>
            </div>
            
            <div style={{marginTop:"20px"}}>
            <h1><strong>Title:</strong>{host.title}</h1>
            <p><strong>Description:</strong> {host.description}</p>
            </div>
        </div>
    );
};

export default HostDetails;
