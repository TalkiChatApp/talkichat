"use client"

import ChatItem from "@/components/chat/ChatItem";
import ChatMessage from "@/components/chat/ChatMessage";
import SendMessageForm from "@/components/chat/SendMessageForm";
import SectionBar from "@/components/SectionBar";
import { Avatar, AvatarFallback } from "@repo/ui/components/avatar";
import {useState, UIEvent, useRef} from "react";
import {useFormatter, useNow, useTranslations} from "next-intl";
import Navbar from "@/components/Navbar"
import {cn} from "@repo/ui/lib/utils";
import {ChevronDown,Search} from "react-iconly";

const Page = () => {
  const [chatId, setChatId] = useState<String | null>(null)
    const [showBorder, setShowBorder] = useState<boolean>(false)
    const [showScrollToBottom, setShowScrollToBottom] = useState(false)

    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    const tGeneral = useTranslations("general")
    const tPage = useTranslations("page")

    const now = useNow({
        updateInterval: 1000 * 10
    });

    const format = useFormatter();
    const dateTime = new Date('2024-03-20T10:36:01.516Z');

   const date = format.relativeTime(dateTime, now);

    const handleScroll = (event: UIEvent<HTMLDivElement>) => {
          const target = event.currentTarget as HTMLDivElement;

          if (target.scrollTop > 20) {
               setShowBorder(true)
          } else {
               setShowBorder(false)
          }
     };

    const handleChatScroll = (event: UIEvent<HTMLDivElement>) => {
        const target = event.currentTarget as HTMLDivElement;

        if (target.scrollTop < (-80)) {
            setShowScrollToBottom(true)
        } else {
            setShowScrollToBottom(false)
        }
    };

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    };

  return (
    <div className="flex w-full h-full">
      <SectionBar title={tGeneral("chats")}>
          <div className="reletive flex h-full flex-col">
              <div onScroll={handleScroll} className={cn(
                  "flex flex-col h-full gap-y-[10px] px-[20px] max-[1024px]:pb-[75px] overflow-y-scroll none-scroll-bar border-t-[1px] border-transparent",
                  showBorder && "border-primary/10"
              )}>
                  {[1,2,3].map((index)=>(
                      <ChatItem key={index} onClick={() => setChatId("true")} />
                      ))}
              </div>

              <Navbar />
          </div>
      </SectionBar>

      <div onScroll={handleChatScroll} ref={chatContainerRef} className="hidden min-[750px]:flex flex-col-reverse w-full overflow-y-scroll none-scroll-bar">
        {chatId ?
            <div className="relative flex flex-col flex-grow w-full items-center justify-center">
                <div className="sticky top-0 flex flex-col w-full">
                    <div
                        className="flex items-center backdrop-blur-sm w-full gap-x-[10px] px-[15px] py-[15px] border-b-[1px] border-primary/10">

                        <Avatar className="bg-transparent p-[1px] size-12 text-text">
                            {/* <AvatarImage className="rounded-full" src="https://github.com/omidshababdev.png" alt="@omidshababdev" /> */}
                            <AvatarFallback className="text-[15px] font-normal">OS</AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col">
                            <div
                                className="w-[250px] font-semibold text-[18px] text-text line-clamp-1 overflow-ellipsis">
                                {tGeneral("lorem")}
                            </div>
                            <p className="text-[12px] font-normal text-slate-600">
                                {date}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center items-center w-full leading-[2rem]">
                        <div className="max-w-3xl px-[30px] py-[20px]">
                            {tGeneral("lorem")}
                        </div>
                    </div>
                </div>

                <div
                    className="flex flex-col max-w-3xl w-full py-[25px] gap-y-[20px] items-end justify-end px-[30px] leading-[2rem]">
                    {[1, 2, 3, 4, 5].map((index) => (
                        <ChatMessage key={index} message={`${tGeneral("lorem")} , ${index}`}/>
                    ))}
                </div>

                <div className="w-full sticky bottom-0">
                    <div
                        className="flex w-full justify-center gap-x-[8px] px-[15px] pb-[10px]">
                        <div
                            onClick={() => scrollToBottom()}
                            className="text-text/60 border-[1px] border-primary/5 p-[8px] bg-primary/5 rounded-full backdrop-blur-sm cursor-pointer hover:bg-primary/10 transition-all duration-500">
                            <ChevronDown/>
                        </div>

                        <div
                            onClick={() => null}
                            className="text-text/60 border-[1px] border-primary/5 p-[8px] bg-primary/5 rounded-full backdrop-blur-sm cursor-pointer hover:bg-primary/10 transition-all duration-500">
                            <Search/>
                        </div>
                    </div>

                    <div
                        className="backdrop-blur-md w-full flex justify-center items-center border-t-[1px] border-primary/10">
                        <div
                            className="flex flex-col gap-y-[10px] max-w-3xl w-full px-[30px] py-[15px]">
                            <SendMessageForm/>

                            <p className="text-[16px] font-normal text-slate-600 leading-[1.8rem]">
                                {tGeneral("lorem")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className="w-full h-full flex items-center justify-center px-[30px]">
                <p className="text-[16px] text-text font-medium bg-primary/5 px-[15px] py-[5px] rounded-full">
                    {tPage("select_a_chat")}
                </p>
            </div>}
      </div>
    </div>
  );
}

export default Page;