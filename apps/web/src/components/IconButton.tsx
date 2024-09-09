import { cn } from "@repo/ui/lib/utils";
import React from "react";

const IconButton = ({
     children,
     onClick,
     disabled,
     className,
}: {
     children: React.ReactNode;
     onClick?: React.MouseEventHandler<HTMLDivElement>;
     disabled?: boolean;
     className?: string;
}) => {
     return (
          <div
               onClick={!disabled ? onClick : undefined}
               className={cn(
                    disabled && "cursor-not-allowed opacity-50",
                    "flex justify-center items-center border-primary/5 border-[3px] bg-primary/10 cursor-pointer p-3 rounded-full hover:bg-primary/15 transform duration-200 transition duration-400 text-icon aspect-square",
                    className,
               )}
          >
               {children}
          </div>
     );
};

export default IconButton;