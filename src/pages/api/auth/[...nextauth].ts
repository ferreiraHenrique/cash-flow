import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
  },
  session: {
    strategy: 'jwt',
  },
  debug: true
}

export default NextAuth(authOptions)
