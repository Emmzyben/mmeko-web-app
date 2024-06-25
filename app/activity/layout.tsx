"use client"


import { Inter } from "next/font/google";
import "../globals.css";
import ModelPageTopbar from "../layouts/includes/ModelPageTopbar";
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
      <ModelPageTopbar/>
      
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
  
