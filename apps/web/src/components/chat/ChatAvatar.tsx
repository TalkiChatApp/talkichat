import { ReactNode } from "react";

const ChatAvatar = ({
     children
}: {
     children?: ReactNode
}) => {
     return (
          <div className="w-[40px] min-w-[40px] h-[40px] min-h-[40px] aspect-square rounded-full bg-primary/5 cursor-pointer">
               {children}
          </div>
     );
}

export default ChatAvatar;