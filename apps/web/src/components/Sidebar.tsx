"use client"

import SidebarItem, { SidebarItemType } from "./SidebarItem";
import {  Home, Location, Notification, Setting, TwoUsers } from "react-iconly";
import { Avatar, AvatarFallback } from "@repo/ui/components/avatar";
import PlusOutlineIonicons from "./icons/plus";
import { routes } from "@/config/routes";
import { useModal } from "@/hooks/useModalStore";
import {useTranslations} from "next-intl";

type SidebarItemTypes =
     | "Add"
     | "Chats"
     | "Stats"
     | "Ads"

type SidebarItemInstance = {
     id: string;
     type: SidebarItemType;
};

type SidebarItemModel = {
     type: SidebarItemTypes,

     construct: (id: string) => SidebarItemInstance;
}

type SidebarItemsType = {
     [key in SidebarItemTypes]: SidebarItemModel;
};

const Sidebar = () => {
     const { onOpen } = useModal()

     const tSidebar = useTranslations("sidebar")

     return (
          <div className="hidden lg:flex lg:flex-col h-full justify-between items-start">
               <div className="flex flex-col flex-grow gap-2 px-3 py-4">
                    <SidebarItem>
                         <PlusOutlineIonicons />
                    </SidebarItem>

                    <SidebarItem
                         icon={Home}
                         route={routes.default}
                         hover={tSidebar("home")} />

                    <SidebarItem
                         icon={Location}
                         hover={tSidebar("location")}
                         onClick={() => onOpen("explore")} />

                    <SidebarItem
                         icon={TwoUsers}
                         hover={tSidebar("contacts")}
                         onClick={() => onOpen("contacts")} />

               </div>

               <div className="flex flex-col gap-2 px-3 py-4">
                    <SidebarItem
                         icon={Notification}
                         hover={tSidebar("notifications")}
                         onClick={() => onOpen("notifications")} />

                    <SidebarItem
                         icon={Setting}
                         hover={tSidebar("settings")}
                         onClick={() => onOpen("settings")} />

                    <SidebarItem
                         onClick={() => onOpen("logout")}
                         hover={tSidebar("profile")}>
                         <Avatar className="p-[2px]">
                              {/* <AvatarImage className="rounded-full" src="https://github.com/omidshababdev.png" alt="@omidshababdev" /> */}
                              <AvatarFallback className="text-[15px] font-normal">OS</AvatarFallback>
                         </Avatar>
                    </SidebarItem>
               </div>
          </div>
     );
}

export default Sidebar;