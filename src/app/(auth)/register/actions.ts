"use server";

import { auth } from "@/lib/auth";
import { withError } from "@/lib/utils";
import { registerSchema } from "@/lib/validation";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";
import { z } from "zod/v4";

export async function register(initialState: unknown, formData: FormData) {
	const payload = {
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password"),
	};

	const validatedFields = registerSchema.safeParse(payload);

	if (!validatedFields.success) {
		const zodError = z.treeifyError(validatedFields.error);

		return {
			success: false,
			payload: payload,
			errors: zodError.errors,
			properties: zodError.properties,
		};
	}

	const [, error] = await withError(
		() =>
			auth.api.signUpEmail({
				body: validatedFields.data,
			}),
		APIError
	);

	if (error) {
		return {
			success: false,
			payload: payload,
			errors: [error.message],
		};
	}

	redirect("/profile");
}
