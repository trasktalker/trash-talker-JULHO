// src/db/index.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Configuração para PostgreSQL
const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client);
