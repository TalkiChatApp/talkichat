import SidebarItem from "@/components/SidebarItem";
import PlusOutlineIonicons from "@/components/icons/plus";
import {Home, Location, TwoUsers} from "react-iconly";
import {routes} from "@/config/routes";
import {Avatar, AvatarFallback} from "@repo/ui/components/avatar";
import {useModal} from "@/hooks/useModalStore";

const Navbar = () => {
    const { onOpen } = useModal()

    return (
        <div
            className="sticky bottom-0 flex lg:hidden gap-x-[10px] justify-center items-center border-t-[2px] border-primary/10 px-[20px] py-[10px] backdrop-blur-md">
            <SidebarItem>
                <PlusOutlineIonicons/>
            </SidebarItem>

            <SidebarItem
                icon={Home}
                route={routes.default}/>

            <SidebarItem
                icon={Location}
                onClick={() => onOpen("explore")}/>

            <SidebarItem
                icon={TwoUsers}/>

            <SidebarItem
                onClick={() => onOpen("logout")}>
                <Avatar className="p-[2px]">
                    {/* <AvatarImage className="rounded-full" src="https://github.com/omidshababdev.png" alt="@omidshababdev" /> */}
                    <AvatarFallback className="text-[15px] font-normal">OS</AvatarFallback>
                </Avatar>
            </SidebarItem>
        </div>
    )
}

export default Navbar