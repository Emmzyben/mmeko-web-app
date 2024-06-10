"use client"

import React, {useState, useEffect, Suspense} from 'react'
import client, { databases, DATABASE_ID, COLLECTION_ID_HOST} from '@/libs/appwriteConfig'
import { ID, Query, Permission, Role} from 'appwrite';
import CategoryList from '../components/CategoryList';
import Hero from '../components/Hero';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import useCreateHostBucketUrl from '../hooks/useCreateHostBucketUrl';

const MyCrush = () => {
    const [messageBody, setMessageBody] = useState('')
    const [host, setHost] = useState<any>([])


    useEffect(() => {
        getHost()
    }, [])

    const getHost = async () => {
      const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID_HOST)
          console.log('RESPONSE:', response)
          setHost(response.documents)
         
  }

      
    return (
      <>
    <div>
    <h1 className='font-bold text-light-orange text-center' style={{fontSize:'30px'}}>My Favourites</h1>
    
    
      </div>
      </>
    )
  }

  export default  MyCrush