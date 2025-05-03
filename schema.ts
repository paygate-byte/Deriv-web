import { relations, sql } from "drizzle-orm";
import { index, pgTableCreator, primaryKey } from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `deriv-bots-platform_${name}`);

export const users = createTable("user", (d) => ({
  id: d
    .varchar({ length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: d.varchar({ length: 255 }),
  email: d.varchar({ length: 255 }).notNull(),
  emailVerified: d
    .timestamp({
      mode: "date",
      withTimezone: true,
    })
    .default(sql`CURRENT_TIMESTAMP`),
  image: d.varchar({ length: 255 }),
  isAdmin: d.boolean().default(false),
  createdAt: d.timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}));

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  bots: many(bots),
  pdfs: many(pdfs),
}));

export const accounts = createTable(
  "account",
  (d) => ({
    userId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id),
    type: d.varchar({ length: 255 }).$type<AdapterAccount["type"]>().notNull(),
    provider: d.varchar({ length: 255 }).notNull(),
    providerAccountId: d.varchar({ length: 255 }).notNull(),
    refresh_token: d.text(),
    access_token: d.text(),
    expires_at: d.integer(),
    token_type: d.varchar({ length: 255 }),
    scope: d.varchar({ length: 255 }),
    id_token: d.text(),
    session_state: d.varchar({ length: 255 }),
  }),
  (t) => [
    primaryKey({ columns: [t.provider, t.providerAccountId] }),
    index("account_user_id_idx").on(t.userId),
  ]
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  (d) => ({
    sessionToken: d.varchar({ length: 255 }).notNull().primaryKey(),
    userId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id),
    expires: d.timestamp({ mode: "date", withTimezone: true }).notNull(),
  }),
  (t) => [index("t_user_id_idx").on(t.userId)]
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  (d) => ({
    identifier: d.varchar({ length: 255 }).notNull(),
    token: d.varchar({ length: 255 }).notNull(),
    expires: d.timestamp({ mode: "date", withTimezone: true }).notNull(),
  }),
  (t) => [primaryKey({ columns: [t.identifier, t.token] })]
);

// New tables for Deriv bots platform

export const bots = createTable(
  "bot",
  (d) => ({
    id: d.serial().primaryKey(),
    name: d.varchar({ length: 255 }).notNull(),
    description: d.text(),
    filePath: d.varchar({ length: 255 }).notNull(),
    fileSize: d.integer(),
    downloadCount: d.integer().default(0),
    uploadedById: d.varchar({ length: 255 }).notNull().references(() => users.id),
    createdAt: d.timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("bot_uploaded_by_idx").on(t.uploadedById),
    index("bot_name_idx").on(t.name),
  ]
);

export const botsRelations = relations(bots, ({ one }) => ({
  uploadedBy: one(users, { fields: [bots.uploadedById], references: [users.id] }),
}));

export const pdfs = createTable(
  "pdf",
  (d) => ({
    id: d.serial().primaryKey(),
    title: d.varchar({ length: 255 }).notNull(),
    description: d.text(),
    filePath: d.varchar({ length: 255 }).notNull(),
    fileSize: d.integer(),
    downloadCount: d.integer().default(0),
    uploadedById: d.varchar({ length: 255 }).notNull().references(() => users.id),
    createdAt: d.timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("pdf_uploaded_by_idx").on(t.uploadedById),
    index("pdf_title_idx").on(t.title),
  ]
);

export const pdfsRelations = relations(pdfs, ({ one }) => ({
  uploadedBy: one(users, { fields: [pdfs.uploadedById], references: [users.id] }),
}));

// This is for database migrations
export const adminCredentials = createTable(
  "admin_credential",
  (d) => ({
    id: d.serial().primaryKey(),
    username: d.varchar({ length: 255 }).notNull().unique(),
    password: d.varchar({ length: 255 }).notNull(),
    createdAt: d.timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  }),
  (t) => [
    index("admin_username_idx").on(t.username),
  ]
);
