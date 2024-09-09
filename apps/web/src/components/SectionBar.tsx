import React from "react";
import { Separator } from "@repo/ui/components/separator";

const SectionBar = ({
     title,
     children
}: {
     title: string,
     children?: React.ReactNode
}) => {
     return (
          <>
               <div className="flex flex-col gap-y-[10px] w-full h-full min-[750px]:w-[350px] min-w-[300px] px-[20px] py-4 text-text font-semibold text-[18px]">
                    <p className="text-[20px]">
                         {title}
                    </p>

                    {children}
               </div>

               <Separator orientation="vertical" className="w-[2px] bg-primary/10" />
          </>
     );
}

export default SectionBar;