"use client"

import { useModal } from "@/hooks/useModalStore"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@repo/ui/components/dialog"
import { Button } from "@repo/ui/components/button"
import {useTranslations} from "next-intl";
import {signOut} from "next-auth/react";

const LogoutModal = () => {
     const tLogoutModal = useTranslations("logout_modal")

     const { isOpen, onClose, type } = useModal()

     const isModalOpen = isOpen && type === "logout"

     const [isSigningOut, setIsSigningOut] = useState(false);

     const handleSignOut = async () => {
          setIsSigningOut(true);
          await signOut();
          setIsSigningOut(false);
     };

     return (
          <Dialog open={isModalOpen} onOpenChange={onClose}>
               <DialogContent className="rounded-2xl max-w-[400px]">
                    <DialogHeader>
                         <DialogTitle className="text-[22px] mr-[35px] font-bold text-text">
                              {tLogoutModal("title")}
                         </DialogTitle>
                         <DialogDescription className="text-[18px] text-text/80">
                              {tLogoutModal("subtitle")}
                         </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                         <div className="flex flex-row w-full justify-end items-center gap-2 mt-[15px]">
                              <Button
                                   variant="secondary"
                                   disabled={isSigningOut}
                                   onClick={handleSignOut}>
                                   {tLogoutModal("yes_button")}
                              </Button>

                              <Button
                                   variant="outline"
                                   disabled={isSigningOut}
                                   onClick={() => onClose()}>
                                   {tLogoutModal("close_button")}
                              </Button>
                         </div>
                    </DialogFooter>
               </DialogContent>
          </Dialog>
     )
}

export default LogoutModal;