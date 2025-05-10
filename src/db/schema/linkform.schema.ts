import { pgTable, text, timestamp, boolean, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { folders } from './folder.schema';
import { users } from './users.schema';

export const linkforms = pgTable('linkforms', {
  id: text('secret_id').primaryKey().default(sql`gen_random_uuid()`),
  title: text('title').notNull(),
  description: text('description').notNull(),
  links: text('links').notNull(),
  tobefind: boolean('tobefind').notNull().default(false),
  userID: text('user_id').notNull().references(() => users.id),
  folderID: text('folder_id').references(() => folders.id),
  deletedAt: timestamp('deleted_at'),
  isDeleted: boolean('is_deleted').notNull().default(false),
  body: text('body'),
  imgurl: text('imgurl'),
  createdAt: timestamp('created_at').notNull().defaultNow()
}, (t) => [
  index('linkforms_users_idx').on(t.userID)
]);