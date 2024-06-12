"use client"

import React, { useState, useEffect, Suspense } from 'react';
import client, { databases, DATABASE_ID, COLLECTION_ID_HOST } from '@/libs/appwriteConfig';
import { ID, Query, Permission, Role } from 'appwrite';
import CategoryList from '../components/CategoryList';
import Hero from '../components/Hero';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import useCreateHostBucketUrl from '../hooks/useCreateHostBucketUrl';

const Models = () => {
    const [host, setHost] = useState<any>([]);

    useEffect(() => {
        getHost();
    }, []);

    const getHost = async () => {
        try {
            const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_HOST);
            console.log('RESPONSE:', response);
            setHost(response.documents);
        } catch (error) {
            console.error('Error fetching hosts:', error);
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
                    {host.length > 0 ? (
                        <h2 className='font-bold text-[22px]'>{host[0].title}</h2>
                    ) : null}
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5 '>
                        {host.length > 0 ? (
                            host.map(host => (
                                <div
                                    key={host.$id}
                                    className='shadow-md rounded-lg hover:shadow-lg cursor-pointer hover:shadow-primary hover:scale-105 transition-all ease-in-out'
                                >
                                    {host.Image_url && (
                                        <Image
                                            src={host.Image_url}
                                            alt={host.categories}
                                            width={500}
                                            height={300}
                                            className='h-[170px] md:h-[200px]  rounded-lg'
                                        />
                                    )}
                                    <div className='flex flex-col items-baseline p-3 gap-1'>
                                        <h2 className='p-1 bg-purple-200 text-light-orange rounded-full px-2 text-[12px]'>
                                            {host.categories}
                                        </h2>
                                        <h2 className='font-bold text-light-orange text-lg'>{host.categories}</h2>
                                        <h2 className='text-light-orange'>{host.name}</h2>
                                        <h2 className='text-gray-500 text-light-orange text-sm'>{host.location}</h2>
                                        <Button className='rounded-lg text-white mt-3 bg-light-orange'>Book Now</Button>
                                    </div>
                                    </div>
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
