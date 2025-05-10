import { pgTable, text, timestamp, boolean, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import {  users } from './users.schema';

export const folders = pgTable('folders', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  name: text('name').notNull(),
  secretKey: text('secret_key').notNull().unique().default(sql`gen_random_uuid()`),
  userID: text('user_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
  isDeleted: boolean('is_deleted').notNull().default(false)
}, (t) => [
  index('folders_user_idx').on(t.userID)
]);