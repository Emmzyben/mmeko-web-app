"use client"
import { useEffect } from "react"
import MainLayout from "./layouts/MainLayout"
import { usePostStore } from "@/app/stores/post"
import ClientOnly from "./components/ClientOnly"
import PostMain from "./components/PostMain"
import "./globals.css";

export default function Home() {
  let { allPosts, setAllPosts } = usePostStore();
  useEffect(() => { setAllPosts()}, [])
  return (
    <>
      <MainLayout>
      <h1 className='head-text header text-left border-b border-light-orange' id="hot">Hot</h1>
        <div >
          <ClientOnly>
            {allPosts.map((post, index) => (
              <PostMain post={post} key={index} />
            ))}
          </ClientOnly>
        </div>
      </MainLayout>
    </>
  )
}