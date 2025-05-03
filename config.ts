import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "~/env";

import { db } from "~/server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "~/server/db/schema";
import { eq } from "drizzle-orm";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      isAdmin: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    isAdmin: boolean;
  }
}

// Simple in-memory user store for development/preview
const mockUsers = new Map();

// Add the admin user to the mock store
mockUsers.set("admin@deriv-bots.com", {
  id: "admin-user-id",
  name: "Admin",
  email: "admin@deriv-bots.com",
  isAdmin: true,
});

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    DiscordProvider,
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Handle the special admin login case
        if (
          credentials?.email === "admin@deriv-bots.com" &&
          credentials?.password === "Prince@001"
        ) {
          // Use the mock user in development/preview
          const isDevOrPreview = env.NODE_ENV !== "production" || !env.DATABASE_URL;

          if (isDevOrPreview) {
            return mockUsers.get("admin@deriv-bots.com");
          }

          // In production, use the real database
          const existingAdmin = await db.query.users.findFirst({
            where: eq(users.email, "admin@deriv-bots.com"),
          });

          if (existingAdmin) {
            return {
              id: existingAdmin.id,
              name: "Admin",
              email: "admin@deriv-bots.com",
              isAdmin: true,
            };
          }

          // Create the admin user if it doesn't exist
          const userId = crypto.randomUUID();
          await db.insert(users).values({
            id: userId,
            name: "Admin",
            email: "admin@deriv-bots.com",
            isAdmin: true,
          });

          return {
            id: userId,
            name: "Admin",
            email: "admin@deriv-bots.com",
            isAdmin: true,
          };
        }

        // For demo purposes, allow a test user login
        if (
          credentials?.email === "user@example.com" &&
          credentials?.password === "password"
        ) {
          return {
            id: "test-user-id",
            name: "Test User",
            email: "user@example.com",
            isAdmin: false,
          };
        }

        return null;
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  // Only use the adapter in production
  ...(env.NODE_ENV === "production" && env.DATABASE_URL
    ? {
        adapter: DrizzleAdapter(db, {
          usersTable: users,
          accountsTable: accounts,
          sessionsTable: sessions,
          verificationTokensTable: verificationTokens,
        }),
      }
    : {}),
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id,
        isAdmin: token.isAdmin as boolean,
      },
    }),
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
