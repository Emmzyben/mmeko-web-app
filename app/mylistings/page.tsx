"use client"
import React, { useState, useEffect } from 'react';
import useGetHostsByUserId from "../hooks/useGetHostsByUserId";
import { useUser } from "../context/user";
import { Button } from '@/components/ui/button';
import "../components/style.css";
interface Host {
    id: string;
    category: string;
    title: string;
    price: number;
    status: string;
}

const MyListings = () => {
    const { user } = useUser() ?? { user: null }; 
    const [userHosts, setUserHosts] = useState<Host[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHosts = async () => {
            if (user) { 
                try {
                    setLoading(true);
                    const hosts = await useGetHostsByUserId(user.id); 
                    setUserHosts(hosts);
                    setError(null);
                } catch (error) {
                    console.error('Error fetching user hosts:', error);
                    setError('Failed to fetch listings.');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        fetchHosts();
    }, [user]);

    if (loading) {
        return <div className='text-gray-500'>Loading...</div>;
    }

    if (error) {
        return <div className='text-red-500'>{error}</div>;
    }

    return (
        <div>
            <h1 className='text-2xl font-bold text-light-orange mb-5'>My Listings</h1>
            {userHosts.length > 0 ? (
             <div style={{overflow:"auto"}}>  
             <table className='min-w-full divide-y divide-gray-200' id='table'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='  text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Category</th>
                            <th className='  text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Title</th>
                            <th className='  text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Price</th>
                            <th className='  text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                            <th className='  text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {userHosts.map((host) => (
                            <tr key={host.id}>
                                <td className='  whitespace-nowrap'>{host.category}</td>
                                <td className='  whitespace-nowrap'>{host.title}</td>
                                <td className='  whitespace-nowrap'>{host.price}</td>
                                <td className='  whitespace-nowrap'>{host.status}</td>
                                <td className='  whitespace-nowrap'>
                                    <Button className='rounded-lg text-white bg-light-orange'>...</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table></div> 
            ) : (
                <div className='text-gray-500'>You have no listings.</div>
            )}
        </div>
    );
};

export default MyListings;
