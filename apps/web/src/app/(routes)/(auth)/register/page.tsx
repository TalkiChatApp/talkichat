"use client"

import React, {useEffect} from "react";
import AuthForm from "./_components/AuthForm";
import {useSearchParams} from "next/navigation";
import {toast} from "sonner";
import {RegisterStatus} from "@/types";

const Page = () => {
    const searchParams = useSearchParams()
    const registerStatus = searchParams.get("status") as RegisterStatus
    const error = searchParams.get("error")

    const toastShownRef = React.useRef(false);

    useEffect(() => {
        if (error && !toastShownRef.current) {
            toast.error(`${error} error`, { duration: Infinity, closeButton: true });
            toastShownRef.current = true;
        }
    }, [error]);

     return (
         <div className="flex h-full w-full items-center justify-center">
             <AuthForm />
         </div>
     );
}

export default Page;
