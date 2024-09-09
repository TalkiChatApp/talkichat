import {Account, DefaultSession, getServerSession, ISODateString, NextAuthOptions, User} from "next-auth";
import { redirect } from "next/navigation";
import GoogleProvider from "next-auth/providers/google";
import {API_URL, routes} from "@/config/routes";
import axios, {AxiosError} from "axios";
import {JWT} from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
    };
  }
}

export interface AuthSession {
  user?: AuthUser;
  expires: ISODateString;
}

export interface AuthUser {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  provider?: string | null;
  token?: string | null;
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: routes.register,
    error: routes.register,
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({
                   user,
                   account,
                 }: {
      user: AuthUser;
      account: Account | null;
    }){
      try {
        const payload = {
          email: user.email!,
          name: user.name!,
          oauth_id: account?.providerAccountId!,
          provider: account?.provider!,
          image: user?.image,
        };

        const { data } = await axios.post(API_URL+"/register", payload);

        user.id = data?.user?.id?.toString();
        user.token = data?.user?.token;

        return true;
      } catch (error) {
        if (error instanceof AxiosError) {
          return redirect(`/auth/error?message=${error.message}`);
        }
        return redirect(
            `/auth/error?message=signInError!`
        );
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({
                    session,
                    token,
                  }: {
      session: AuthSession;
      token: JWT;
    }) {
      session.user = token.user as AuthUser;
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

export const getUserAuth = async () => {
  const session: AuthSession | null = await getServerSession(authOptions);
  return { session };
};

export const checkAuth = async () => {
  const { session } = await getUserAuth();
  if (!session) redirect(routes.register);
};
