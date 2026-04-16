import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "google" && user) {
        token.id = user.id;
        token.provider = "google";
        token.image = user.image;
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
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const email = user.email;
        if (!email) return false;
        
        const users = JSON.parse(localStorage.getItem("izipay_users") || "[]");
        const existingUser = users.find((u: any) => u.email === email);
        
        if (!existingUser) {
          const newUser = {
            id: user.id || Date.now().toString(),
            email,
            name: user.name || "Google User",
            password: "",
            provider: "google",
            image: user.image || "",
            createdAt: new Date().toISOString(),
            status: "active",
            role: "user",
          };
          users.push(newUser);
          localStorage.setItem("izipay_users", JSON.stringify(users));
          
          localStorage.setItem("izipay_user", JSON.stringify({
            email,
            name: user.name || "Google User",
            provider: "google",
            image: user.image || "",
          }));
        }
      }
      return true;
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };