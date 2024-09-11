import Sidebar from "@/components/Sidebar"
import { Separator } from "@repo/ui/components/separator"
import React from "react"
import {checkAuth} from "@/lib/auth/utils";

export default async function layout({
     children
}: {
     children: React.ReactNode
}) {
    await checkAuth()

     return (
          <div className="flex w-full h-screen overflow-auto">
               <Sidebar />
               <Separator orientation="vertical" className="w-[1px] bg-primary/10" />
               <div className="flex-grow">
                    {children}
               </div>
          </div>
     )
}
