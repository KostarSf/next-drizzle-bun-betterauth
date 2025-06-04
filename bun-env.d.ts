declare module "bun" {
	interface Env {
		DB_FILE_NAME: string;
		BETTER_AUTH_SECRET: string;
		BETTER_AUTH_URL: string;
	}
}
