import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { usersTable } from "./users";

export const postsTable = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  content: text('content').notNull(),
  userId: uuid('userId').references(() => usersTable.id).notNull(),
  createdAt: timestamp().defaultNow(),
  deletedAt: timestamp()
})

export type Post = typeof postsTable.$inferSelect;
export type PostCreate = typeof postsTable.$inferSelect;