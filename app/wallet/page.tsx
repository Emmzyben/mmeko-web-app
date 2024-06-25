"use client";

import { useEffect, useState } from "react";
import { database, Query } from "@/libs/AppWriteClient"
import { DATABASE_ID, COLLECTION_ID_PROFILE } from "@/libs/appwriteConfig" 
import { useUser } from "../context/user";
import "../components/style.css";
import Link from 'next/link';

export default function Wallet() {
  const { user } = useUser() ?? { user: null };
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!user) return;
      try {
        const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID_PROFILE, [
          Query.equal('user_id', user.id)
        ]);
        if (response.documents.length > 0) {
          const userProfile = response.documents[0];
          setBalance(userProfile.balance);
        } else {
          throw new Error('User profile not found');
        }
      } catch (err) {
        setError('Failed to fetch balance');
        console.error('Error fetching balance:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div id="display">
        <h2>Balance</h2>
        <h1>{balance !== null ? balance.toFixed(2) : '0.00'} Gold</h1><br />
        
      </div>
      <div id="buttons">
       <Link href={`/buy`}><button>Buy Gold</button></Link> 
        <Link href={`/payout`}><button style={{ backgroundColor: "red" }}>Pay Out</button></Link>
      </div>
      <div id="funds">
        <h2 style={{ color: '#fff' }}>Fund records</h2>
        <hr/>
      </div>
    </div>
  );
}
