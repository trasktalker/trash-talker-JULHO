import postgres from "postgres";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const sql = postgres(process.env.DATABASE_URL!);

async function main() {
  try {
    await sql`DROP TABLE IF EXISTS "demo_data" CASCADE;`;
    console.log("demo_data table dropped successfully.");
  } catch (err) {
    console.error("Error dropping table:", err);
  } finally {
    await sql.end();
  }
}

main();
