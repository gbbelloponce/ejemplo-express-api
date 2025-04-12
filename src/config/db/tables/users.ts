import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  firstName: text('firstName').notNull(),
  lastName: text('lastName').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp().defaultNow(),
  deletedAt: timestamp()
})

export type User = typeof usersTable.$inferSelect;
export type UserCreate = typeof usersTable.$inferInsert;