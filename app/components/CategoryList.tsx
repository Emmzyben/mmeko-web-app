"use client"
import { categoryList } from "@/constants/categories";
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'

function CategoryList() {

    const searchParams = useSearchParams()
    const search = searchParams.get('filter')
    const pathname = usePathname()

    const creatQueryString = useCallback(
        (label: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())

            params.set(label, value)

            return params.toString()
        }, [searchParams]
        
    )

  return (
    <div className='mx-4 md:mx-22 lg:mx-52 grid grid-cols-3
    md:grid-cols-4 lg:grid-cols-6 gap-4'>
        {categoryList.length>0?categoryList.map((item)=>(
            <Link key={item.id} href={
                pathname  + "?" + creatQueryString("filter", item.label)
            } 
            className={cn(
                search === item.label ? "border-b-2 border-red-1 pb-2 flex-shrink-0"
                 : "opacity-70 flex-shrink-0",
                  "flex flex-col gap-y-3 items-center  "
            )}>
            <div className={`flex flex-col items-center
             justify-center gap-2
             bg-purple-50 p-5 rounded-lg
             cursor-pointer hover:scale-110 transition-all ease-in-out
             `}>
                
                <Image src={item.imgURL}
                alt='category image'
                width={35}
                height={35}
                />
                </div>
                <p className='text-light-orange'>{item.label}</p>
            </Link>
        )):
            [1,2,3,4,5,6].map((item,index)=>(
                <div key={index} className='h-[120px]
                w-full bg-dark-5 animate-pulse
                rounded-lg'>

                </div>
            ))
        }
    </div>
  )
}

export default CategoryList