"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@repo/ui/components/context-menu";
import { Delete, EditSquare } from "react-iconly";
import {useLocale, useTranslations} from "next-intl";
import {LangDir} from "@/lib/fonts";
import {Direction} from "@/types";

const ChatItem = ({
     onClick
}: {
     onClick?: VoidFunction
}) => {
     const tGeneral = useTranslations("general")
     const tContextMenu = useTranslations("context_menu")

     const locale = useLocale();
     const dir = LangDir(locale);

     return (
          <ContextMenu dir={dir as Direction}>
               <ContextMenuTrigger>
                    <div
                         onClick={onClick}
                         className="flex gap-x-[10px] w-full h-min bg-primary/[3%] hover:bg-primary/[6%] transition-all duration-500 rounded-[15px] px-[10px] py-[10px] cursor-pointer">
                         <Avatar className="bg-transparent p-[2px] size-12">
                              {/* <AvatarImage className="rounded-full" src="https://github.com/omidshababdev.png" alt="@omidshababdev" /> */}
                              <AvatarFallback className="text-[15px] font-normal">OS</AvatarFallback>
                         </Avatar>

                         <div className="flex flex-col flex-grow justify-center gap-y-[2px]">
                              <div className="max-w-[250px] text-[15px] line-clamp-1">
                                   {tGeneral("lorem")}
                              </div>
                              <div className="flex flex-grow justify-between gap-x-[10px] items-center">
                                   <div className="max-w-[250px] text-[13px] font-normal line-clamp-1">
                                        {tGeneral("lorem")}
                                   </div>
                                   <div className="flex items-center justify-center px-[5px] py-[2px] rounded-[10px] bg-primary/10 font-normal text-[10px]">
                                        1302
                                   </div>
                              </div>
                         </div>
                    </div>
               </ContextMenuTrigger>
               <ContextMenuContent className="w-auto font-medium">
                    <ContextMenuItem
                         className="flex gap-x-2">
                         <EditSquare style={{ width: "16px", height: "16px" }} stroke="bold" />
                         {tContextMenu("edit_contact")}
                    </ContextMenuItem>
                    <ContextMenuItem
                         className="flex gap-x-2 text-text">
                         <Delete style={{ width: "16px", height: "16px" }} stroke="bold" />
                         {tContextMenu("delete_chat")}
                    </ContextMenuItem>
               </ContextMenuContent>
          </ContextMenu>
     );
}

export default ChatItem;