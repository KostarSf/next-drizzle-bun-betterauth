import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";

await mkdir(dirname(process.env.DB_FILE_NAME), { recursive: true });

if (process.env.NODE_ENV === "production") {
	console.log("Perform database migration...");
	await Bun.$`bun db:migrate`;
}
