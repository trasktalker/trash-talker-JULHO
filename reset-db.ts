import postgres from "postgres";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const sql = postgres(process.env.DATABASE_URL!);

async function main() {
  try {
    await sql`DROP SCHEMA public CASCADE;`;
    await sql`CREATE SCHEMA public;`;
    await sql`GRANT ALL ON SCHEMA public TO postgres;`;
    await sql`GRANT ALL ON SCHEMA public TO public;`;
    console.log("Database schema reset successfully.");
  } catch (err) {
    console.error("Error resetting schema:", err);
  } finally {
    await sql.end();
  }
}

main();
