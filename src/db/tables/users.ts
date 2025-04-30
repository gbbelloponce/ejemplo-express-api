import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { postsTable } from "./posts";

export const usersTable = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  firstName: text().notNull(),
  lastName: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  createdAt: timestamp().defaultNow(),
  deletedAt: timestamp()
})

// Indicamos las relaciones de nuestra tabla users con otras tablas, en este caso:
// one user -> many posts
export const usersTableRelations = relations(usersTable, ({ many }) => ({
  posts: many(postsTable)
}));

export type User = typeof usersTable.$inferSelect;
export type UserCreate = typeof usersTable.$inferInsert;