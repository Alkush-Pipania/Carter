import { index, pgTable, serial, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const forgotPasswords = pgTable('forgot_passwords', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  email: text('email').notNull(),
  token: text('token').notNull(),
  expires: timestamp('expires').notNull()
}, (t)=>[
  index('email_token_idx').on(t.email, t.token)
]);


export const fallbackImages = pgTable('fallback_images', {
  id: serial('id').primaryKey(),
  imgurl: text('imgurl').notNull(),
});
