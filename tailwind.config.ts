import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/lib/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/types/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/config/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/ui/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/style/**/*.{js,ts,jsx,tsx,mdx}',
	],
	presets: [
		require('./src/config/tailwind/main'),
	],
};
export default config;
