"use server";

import { auth } from "@/lib/auth";
import { withError } from "@/lib/utils";
import { loginSchema } from "@/lib/validation";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";
import { z } from "zod/v4";

export async function login(initialState: unknown, formData: FormData) {
	const payload = {
		email: formData.get("email"),
		password: formData.get("password"),
	};

	const validatedFields = loginSchema.safeParse(payload);

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
			auth.api.signInEmail({
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
