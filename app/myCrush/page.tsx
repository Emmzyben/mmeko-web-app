"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from "../context/user";
import getFavouriteHostsForUser from '../hooks/getFavouritesForUser';
import Image from 'next/image';
import Link from 'next/link';
import "../components/style.css";

interface Host {
    id: string;
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

    useEffect(() => {
        const fetchFavouriteHosts = async () => {
            if (user?.id) {
                console.log("Fetching favourite hosts for user ID:", user.id);
                const hosts = await getFavouriteHostsForUser(user.id);
                console.log("Fetched hosts:", hosts);
                setFavouriteHosts(hosts);
            }
        };
        fetchFavouriteHosts();
    }, [user]);

    if (!user) {
        return <div>Please log in to see your favourite hosts.</div>;
    }

    if (favouriteHosts.length === 0) {
        return <div>No favourite hosts found.</div>;
    }

    return (
        <div>
            <h1>Your Favourite Hosts</h1>
            <div>
                {favouriteHosts.map((host, index) => (
                    <div key={index} className="host-card">
                        {host.Image_url && (
                            <Image
                                src={host.Image_url}
                                alt={host.categories}
                                width={300}
                                height={200}
                            />
                        )}
                        <h2>{host.name}</h2>
                        <p>{host.description}</p>
                        <Link href={`/host?id=${host.id}`}>
                            <button>View Details</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavouriteHosts;
