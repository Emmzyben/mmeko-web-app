"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useUser } from "../context/user";
import getFavouriteHostsForUser from '../hooks/getFavouritesForUser';
import Image from 'next/image';
import Link from 'next/link';
import useGetProfileStatusByUserId from '../hooks/useGetProfileStatusByUserId';
import "../components/style.css";

interface Host {
    id: string;
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

const FavouriteHosts = () => {
    const { user } = useUser() ?? { user: null };
    const [favouriteHosts, setFavouriteHosts] = useState<Host[]>([]);
    const [statuses, setStatuses] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const hostsPerPage = 16;

    const fetchFavouriteHosts = useCallback(async () => {
        if (user?.id) {
            setLoading(true);
            try {
                const hosts = await getFavouriteHostsForUser(user.id);
                const statusPromises = hosts.map(async (host) => {
                    const status = await useGetProfileStatusByUserId(host.user_id);
                    return { ...host, status: status || 'offline' };
                });
                const hostsWithStatus = await Promise.all(statusPromises);
                hostsWithStatus.sort((a, b) => (a.status === 'online' ? -1 : 1));
                setFavouriteHosts(hostsWithStatus);

                const statusMap: { [key: string]: string } = {};
                hostsWithStatus.forEach(({ user_id, status }) => {
                    statusMap[user_id] = status;
                });
                setStatuses(statusMap);
            } catch (error) {
                console.error('Error fetching favourite hosts:', error);
            } finally {
                setLoading(false);
            }
        }
    }, [user]);

    useEffect(() => {
        fetchFavouriteHosts();
    }, [fetchFavouriteHosts]);

    const indexOfLastHost = currentPage * hostsPerPage;
    const indexOfFirstHost = indexOfLastHost - hostsPerPage;
    const currentHosts = favouriteHosts.slice(indexOfFirstHost, indexOfLastHost);

    const paginateNext = () => {
        if (currentPage < Math.ceil(favouriteHosts.length / hostsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const paginatePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (!user) {
        return <div>Please log in to see your favourite hosts.</div>;
    }

    return (
        <div className='mt-5'>
            <h1 className='font-bold text-[22px] text-light-orange'>My Crush List</h1>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5'>
                {loading ? (
                    [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                        <div
                            key={item}
                            className='w-full h-[300px] bg-dark-5 rounded-lg animate-pulse text-white'
                        ></div>
                    ))
                ) : (
                    currentHosts.length > 0 ? (
                        currentHosts.map((hostItem, index) => (
                            <Link key={index} href={`/Details?id=${hostItem.id}`}>
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
                                        <button style={{padding:"10px"}} className='rounded-lg text-white mt-3 bg-light-orange'>Book Now</button>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div>No favourites found.</div>
                    )
                )}
            </div>
            <div className="mt-5 flex justify-left gap-2">
                <button
                    onClick={paginatePrevious}
                    disabled={currentPage === 1}
                    className='px-4 py-2 text-white rounded disabled:opacity-50'
                >
                    Previous
                </button>
                <button
                    onClick={paginateNext}
                    disabled={currentPage === Math.ceil(favouriteHosts.length / hostsPerPage)}
                    className='px-4 py-2 text-white rounded disabled:opacity-50'
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default FavouriteHosts;
