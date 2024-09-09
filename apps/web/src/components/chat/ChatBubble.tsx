import { CheckIcon } from "lucide-react";

const ChatBubble = ({
     message
}: {
     message: string
}) => {
     return (
          <div className="flex flex-col flex-grow max-w-[350px] rounded-[25px] bg-primary/5 text-[18px] text-text px-[25px] py-[15px] cursor-pointer">
               {message}
               <div className="w-full flex justify-between items-center text-[12px] opacity-60">
                    11:24
                    <CheckIcon className="w-[15px] h-[15px]" />
               </div>
          </div>
     );
}

export default ChatBubble;