import { z } from "zod/v4";

const loginSchema = z.object({
	email: z.email({
		error: "Invalid Email",
	}),
	password: z.string().min(4, { error: "The password to short" }),
});

const registerSchema = loginSchema.extend({
	name: z.string().min(3),
});

export { loginSchema, registerSchema };
