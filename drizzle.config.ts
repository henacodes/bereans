import { defineConfig } from "drizzle-kit";
import "dotenv/config"; // Ensure variables are loaded

export default defineConfig({
  schema: "./src/db/schema",
  out: "./src/db/migrations",
  dialect: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
});
