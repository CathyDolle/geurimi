import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	eslint: {ignoreDuringBuilds: true},
	typescript: {ignoreBuildErrors: true},
	images: {
		deviceSizes: [640, 960, 1200, 1920, 2400],
		imageSizes: [48, 96, 160, 320],
		formats: process.env.NODE_ENV === 'production' ? ['image/avif', 'image/webp'] : undefined,
		loader: 'default',
	},
	reactStrictMode: true,
};

export default nextConfig;
