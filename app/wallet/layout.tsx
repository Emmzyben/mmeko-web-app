"use client"


import { Inter } from "next/font/google";
import "../globals.css";
import Topwallet from "../layouts/includes/Topwallet";
import Bottombar from "../layouts/includes/Bottombar";
import LeftSidebar from "../layouts/includes/LeftSidebar";


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <html lang="en">
      <body className={`${inter.className} bg-dark-1`}>
      <Topwallet/>
      
      <main className='flex flex-row'>
            <LeftSidebar />
            <section className='main-container'>
              <div className='w-full max-w-4xl'>
                {children}
                </div>
            </section>
          </main>

          <Bottombar />
        </body>
      </html>
      	</>
    )
}
  
