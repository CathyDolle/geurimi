import localFont from "next/font/local";


export const neuemontreal = localFont({
	src: [
		{
			path: './PPNeueMontreal-Regular.woff2',
			weight: 'normal',
			style: 'normal',
		},
		{
			path: './PPNeueMontreal-Medium.woff2',
			weight: '500',
			style: 'normal',
		},
	],
	variable: '--font-neue',
	fallback: ['sans-serif'],
})
