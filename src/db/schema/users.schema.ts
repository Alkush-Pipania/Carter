import { pgTable, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text('email').notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  password : text('password'),
  name: text("name"),
  verified: boolean('verified').notNull().default(false),
  image: text('image'),
  subscription: text('subscription').notNull().default('free'),
  credit : integer('credit').notNull().default(10),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});