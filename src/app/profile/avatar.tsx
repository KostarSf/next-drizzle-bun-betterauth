"use client";

import { UploadButton } from "@/lib/utils/uploadthing";
import { useRouter } from "next/navigation";

export function Avatar() {
	const router = useRouter();

	return (
		<div>
			<UploadButton
				endpoint="avatarUploader"
				onClientUploadComplete={(res) => {
					console.log("Files:", res);
					router.refresh();
				}}
				onUploadError={(error) => {
					alert(`ERROR! ${error.message}`);
				}}
			/>
		</div>
	);
}
