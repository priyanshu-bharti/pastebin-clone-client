import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const sansFont = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ShareSnip Frontend",
    description: "Simple Snippet Sharing System",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/icon.png" />
                <meta name="theme-color" content="#eb6f92" />
                <meta name="mobile-web-app-capable" content="yes" />
                <body className={sansFont.className}>{children}</body>
            </html>
        </ClerkProvider>
    );
}
