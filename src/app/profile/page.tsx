import { auth, session } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function Page() {
	const userSession = await session();
	if (!userSession) {
		redirect("/login");
	}

	return (
		<div>
			<p className="whitespace-pre-wrap font-mono">
				{JSON.stringify(userSession, null, 4)}
			</p>
			<form
				action={async () => {
					"use server";

					await auth.api.signOut({
						headers: await headers(),
					});
				}}
			>
				<button>Logout</button>
			</form>
		</div>
	);
}
