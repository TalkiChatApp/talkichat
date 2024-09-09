import { useEffect, useState } from "react"
import LogoutModal from "@/components/modals/LogoutModal"
import ProfileModal from "@/components/modals/ProfileModal";

const ModalProvider = () => {
     const [isMounted, setIsMounted] = useState(false)

     useEffect(() => {
          setIsMounted(true)
     }, [])

     if (!isMounted) {
          return null
     }

     return (
          <>
               <ProfileModal />
               <LogoutModal />
          </>
     );
}

export default ModalProvider;