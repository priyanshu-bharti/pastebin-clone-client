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
                <body className={sansFont.className}>{children}</body>
            </html>
        </ClerkProvider>
    );
}
