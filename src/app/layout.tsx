import type { Metadata } from "next";
import { neuemontreal } from "@/fonts/NeueMontreal";
import "@/style/globals.scss";
import { Lenis, Grid, Header, Footer, GsapScrollTrigger } from '@/ui/components'
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Starter 2025",
	description: "Starter 2025",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			{/* {process.env.NODE_ENV !== 'production' && (
				<head>
					<script src='https://unpkg.com/react-scan/dist/auto.global.js' async />
				</head>
			)} */}
			<body
				className={`${neuemontreal.variable} ${neuemontreal.variable} antialiased`}
			>
				<Suspense>
					<Header />
				</Suspense>
				<main id="content" tabIndex={-1}>{children}</main>
				<Suspense>
					<Footer />
				</Suspense>
				<Grid />
				<GsapScrollTrigger />
				<Lenis key={`lenis${(children as React.ReactElement)?.key}`} />
			</body>
		</html>
	);
}
