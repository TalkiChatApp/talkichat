import type { Metadata } from "next";
import "@repo/ui/globals.css";
import { cn } from "@repo/ui/lib/utils";
import {LangDir, LangFont} from "@/lib/fonts";
import { NextIntlClientProvider } from "next-intl";
import {getLocale, getMessages, getTranslations} from "next-intl/server";
import {Toaster} from "@repo/ui/components/sonner";
import NextAuthProvider from "@/lib/auth/Provider";

// Dynamic Metadata based on locales
export async function generateMetadata(): Promise<Metadata> {
  const tMetadata = await getTranslations("metadata")

  return {
    title: ( tMetadata)("name"),
    description: ( tMetadata)("desc"),
  }
}

export default async  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const messages = await getMessages();

  const font = LangFont(locale);
  const dir = LangDir(locale);

  return (
    <html lang={locale} dir={dir}>
    <NextAuthProvider>
      <body
        className={cn(
          font,
          "relative antialiased flex min-h-screen max-h-screen h-screen w-full items-center justify-center",
        )}>
        <NextIntlClientProvider
            locale={locale}
        messages={messages}>
          {children}
          <Toaster
              font={font}
              others={{
                position: "top-center",
              }} />
        </NextIntlClientProvider>
      </body>
    </NextAuthProvider>
    </html>
  );
}
