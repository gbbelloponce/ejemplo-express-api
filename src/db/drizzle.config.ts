import 'dotenv/config';

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/tables/*",
  out: "./src/db/migrations/",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
