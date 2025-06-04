import db from "@/db";
import { auth } from "@/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";

const f = createUploadthing();

export const fileRouter = {
	avatarUploader: f({
		image: {
			maxFileSize: "2MB",
			maxFileCount: 1,
		},
	})
		.middleware(async ({ req }) => {
			const session = await auth.api.getSession({
				headers: req.headers,
			});

			if (!session) {
				throw new UploadThingError("Unautharized");
			}

			return { userId: session.user.id };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			console.log(`Upload complete for userId: ${metadata.userId}`);
			console.log(`File url: ${file.ufsUrl}`);

			await db
				.update(schema.users)
				.set({ image: file.ufsUrl })
				.where(eq(schema.users.id, metadata.userId));

			return { uploadedBy: metadata.userId };
		}),
} satisfies FileRouter;

export type AppFileRouter = typeof fileRouter;
