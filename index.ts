import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "~/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
  mockDb: Record<string, unknown[]> | undefined;
};

// Create a mock database for development/preview
const createMockDb = () => {
  // If we already have a mock database, return it
  if (globalForDb.mockDb) return globalForDb.mockDb;

  // Create a minimal mock database with empty collections
  const mockDb: Record<string, unknown[]> = {
    users: [],
    accounts: [],
    sessions: [],
    verificationTokens: [],
    bots: [],
    pdfs: [],
    adminCredentials: [],
  };

  // Add the admin user
  mockDb.users.push({
    id: "admin-user-id",
    name: "Admin",
    email: "admin@deriv-bots.com",
    isAdmin: true,
    createdAt: new Date(),
  });

  // Store in the global object to persist between HMR updates
  globalForDb.mockDb = mockDb;
  return mockDb;
};

// Use a proxy to make it seem like we're using a real database
const createMockConnection = () => {
  const mockDb = createMockDb();

  return {
    query: {
      // Mock the query functions with empty results
      users: {
        findFirst: async () => null,
        findMany: async () => [] as any[],
      },
      bots: {
        findFirst: async () => null,
        findMany: async () => [] as any[],
      },
      pdfs: {
        findFirst: async () => null,
        findMany: async () => [] as any[],
      },
      adminCredentials: {
        findFirst: async () => null,
        findMany: async () => [] as any[],
      },
    },
    // Mock other database operations
    insert: async () => ({}),
    update: async () => ({}),
    delete: async () => ({}),
    // Add the schema
    schema,
  };
};

// In development or without a database URL, use the mock database
const isDevOrPreview = env.NODE_ENV !== "production" || !env.DATABASE_URL;

let dbInstance;

if (isDevOrPreview) {
  console.log("Using mock database for development/preview");
  dbInstance = createMockConnection();
} else {
  // In production, use the real database
  const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
  if (env.NODE_ENV !== "production") globalForDb.conn = conn;
  dbInstance = drizzle(conn, { schema });
}

export const db = dbInstance;
