import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { loginWithGoogle } from "../../../utils/helpers/userHelper";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      idToken: true,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account !== null) {
        token.idToken = account.id_token;
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        idToken: token.idToken
      };
    },
    async signIn({ account }) {
      if (
        account !== null &&
        account.provider === "google" &&
        account.id_token !== undefined
      ) {
        console.log("loginWithGoogle: ", true);
        const { message } = await loginWithGoogle(account.id_token);
        console.log("message", message);
        if (message === "success") {
          return "/";
        } else if (message === "no role") {
          return "/role-selection";
        }
      }
      return "/";
    }
  },
  pages: {
    signIn: "/login"
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
