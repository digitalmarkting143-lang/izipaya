import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const googleClientId = process.env.GOOGLE_CLIENT_ID || "";
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
const isGoogleConfigured = googleClientId.length > 0 && googleClientSecret.length > 0;

export const authOptions: NextAuthOptions = {
  providers: isGoogleConfigured
    ? [
        GoogleProvider({
          clientId: googleClientId,
          clientSecret: googleClientSecret,
        }),
      ]
    : [],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "google" && user) {
        token.id = user.id;
        token.provider = "google";
        token.image = user.image;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).provider = token.provider;
        (session.user as any).image = token.image;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET || "dev-secret-key-change-in-production",
};

export const isGoogleOAuthConfigured = () => isGoogleConfigured;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };