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
          <div className="flex w-full h-full">
               <Sidebar />
               <Separator orientation="vertical" className="w-[2px] bg-primary/10" />
               <div className="flex-grow">
                    {children}
               </div>
          </div>
     )
}
