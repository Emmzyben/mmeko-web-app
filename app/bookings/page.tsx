"use client";

import React, { useState, useEffect } from 'react';
import { databases, DATABASE_ID, COLLECTION_ID_BOOKINGS } from '@/libs/appwriteConfig';
import { Query } from 'appwrite';
import { useUser } from '../context/user';
import '../components/style.css';

const Bookings = () => {
    const { user } = useUser() ?? { user: null };
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            getBookings();
        } else {
            setLoading(false);
        }
    }, [user]);

    const getBookings = async () => {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID_BOOKINGS,
                [
                    Query.equal('user_id', user.id)
                ]
            );
            setBookings(response.documents);
        } catch (err) {
            setError('Failed to fetch bookings');
            console.error('Error fetching bookings:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3 className='font-bold text-light-orange text-center' style={{ fontSize: '17px' }}>My Bookings</h3>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : !user ? (
                <div>Please log in to see your bookings.</div>
            ) : bookings.length === 0 ? (
                <div>No bookings found.</div>
            ) : (
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Model Name</th>
                            <th className="py-2 px-4 border-b">Category</th>
                            <th className="py-2 px-4 border-b">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.$id}>
                                <td className="py-2 px-4 border-b">{booking.host_name}</td>
                                <td className="py-2 px-4 border-b">{booking.category}</td>
                                <td className="py-2 px-4 border-b">${booking.price.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Bookings;
