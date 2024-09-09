"use client"

import { useModal } from "@/hooks/useModalStore"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@repo/ui/components/dialog"
import { Button } from "@repo/ui/components/button"

const ProfileModal = () => {
    const { isOpen, onClose, type } = useModal()
    const router = useRouter()

    const isModalOpen = isOpen && type === "profile"

    const [isLoading, setIsLoading] = useState(false)

    const onClick = async () => {
        //
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="rounded-2xl max-w-[400px]">
                <DialogHeader>
                    <DialogTitle className="text-[22px] mr-[35px] font-bold text-text">
                        Do you really want to logout? - profile
                    </DialogTitle>
                    <DialogDescription className="text-[18px] text-text/80">
                        Let me know that your really want to logout or not
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex flex-row w-full justify-end items-center gap-2 mt-[15px]">
                        <Button
                            variant="secondary"
                            onClick={() => null}>
                            Yes, Logout!
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => onClose()}>
                            Cancel
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ProfileModal;