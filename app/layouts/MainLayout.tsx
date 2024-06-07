import React from "react"
import { usePathname } from "next/navigation"
import LeftSidebar from "./includes/LeftSidebar"
import Topbar from "./includes/Topbar"
import Bottombar from "./includes/Bottombar"
import RightSidebar from "./includes/RightSidebar"

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

return (
      	<>
			 <html lang='en'>
        <body>
          <Topbar />

          <main className='flex flex-row'>
            <LeftSidebar />
            <section className='main-container'>
              <div className='w-full max-w-4xl'>
                {children}
                </div>
            </section>
            <RightSidebar />
          </main>

          <Bottombar />
        </body>
      </html>
      	</>
    )
}
  