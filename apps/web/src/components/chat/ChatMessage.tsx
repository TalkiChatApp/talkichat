import {
     ContextMenu,
     ContextMenuContent,
     ContextMenuItem,
     ContextMenuTrigger,
} from "@repo/ui/components/context-menu"

import { ReplyIcon } from 'lucide-react';

import ChatAvatar from "./ChatAvatar";
import ChatBubble from "./ChatBubble";
import { Delete, EditSquare } from "react-iconly";
import {useLocale, useTranslations} from "next-intl";
import {LangDir} from "@/lib/fonts";
import {Direction} from "@/types";

const ChatMessage = ({
     message,
     ...props
}: {
     message: string;
}) => {
     const tContextMenu = useTranslations("context_menu");

     const locale = useLocale();
     const dir = LangDir(locale);

     return (
          <ContextMenu dir={dir as Direction}>
               <ContextMenuTrigger>
                    <div
                         className="flex gap-x-[10px] justify-end items-end"
                         {...props}>
                         <ChatBubble message={message} />
                         <ChatAvatar />
                    </div>
               </ContextMenuTrigger>
               <ContextMenuContent className="w-auto font-medium">
                    <ContextMenuItem className="flex gap-x-2 text-slate-800">
                         <EditSquare style={{ width: "16px", height: "16px" }} stroke="bold" />
                         {tContextMenu("edit_message")}
                    </ContextMenuItem>
                    <ContextMenuItem className="flex gap-x-2 text-slate-800">
                         <ReplyIcon className="w-3 h-3 sm:w-4 sm:h-4 aspect-square" />
                         {tContextMenu("reply_to")}
                    </ContextMenuItem>
                    <ContextMenuItem className="flex gap-x-2 text-text">
                         <Delete style={{ width: "16px", height: "16px" }} stroke="bold" />
                         {tContextMenu("delete_message")}
                    </ContextMenuItem>
               </ContextMenuContent>
          </ContextMenu>
     );
};

export default ChatMessage;