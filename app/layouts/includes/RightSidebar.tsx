import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { useUser } from "@/app/context/user"
import ClientOnly from "@/app/components/ClientOnly"
import { useGeneralStore } from "@/app/stores/general"
import MenuItemFollow from "@/app/components/MenuItemFollow"


export default function RightSidebar() {

    let { setRandomUsers, randomUsers} = useGeneralStore()

    const contextUser = useUser()
    const pathname = usePathname()

    useEffect(() => { setRandomUsers() }, [])
 
  return (
    <section className='custom-scrollbar rightsidebar'>
      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='text-heading4-medium text-light-orange'>
          Top Models
        </h3>

       

<div className="lg:hidden block pt-3" />
<ClientOnly>
    <div className="cursor-pointer">
        {randomUsers?.map((user, index) => ( 
            <MenuItemFollow key={index} user={user} /> 
        ))}
    </div>
</ClientOnly>

      
        </div>

        
      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='text-heading4-medium text-light-orange'>
          Suggested Accounts
        </h3>

       

<div className="lg:hidden block pt-3" />
<ClientOnly>
    <div className="cursor-pointer">
        {randomUsers?.map((user, index) => ( 
            <MenuItemFollow key={index} user={user} /> 
        ))}
    </div>
</ClientOnly>

      
        </div>
    
    </section>
    
  
  );
}

