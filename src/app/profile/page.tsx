import { auth, session } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Avatar } from "./avatar";
import Image from "next/image";

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
			{userSession.user.image ? (
				<Image
					src={userSession.user.image}
					alt="User avatar"
					sizes="96px"
					width={100}
					height={100}
					objectFit="cover"
					className="size-24"
				/>
			) : (
				<p>No avatar yet</p>
			)}
			<Avatar />
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
