"use client"
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { databases, DATABASE_ID, COLLECTION_ID_HOST } from '@/libs/appwriteConfig';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import useGetProfileStatusByUserId from '../hooks/useGetProfileStatusByUserId';

// Dynamic imports with no SSR
const CategoryList = dynamic(() => import('../components/CategoryList'), { ssr: false });
const Hero = dynamic(() => import('../components/Hero'), { ssr: false });

const Models = () => {
    const [hosts, setHosts] = useState<any[]>([]);
    const [statuses, setStatuses] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const hostsPerPage = 80;

    useEffect(() => {
        getHosts();
    }, [currentPage]);

    const getHosts = async () => {
        setLoading(true);
        try {
            const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_HOST);
            const allHosts = response.documents;

            // Fetch statuses for all hosts
            const statusPromises = allHosts.map(async (host: any) => {
                const status = await useGetProfileStatusByUserId(host.user_id);
                return { user_id: host.user_id, status };
            });

            const statuses = await Promise.all(statusPromises);
            const statusMap: { [key: string]: string } = {};
            statuses.forEach(({ user_id, status }) => {
                statusMap[user_id] = status || 'offline';
            });
            setStatuses(statusMap);

            // Sort hosts by online status
            allHosts.sort((a, b) => {
                const statusA = statusMap[a.user_id] || 'offline';
                const statusB = statusMap[b.user_id] || 'offline';
                return statusA === 'online' ? -1 : 1;
            });

            // Pagination
            const indexOfLastHost = currentPage * hostsPerPage;
            const indexOfFirstHost = indexOfLastHost - hostsPerPage;
            const currentHosts = allHosts.slice(indexOfFirstHost, indexOfLastHost);

            setHosts(currentHosts);
        } catch (error) {
            console.error('Error fetching hosts or statuses:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div>
                <Hero />
                <CategoryList />
                <div className='mt-5'>
                    {hosts.length > 0 && !loading ? (
                        <h2 className='font-bold text-[22px]'>{hosts[0].title}</h2>
                    ) : null}
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5 '>
                        {loading ? (
                            [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                <div
                                    key={item}
                                    className='w-full h-[300px] bg-dark-5 rounded-lg animate-pulse'
                                ></div>
                            ))
                        ) : (
                            hosts.map((hostItem) => (
                                <Link key={hostItem.$id} href={`/Details?id=${hostItem.$id}`}>
                                    <div className='shadow-md rounded-lg hover:shadow-lg cursor-pointer hover:shadow-primary hover:scale-105 transition-all ease-in-out'>
                                        {hostItem.Image_urls && hostItem.Image_urls.length > 0 && (
                                            <Image
                                                src={hostItem.Image_urls[0]} // Displaying the first image URL
                                                alt={hostItem.categories}
                                                width={500}
                                                height={300}
                                                className='h-[150px] md:h-[180px] rounded-lg'
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
                        )}
                    </div>
                </div>
                <div>
                    <button style={{marginRight:"30px"}} className='rounded-lg text-white mt-3' onClick={() => setCurrentPage(prevPage => prevPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <button className='rounded-lg text-white mt-3' onClick={() => setCurrentPage(prevPage => prevPage + 1)}>
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default Models;
