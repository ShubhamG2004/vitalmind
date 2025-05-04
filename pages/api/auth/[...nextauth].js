import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import { compare } from 'bcryptjs';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Connect to MongoDB
          const client = await clientPromise;
          const db = client.db();
          
          // Find user by email
          const user = await db.collection('users').findOne({
            email: credentials.email.toLowerCase()
          });

          if (!user) {
            throw new Error('No user found with this email');
          }

          // Verify password
          const isValid = await compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error('Invalid password');
          }

          // Return user object without password
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile"
        }
      },
      httpOptions: {
        timeout: 30000
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, 
    updateAge: 24 * 60 * 60 
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin" // Error code passed in query string as ?error=
  },
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },
  events: {
    async createUser({ user }) {
      console.log('User created:', user.email);
    },
    async signIn({ user, account, profile }) {
      console.log('User signed in:', user.email);
    },
    async signOut({ token, session }) {
      console.log('User signed out:', token.email);
    }
  },
  debug: process.env.NODE_ENV === 'development'
});