import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [new URL("https://rt3r5n3u10.ufs.sh/f/**")],
	},
};

export default nextConfig;
