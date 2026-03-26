import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { readJson, writeJson } from "./db";
import type { Admin } from "./types";
import { v4 as uuidv4 } from "uuid";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login", error: "/login" },
  providers: [
    CredentialsProvider({
      name: "Password",
      credentials: { password: { label: "Password", type: "password" } },
      async authorize(credentials) {
        if (credentials?.password === process.env.ADMIN_PASSWORD) {
          return { id: "password-user", name: "Admin", email: "admin@urbantour.local" };
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const admins = readJson<Admin>("admins.json");
        const existing = admins.find((a) => a.email === user.email);
        if (!existing) {
          const newAdmin: Admin = {
            id: uuidv4(),
            email: user.email!,
            name: user.name ?? "",
            image: user.image ?? null,
            status: "pending",
            isSuperAdmin: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          admins.push(newAdmin);
          writeJson("admins.json", admins);
          return "/login?pending=1";
        }
        if (existing.status !== "approved") return "/login?pending=1";
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.provider = account?.provider ?? "credentials";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
        (session as { provider?: string }).provider = token.provider as string;
      }
      return session;
    },
  },
};
