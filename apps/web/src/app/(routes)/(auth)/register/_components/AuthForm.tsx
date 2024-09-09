"use client"

import React from "react";

import { Button } from "@repo/ui/components/button";
import { Form, FormField } from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl";
import { AuthFormSchema } from "@/types";
import { registerSchema } from "@/lib/validations/auth";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import {cn} from "@repo/ui/lib/utils";
import {englishBricolageGrotesqueFont} from "@/lib/fonts";
import {routes} from "@/config/routes";

const AuthForm = () => {
    const tRegister = useTranslations("register_page")

    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const [email, setEmail] = React.useState<string>("")

    const placeholder = "hey@talkichat.com"

    const form = useForm<AuthFormSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email,
        },
    })

    async function onSubmit(values: AuthFormSchema) {
        setIsLoading(true);

        toast.loading(`${tRegister("in_progress")}`,)

        const signInResult = await signIn("email", {
            email: values.email,
            redirect: false,
        })

        setIsLoading(false)

        toast.dismiss()

        if (!signInResult?.ok) {
            return toast.error(tRegister("error"), { duration: Infinity, closeButton: true })
        }

        return toast.success(tRegister("success"), { duration: Infinity, closeButton: true })
    }

    function googleRegister() {
        setIsLoading(true);

        // console.log(`slfja_ : ${process.env.GOOGLE_CLIENT_ID}`)
        // console.log(`slflajflja_ : ${process.env.GOOGLE_CLIENT_SECRET}`)

        toast.promise(signIn("google", {
            redirect: true,
            callbackUrl: routes.default,
        }).then((_) => {
            setIsLoading(false);
        }), {
            loading: `${tRegister("in_progress")}`,
        })
    }

    function onError(values: AuthFormSchema) {
        return toast.error(`${values}`)
    }

    return (
        <div
            className="flex flex-col mx-[20px] my-[20px] sm:m-0 gap-y-2 w-[450px] bg-primary/5 px-[40px] py-[30px] rounded-3xl">
            <div className="flex w-fit text-sm text-text bg-primary/5 rounded-full px-[15px] py-[5px] select-none">
                {tRegister("subtitle")}
            </div>
            <div className="text-[20px] sm:text-[25px] text-text leading-[2rem] sm:leading-[2.5rem]">
                {tRegister("desc")}
            </div>
            <div className="h-[5px]" />

            <Form {...form} formState={form.formState}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    onError={form.handleSubmit(onError)}
                    className="flex flex-col w-full gap-y-5">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <Input
                                id="roomId"
                                dir="ltr"
                                placeholder={placeholder}
                                type="text"
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect="off"
                                autoFocus
                                aria-autocomplete="none"
                                disabled={isLoading}
                                className={englishBricolageGrotesqueFont.className}
                                {...field} />
                        )} />
                    <Button
                        disabled={isLoading}
                        type="submit"
                        size="lg"
                        variant="secondary">
                        {tRegister("submit_email")}
                    </Button>
                </form>
            </Form>

            <div
                className="text-[12px] sm:text-[15px] text-text leading-[1.5rem] sm:leading-[1.2rem] w-full text-center sm:py-[5px]">
                {tRegister("or_use_other_ways")}
            </div>

            <Button
                disabled={isLoading}
                size="lg"
                onClick={googleRegister}
                variant="secondary">
                {tRegister("google")}
            </Button>
        </div>
    );
}

export default AuthForm;