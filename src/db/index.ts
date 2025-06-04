import { drizzle } from "drizzle-orm/bun-sqlite";

export default drizzle(process.env.DB_FILE_NAME);
