import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl"
import { MenuItemFollowCompTypes } from "@/app/types"
import Link from "next/link"
import { AiOutlineCheck } from "react-icons/ai"

export default function MenuItemFollow({ user }: MenuItemFollowCompTypes) {
    
    return (
        <>
            <Link 
                href={`/profile/${user?.id}`}
                className="flex items-center hover:bg-red-1 rounded-md w-full py-1.5 px-2"
            >
                <img 
                    className="rounded-full lg:mx-0 mx-auto" 
                    width="35" 
                    src={useCreateBucketUrl(user?.image)}
                />
                <div className="lg:pl-2.5 lg:block hidden">
                    <div className="flex items-center">
                        <p className="font-bold text-[14px] text-light-orange truncate">
                            {user?.name}
                        </p>
                        <p className="ml-1 rounded-full bg-light-orange h-[14px] relative">
                            <AiOutlineCheck className="relative p-[3px] text-dark-1" size="15"/>
                        </p>
                    </div>

                    <p className="font-light text-[12px] text-zinc">
                        {user?.name}
                    </p>
                </div>
            </Link>
        </>
    )
}