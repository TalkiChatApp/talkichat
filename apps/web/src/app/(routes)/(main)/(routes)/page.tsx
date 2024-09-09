"use client"

import ChatItem from "@/components/chat/ChatItem";
import ChatMessage from "@/components/chat/ChatMessage";
import SendMessageForm from "@/components/chat/SendMessageForm";
import SectionBar from "@/components/SectionBar";
import { Avatar, AvatarFallback } from "@repo/ui/components/avatar";
import { Separator } from "@repo/ui/components/separator";
import { useState } from "react";
import {useFormatter, useNow, useTranslations} from "next-intl";

const Page = () => {
  const [chatId, setChatId] = useState<String | null>(null)

    const tGeneral = useTranslations("general")
    const tPage = useTranslations("page")

    const now = useNow({
        updateInterval: 1000 * 10
    });

    const format = useFormatter();
    const dateTime = new Date('2024-03-20T10:36:01.516Z');

   const date = format.relativeTime(dateTime, now);

  return (
    <div className="flex w-full h-full">
      <SectionBar title={tGeneral("chats")}>
        <ChatItem onClick={() => setChatId("true")} />
      </SectionBar>

      <div className="hidden min-[750px]:flex flex-col flex-grow w-full h-full">
        {chatId ?
          <div className="flex flex-col h-full items-center justify-center">
            <div className="flex items-center w-full h-min gap-x-[10px] px-[15px] py-[15px]">

              <Avatar className="bg-transparent p-[2px] size-12 text-text">
                {/* <AvatarImage className="rounded-full" src="https://github.com/omidshababdev.png" alt="@omidshababdev" /> */}
                <AvatarFallback className="text-[15px] font-normal">OS</AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <div className="w-[250px] font-semibold text-[18px] text-text line-clamp-1 overflow-ellipsis">
                    {tGeneral("lorem")}
                </div>
                <p className="text-[12px] font-normal text-slate-600">
                    {date}
                </p>
              </div>
            </div>

            <Separator orientation="horizontal" className="h-[2px] bg-primary/10" />

            <div className="flex flex-col max-w-3xl w-full h-full flex-grow px-[30px]">
              <div className="flex flex-col flex-grow h-full py-[25px] text-[18px] leading-[2rem]">
                  {tGeneral("lorem")}

                <div className="flex-grow flex flex-col items-end justify-end">
                  <ChatMessage message={tGeneral("lorem")} />
                </div>
              </div>

              <Separator orientation="horizontal" className="h-[2px] bg-primary/10" />

              <div className="flex flex-col gap-y-[10px] w-full h-min py-[15px]">
                <SendMessageForm />

                <p className="text-[16px] font-normal text-slate-600 leading-[1.8rem]">
                    {tGeneral("lorem")}
                </p>
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