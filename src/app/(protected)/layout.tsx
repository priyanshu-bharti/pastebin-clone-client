"use client";

import { BottomNavigation } from "@/components/bottomNavigation/BottomNavigation";
import Navbar from "@/components/navbar/Navbar";
import PageWrapper from "@/components/wrappers/PageWrapper";
import WebAppWrapper from "@/components/wrappers/WebAppWrapper";
import Snippet from "@/typings/types";
import { nanoid } from "nanoid";
import { usePathname } from "next/navigation";
import React, { createContext, useState } from "react";

export const SnippetContext = createContext<any>(null);

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    const [snippets, setSnippets] = useState<Snippet[]>([
        {
            pasteId: nanoid(8),
            title: "Snippet Title",
            data: "Some Snippet Data",
            isAnonymous: false,
            expiresOn: Date.now(),
        } as Snippet,
    ]);

    const pathname = usePathname();

    return (
        <SnippetContext.Provider value={{ snippets, setSnippets }}>
            <WebAppWrapper>
                <Navbar />
                <PageWrapper>{children}</PageWrapper>
                {!pathname.includes("public") && <BottomNavigation />}
            </WebAppWrapper>
        </SnippetContext.Provider>
    );
};

export default ProtectedLayout;
