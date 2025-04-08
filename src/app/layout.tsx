import type { Metadata } from "next";
import { courier } from "@/fonts/Courier";
import "@/style/globals.scss";
import logo from "@/assets/images/logo.svg";
import { Lenis, Grid, GsapScrollTrigger, Menu } from "@/ui/components";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Geurimi Café",
  description: "Coffee shop in Paris with concept art",
  icons: {
    icon: logo.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${courier.variable} ${courier.variable} font-serif text-black antialiased bg-gray`}
      >
        <Menu />
        <main id="content" tabIndex={-1}>
          {children}
        </main>
        <Grid />
        <GsapScrollTrigger />
        <Lenis key={`lenis${(children as React.ReactElement)?.key}`} />
      </body>
    </html>
  );
}
