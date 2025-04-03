import localFont from "next/font/local";


export const courier = localFont({
	src: [
		{
			path: './courier.woff2',
			weight: 'normal',
			style: 'normal',
		},
	],
	variable: '--font-courier',
	fallback: ['serif'],
})
