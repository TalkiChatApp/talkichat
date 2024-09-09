import IconButton from '@/components/IconButton';
import { PyramidIcon } from "lucide-react";

const SendButton = ({
     ...props
}) => {
     return (
          <div>
               <IconButton
                    className="bg-transparent hover:bg-primary/5"
                    {...props}>
                    <PyramidIcon className="w-4 h-4 sm:w-6 sm:h-6 aspect-square text-text" />
               </IconButton>
          </div>
     );
}

export default SendButton;