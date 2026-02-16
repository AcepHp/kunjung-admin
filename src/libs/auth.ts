import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";
import axios from "./axios";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {},
      async authorize(credentials) {
        if (credentials) {
          return credentials;
        }
        return null;
      },
    }),
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //   authorization: {
    //     params: {
    //       prompt: "consent",
    //       access_type: "offline",
    //       response_type: "code",
    //     },
    //   },
    //   async profile(profile) {
    //     const userData = {
    //       username: profile.given_name,
    //       email: profile.email,
    //       password: profile.at_hash,
    //       avatar: profile.picture,
    //     };

    //     try {
    //       const res = await axios.post("/auth/google", userData);
    //       const user = res.data.data;
    //       const token = res.data.access_token;

    //       return {
    //         id: user.id,
    //         username: user.username,
    //         email: user.email,
    //         avatar: user.avatar,
    //         accessToken: token,
    //         // ...user, // kalau mau bawa data lain ke JWT
    //       };
    //     } catch (err) {
    //       console.error("Error during Google auth:", err);
    //       return {
    //         id: profile.sub,
    //         username: profile.username || profile.given_name || "No Name",
    //         email: profile.email,
    //         avatar: profile.picture,
    //       };
    //     }
    //   },
    // }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.avatar = user.avatar;
        token.accessToken = user.accessToken;
      }
      if (account?.provider === "google" && profile?.email) {
        try {
          const { data: existingUser } = await axios.get(
            `/users/user-email/${profile.email}`
          );

          if (existingUser) {
            token.id = existingUser.id;
            token.email = existingUser.email;
            token.role = existingUser.role;
            token.firstName = existingUser.firstName;
            token.lastName = existingUser.lastName;
            token.avatar = existingUser.avatar;
          }
        } catch (err) {
          console.error("Error during Google login:", err);
        }
      }
      return token;
    },
    async session({ token, session }: { token: JWT; session: Session }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        role: token.role as string,
        firstName: token.firstName as string,
        lastName: token.lastName as string,
        avatar: token.avatar as string,
      };
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
});