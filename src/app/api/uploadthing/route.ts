import { createRouteHandler } from "uploadthing/next";
import { fileRouter } from "./core";

export const { GET, POST } = createRouteHandler({
	router: fileRouter,
	// If callback fails set this (should lead to prod domain. Need to move this domain to envs)
	// config: {
	// 	callbackUrl: "https://2klkn3md-3000.euw.devtunnels.ms/api/uploadthing",
	// },
});
