import NextAuth, { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db";
import { verify } from "argon2";

type Student2 = {
  [key: string]: any;
  name: string;
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return Promise.resolve(token as Student2);
    },
    session({ session, token }) {
      if (token.user) {
        const t = token.user as {
          id: string;
          handle: string;
        };

        session.user = {
          id: t.id,
          handle: t.handle,
          email: token.email,
          image: token.picture,
          name: token.name,
        };
      }
      return Promise.resolve(session);
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user: any = await prisma.user.findFirst({
          where: { email: credentials?.email },
        });

        if (!user) {
          return null;
        }

        const isValidPassword = await verify(user.password || "", credentials?.password || "");

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email || "",
          name: user.name || "",
          image: user.image || "",
          handle: user.handle,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
