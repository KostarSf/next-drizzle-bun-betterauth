import db from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema";
import { headers } from "next/headers";
import { nextCookies } from "better-auth/next-js";

const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite",
		schema: schema,
		usePlural: true,
	}),
	plugins: [nextCookies()],
	emailAndPassword: {
		enabled: true,
	},
});

const session = async () => {
	return auth.api.getSession({
		headers: await headers(),
	});
};

export { auth, session };
