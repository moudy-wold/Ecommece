import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Login } from "@/app/api/Front/auth";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials:any) {
        try {
          const res = await Login({
            email: credentials?.email,
            password: credentials?.password,
          });
          const user:any = res.data;
          if (user && user.token) {
            return {
              id: user.id,
              email: credentials?.email,
              token: user.token,
              user_role: user.user_role,
            };
          }

          return null;
        } catch (error) {
          console.error("Login Error:", error);
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.user_role = user.user_role;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = {
        id: token.id,
        email: token.email,
        user_role: token.user_role,
      };
      session.token = token.token;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
    error: "/api/auth/error",
  },
  secret: process.env.JWT_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET, // نفس السر للتشفير
    maxAge: 30 * 60, // مدة صلاحية التوكن بالثواني (30 دقيقة)
  },
});

export { handler as GET, handler as POST };
