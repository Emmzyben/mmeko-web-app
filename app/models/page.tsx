"use client"
import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { databases, DATABASE_ID, COLLECTION_ID_HOST } from '@/libs/appwriteConfig';
import { Query } from 'appwrite';
import CategoryList from '../components/CategoryList';
import Hero from '../components/Hero';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import useCreateHostBucketUrl from '../hooks/useCreateHostBucketUrl';
import useGetProfileStatusByUserId from '../hooks/useGetProfileStatusByUserId';

const Models = () => {
    const [hosts, setHosts] = useState<any[]>([]);
    const [statuses, setStatuses] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        getHosts();
    }, []);

    const getHosts = async () => {
        try {
            const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_HOST);
            setHosts(response.documents);

            // Fetch statuses for all hosts
            const statusPromises = response.documents.map(async (host: any) => {
                const status = await useGetProfileStatusByUserId(host.user_id);
                return { user_id: host.user_id, status };
            });

            const statuses = await Promise.all(statusPromises);
            const statusMap: { [key: string]: string } = {};
            statuses.forEach(({ user_id, status }) => {
                statusMap[user_id] = status || 'offline';
            });
            setStatuses(statusMap);
        } catch (error) {
            console.error('Error fetching hosts or statuses:', error);
        }
    };

    return (
        <>
            <div>
                <Hero />
                <Suspense fallback={<div>Loading categories...</div>}>
                    <CategoryList />
                </Suspense>
                <div className='mt-5'>
                    {hosts.length > 0 ? (
                        <h2 className='font-bold text-[22px]'>{hosts[0].title}</h2>
                    ) : null}
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5 '>
                        {hosts.length > 0 ? (
                            hosts.map((hostItem) => (
                                <Link key={hostItem.$id} href={`/Details?id=${hostItem.$id}`}>
                                    <div className='shadow-md rounded-lg hover:shadow-lg cursor-pointer hover:shadow-primary hover:scale-105 transition-all ease-in-out'>
                                        {hostItem.Image_url && (
                                            <Image
                                                src={hostItem.Image_url}
                                                alt={hostItem.categories}
                                                width={500}
                                                height={300}
                                                className='h-[170px] md:h-[200px]  rounded-lg'
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
                                            <Button className='rounded-lg text-white mt-3 bg-light-orange'>Book Now</Button>
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
            </div>
        </>
    );
};

export default Models;
