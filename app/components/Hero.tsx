
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'

function Hero() {
  return (
    <div className='flex items-center gap-3 flex-col justify-center pt-14 pb-7'>
        <h2 className='font-bold text-light-1 text-[46px] text-center'>
            Find & Book 
            <span className='text-light-orange'> Appointment with your Fav Models</span>
            <br></br> Near You</h2>
        <h2 className='text-xl text-gray-400'>Explore now</h2>
        <div className='mt-4 flex text-zinc gap-4 items-center'>
            <Input placeholder='Search'
            className="rounded-full bg-dark-5 border-dark-5 md:w-[350px]" />
            <Button className="rounded-full bg-light-orange text-dark-1 h-[46px]">
                <Search className='h-4 w-4'/>
            </Button>
        </div>
    </div>
  )
}

export default Hero