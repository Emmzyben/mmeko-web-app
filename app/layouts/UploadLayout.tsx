import React from "react"
import Topbar from "./includes/Topbar"

export default function UploadLayout({ children }: { children: React.ReactNode }) {
    return (
      	<>
			<div className="bg-dark-1">
                <Topbar/>
                <div className="flex justify-between mx-auto w-full px-2 max-w-[1140px]">
                    {children}
                </div>
            </div>
      	</>
    )
}
  