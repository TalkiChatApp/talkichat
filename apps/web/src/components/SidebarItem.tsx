import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui/components/tooltip";
import { cn } from "@repo/ui/lib/utils";
import { useRouter } from "next/navigation";
import { IconProps } from "react-iconly";

export type SidebarItemType = {
     icon?: React.FC<IconProps> | React.ElementType,
     hover?: string,
     children?: React.ReactNode
     className?: string,
     route?: string,
     dialog?: React.ReactNode,
     onClick?: VoidFunction,
}

const SidebarItem = ({
     hover,
     icon: Icon,
     children,
     className,
     route,
     onClick
}: SidebarItemType) => {
     const router = useRouter()

     return (
          <TooltipProvider>
               <Tooltip delayDuration={1000}>
                    <TooltipTrigger className="focus:outline-none">
                         <div
                              onClick={() => {
                                   route && router.push(route)
                                   onClick && onClick()
                              }}
                              className={cn(
                                   "flex p-2 w-[45px] h-[45px] rounded-[50px] items-center justify-center border-[2px] border-primary/10 cursor-pointer hover:bg-primary/[3%] text-text/80 transition-all duration-500",
                                   className
                              )}>
                              {Icon ? <Icon style={{ width: 20, height: 20 }} stroke="bold" /> : <div>{children}</div>}
                         </div>
                    </TooltipTrigger>
                    {hover && (
                         <TooltipContent
                              side="right"
                              alignOffset={50}
                              className="font-medium text-text rounded-[8px] bg-primary/5 border-[2px] border-primary/10 px-[8px] py-[3px] backdrop-blur-2xl">
                              {hover}
                         </TooltipContent>
                    )}
               </Tooltip>
          </TooltipProvider>
     );
}

export default SidebarItem