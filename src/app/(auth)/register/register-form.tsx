"use client";

import { useActionState } from "react";
import { register } from "./actions";

export function RegisterForm() {
	const [state, formAction, pending] = useActionState(register, undefined);

	return (
		<form action={formAction} className="w-full">
			<div className="grid gap-2">
				<input
					name="name"
					autoComplete="username"
					placeholder="name"
					defaultValue={state?.payload?.name?.toString()}
					className="border"
				/>
				<p aria-live="polite">{state?.properties?.name?.errors}</p>
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
					autoComplete="new-password"
					placeholder="Password"
					defaultValue={state?.payload?.password?.toString()}
					className="border"
				/>
				<p aria-live="polite">{state?.properties?.password?.errors}</p>
				<button type="submit" className="border" disabled={pending}>
					{pending ? "Please wait" : "Register"}
				</button>
				<p aria-live="polite">{state?.errors}</p>
			</div>
		</form>
	);
}
