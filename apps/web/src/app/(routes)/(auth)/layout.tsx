import React from "react";
import { getUserAuth } from "@/lib/auth/utils";
import { redirect } from "next/navigation";
import { routes } from "@/config/routes";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

// Dynamic Metadata based on locales
export async function generateMetadata(): Promise<Metadata> {
     const tGeneral = getTranslations("general")
     const tMetadata = getTranslations("register_metadata")

     return {
          title: {
               default: `${(await tMetadata)("title")}${(await tGeneral)("separator")} ${(await tGeneral)("talkichat")}`,
               template: `%s${(await tGeneral)("separator")} ${(await tMetadata)("title")}.`,
          },
          description: (await tMetadata)("desc"),
     }
}

export default async function layout({
     children
}: {
     children: React.ReactNode
}) {
     const { session } = await getUserAuth()
     if (session) redirect(routes.default)

     return children
}