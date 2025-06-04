import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";

await mkdir(dirname(process.env.DB_FILE_NAME), { recursive: true });

const sqlite = new Database(process.env.DB_FILE_NAME);
const db = drizzle(sqlite);
migrate(db, { migrationsFolder: "./drizzle" });
