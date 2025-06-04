import { drizzle } from 'drizzle-orm/bun-sqlite';
import { $ } from 'bun';

if (process.env.NODE_ENV === "production") {
    await $`bun db:migrate`;
}

export default drizzle(process.env.DB_FILE_NAME);
