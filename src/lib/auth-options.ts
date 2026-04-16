import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import fs from "fs";
import path from "path";

const CONFIG_FILE = path.join(process.cwd(), "auth-config.json");

function getAuthConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = fs.readFileSync(CONFIG_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading auth config:", e);
  }
  return { google: { enabled: false, clientId: "", clientSecret: "" } };
}

const config = getAuthConfig();
const googleClientId = config.google?.clientId || process.env.GOOGLE_CLIENT_ID || "";
const googleClientSecret = config.google?.clientSecret || process.env.GOOGLE_CLIENT_SECRET || "";
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