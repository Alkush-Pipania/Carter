import { defineConfig } from "drizzle-kit";
import "dotenv/config"

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/**.schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.AUTH_DRIZZLE_URL!,
  },
  
})