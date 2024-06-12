"use client"
import React, { useState, useEffect } from 'react';
import useGetHostsByUserId from "../hooks/useGetHostsByUserId";
import { useUser } from "../context/user";
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface Host {
    id: string;
    category: string;
    title: string;
    name: string;
    location: string;
    imageUrl: string;
}

const MyListings = () => {
    const { user } = useUser() ?? { user: null }; // Use the useUser hook to get the user data
    const [userHosts, setUserHosts] = useState<Host[]>([]);

    useEffect(() => {
        const fetchHosts = async () => {
            if (user) { // Check if the user is available
                try {
                    const hosts = await useGetHostsByUserId(user.id); // Use user.id to fetch hosts
                    setUserHosts(hosts);
                } catch (error) {
                    console.error('Error fetching user hosts:', error);
                }
            }
        };
        fetchHosts();
    }, [user]);

    return (
        <div>
            <h1 className='text-2xl font-bold text-light-orange'>My Listings</h1>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5'>
                {userHosts.length > 0 ? (
                    userHosts.map((host) => (
                        <div
                            key={host.id}
                            className='shadow-md rounded-lg hover:shadow-lg cursor-pointer hover:shadow-primary hover:scale-105 transition-all ease-in-out'
                        >
                            {host.imageUrl && (
                                <Image
                                    src={host.imageUrl}
                                    alt={host.category}
                                    width={500}
                                    height={300}
                                    className='h-[170px] md:h-[200px]  rounded-lg'
                                />
                            )}
                            <div className='flex flex-col items-baseline p-3 gap-1'>
                                <h2 className='p-1 bg-purple-200 text-light-orange rounded-full px-2 text-[12px]'>
                                    {host.category}
                                </h2>
                                <h2 className='font-bold text-light-orange text-lg'>{host.title}</h2>
                                <h2 className='text-light-orange'>{host.name}</h2>
                                <h2 className='text-gray-500 text-light-orange text-sm'>{host.location}</h2>
                                <Button className='rounded-lg text-white mt-3 bg-light-orange'>Details</Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-gray-500'>You have no listings.</div>
                )}
            </div>
        </div>
    );
};

export default MyListings;
