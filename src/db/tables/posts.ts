import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { usersTable } from "./users";

export const postsTable = pgTable('posts', {
  id: uuid().primaryKey().defaultRandom(),
  content: text().notNull(),
  // Referencia userId con la tabla users
  authorId: uuid().references(() => usersTable.id).notNull(),
  createdAt: timestamp().defaultNow(),
  deletedAt: timestamp()
})

// Indicamos las relaciones de nuestra tabla posts con otras tablas, en este caso:
// one post -> many users, tambien indicamos el campo que se utilizara para referenciar
export const postsTableRelations = relations(postsTable, ({ one }) => ({
  author: one(usersTable, {
    fields: [postsTable.authorId],
    references: [usersTable.id]
  })
}));

export type Post = typeof postsTable.$inferSelect;
export type PostCreate = typeof postsTable.$inferInsert;