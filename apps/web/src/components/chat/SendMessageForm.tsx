import { Input } from "antd";
import SendButton from "@/components/buttons/SendButton";
import { cn } from "@repo/ui/lib/utils";
import {LangDir, LangFont} from "@/lib/fonts";
import {useLocale, useTranslations} from "next-intl";

const { TextArea } = Input;

const SendMessageForm =  () => {
    const locale = useLocale();

    const font = LangFont(locale);
    const dir = LangDir(locale);

    const tPage =  useTranslations("page")

     return (
          <div className="flex gap-x-[10px] w-full items-end">
               <div className="flex-grow sm:px-0 border-primary/10 border-b-[2px]">
                    <TextArea
                        dir={dir}
                         placeholder={tPage("input_placeholder")}
                         variant="borderless"
                         autoSize={{ maxRows: 8 }}
                         maxLength={500}
                         autoComplete="off"
                         className={cn(
                              "text-start h-full text-[15px] sm:text-[18px] px-0 py-[10px] none-scroll-bar",
                              font,
                         )}
                    />
               </div>
               <SendButton
                    onClick={() => null
                         // setMessagesList([...messagesList, "this is a new message!"])
                    }
               />
          </div>
     );
}

export default SendMessageForm;