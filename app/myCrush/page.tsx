"use client"
import React, { useState, useEffect } from 'react';
import { useUser } from "../context/user";
import getFavouriteHostsForUser from '../hooks/getFavouritesForUser';
import Image from 'next/image';
import Link from 'next/link';
import useGetProfileStatusByUserId from '../hooks/useGetProfileStatusByUserId';
import "../components/style.css";

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

const FavouriteHosts = () => {
    const { user } = useUser() ?? { user: null };
    const [favouriteHosts, setFavouriteHosts] = useState<Host[]>([]);
    const [statuses, setStatuses] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchFavouriteHosts = async () => {
            if (user?.id) {
                const hosts = await getFavouriteHostsForUser(user.id);
                setFavouriteHosts(hosts);
                
                // Fetch and set statuses for each host
                const statusMap: { [key: string]: string } = {};
                for (const host of hosts) {
                    try {
                        const status = await useGetProfileStatusByUserId(host.user_id);
                        statusMap[host.user_id] = status || 'offline';
                    } catch (error) {
                        console.error(`Error fetching status for host ${host.id}:`, error);
                        statusMap[host.user_id] = 'offline'; // Set status to offline in case of error
                    }
                }
                setStatuses(statusMap);
            }
        };
        
        fetchFavouriteHosts();
    }, [user]);

    if (!user) {
        return <div>Please log in to see your favourite hosts.</div>;
    }

    return (
        <div className='mt-5'>
            <h1 className='font-bold text-[22px] text-light-orange'>My Crush List</h1>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5'>
                {favouriteHosts.length > 0 ? (
                    favouriteHosts.map((hostItem) => (
                        <Link key={hostItem.id} href={`/Details?id=${hostItem.id}`}>
                            <div className='shadow-md rounded-lg hover:shadow-lg cursor-pointer hover:shadow-primary hover:scale-105 transition-all ease-in-out'>
                                {hostItem.Image_url && (
                                    <Image
                                        src={hostItem.Image_url}
                                        alt={hostItem.categories}
                                        width={500}
                                        height={300}
                                        className='h-[170px] md:h-[200px] rounded-lg'
                                    />
                                )}
                                <div className='flex flex-col items-baseline p-3 gap-1'>
                                    <button 
                                        className='p-1 text-[white] rounded-full px-2 text-[12px]' 
                                        style={{ backgroundColor: statuses[hostItem.user_id] === 'online' ? "green" : "red" }}
                                    >
                                        {statuses[hostItem.user_id] === 'online' ? 'Online' : 'Offline'}
                                    </button>
                                    <h2 className='font-bold text-light-orange text-lg'>{hostItem.categories}</h2>
                                    <h2 className='text-light-orange'>{hostItem.name}</h2>
                                    <h2 className='text-light-orange'>{hostItem.age}</h2>
                                    <h2 className='text-gray-500 text-light-orange text-sm'>{hostItem.location}</h2>
                                    <button className='rounded-lg text-white mt-3 bg-light-orange'>Book Now</button>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                        <div
                            key={index}
                            className='w-full h-[300px] bg-dark-5 rounded-lg animate-pulse'
                        ></div>
                    ))
                )}
            </div>
        </div>
    );
};

export default FavouriteHosts;
