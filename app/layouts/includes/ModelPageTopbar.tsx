import { useUser } from "@/app/context/user";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import { useGeneralStore } from "@/app/stores/general";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { LuLayoutList } from "react-icons/lu";

export default function ModelPageTopbar() {

    const userContext = useUser()
    const router = useRouter()
    

    let [showMenu, setShowMenu] = useState<boolean>(false)
    let { setIsLoginOpen, setIsEditProfileOpen } = useGeneralStore()

    useEffect(() => { setIsEditProfileOpen(false) }, [])

    

    const goTo = () => {
        if (!userContext?.user) return setIsLoginOpen(true)
        router.push('/upload')
    }

    
  return (
    <>
    <nav className='topbar'>
      <Link href='/models' className='flex items-center gap-4'>
        <Image src='/assets/Models.jpg' alt='logo' width={115} height={115} />
      </Link>

                        {!userContext?.user?.id ? (
                            <div className="flex items-center">
                                <button 
                                    onClick={() => setIsLoginOpen(true)}
                                    className="flex items-center bg-light-orange text-white border border-dark-1 rounded-md px-3 py-[6px]"
                                >
                                    <span className="whitespace-nowrap mx-4 text-dark-1 font-medium text-[15px]">Log in</span>
                                </button>
                                <BsThreeDotsVertical className="text-light-orange" size="25"/>
                            </div>
                        ) : (
                            <div className="flex items-center">

                                <div className="relative">

                                    <button 
                                        onClick={() => setShowMenu(showMenu = !showMenu)} 
                                        className="mt-1 border border-dark-1 rounded-full"
                                    >
                                        <img className="rounded-full w-[35px] h-[35px]" src={useCreateBucketUrl(userContext?.user?.image || '')} />
                                    </button>
                                    
                                    {showMenu ? (
                                        <div className="absolute bg-dark-4 rounded-lg py-1.5 w-[200px] shadow-xl border border-dark-1 top-[40px] right-0">
                                       <button
                                           onClick={() => { 
                                                    router.push(`/createhost`)
                                                    setShowMenu(false)
                                                }}
                                                className="flex items-center w-full justify-start py-3 px-2 hover:bg-dark-5 cursor-pointer"
                                            >
                                                <BiUser size="20" className="text-zinc"/>
                                                <span className="pl-2 font-semibold text-zinc text-sm">Become a Model</span>
                                            </button>

                                            <button 
                                                onClick={() => { 
                                                    router.push(`/profile/${userContext?.user?.id}`)
                                                    setShowMenu(false)
                                                }}
                                                className="flex items-center w-full justify-start py-3 px-2 hover:bg-dark-5 cursor-pointer"
                                            >
                                                <LuLayoutList size="20" className="text-zinc"/>
                                                <span className="pl-2 font-semibold text-zinc text-sm">My Listings</span>
                                            </button>

                                            <button 
                                                onClick={() => { 
                                                    router.push(`/profile/${userContext?.user?.id}`)
                                                    setShowMenu(false)
                                                }}
                                                className="flex items-center w-full justify-start py-3 px-2 hover:bg-dark-5 cursor-pointer"
                                            >
                                                <FaRegHeart size="20" className="text-zinc"/>
                                                <span className="pl-2 font-semibold text-zinc text-sm">My Crush</span>
                                            </button>

                                            <button 
                                                onClick={() => { 
                                                    router.push(`/profile/${userContext?.user?.id}`)
                                                    setShowMenu(false)
                                                }}
                                                className="flex items-center w-full justify-start py-3 px-2 hover:bg-dark-5 cursor-pointer"
                                            >
                                                <FaRegBookmark size="20" className="text-zinc"/>
                                                <span className="pl-2 font-semibold text-zinc text-sm">My Bookings</span>
                                            </button>


                                            <button 
                                                onClick={() => { 
                                                    router.push(`/profile/${userContext?.user?.id}`)
                                                    setShowMenu(false)
                                                }}
                                                className="flex items-center w-full justify-start py-3 px-2 hover:bg-dark-5 cursor-pointer"
                                            >
                                                <BiUser size="20" className="text-zinc"/>
                                                <span className="pl-2 font-semibold text-zinc text-sm">Profile</span>
                                            </button>
                                            <button 
                                                onClick={async () => {
                                                    await userContext?.logout()
                                                    setShowMenu(false)
                                                }} 
                                                className="flex items-center justify-start w-full py-3 px-1.5 hover:bg-dark-5 cursor-pointer"
                                            >
                                                <FiLogOut size={20} className="text-zinc" />
                                                <span className="pl-2 font-semibold text-zinc text-sm">Log out</span>
                                            </button>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        )}
            
        </nav>
    </>
            
  )
}

