"use client";

import { useActionState } from "react";
import { login } from "./actions";

export function LoginForm() {
	const [state, formAction, pending] = useActionState(login, undefined);

	return (
		<form action={formAction} className="w-full">
			<div className="grid gap-2">
				<input
					type="email"
					name="email"
					autoComplete="email"
					placeholder="Email"
					defaultValue={state?.payload?.email?.toString()}
					className="border"
				/>
				<p aria-live="polite">{state?.properties?.email?.errors}</p>
				<input
					type="password"
					name="password"
					autoComplete="current-password"
					placeholder="Password"
					defaultValue={state?.payload?.password?.toString()}
					className="border"
				/>
				<p aria-live="polite">{state?.properties?.password?.errors}</p>
				<button type="submit" className="border" disabled={pending}>
					{pending ? "Please wait" : "Sign In"}
				</button>
				<p aria-live="polite">{state?.errors}</p>
			</div>
		</form>
	);
}
