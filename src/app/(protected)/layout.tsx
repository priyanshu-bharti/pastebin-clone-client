"use client";

import Navbar from "@/components/navbar/Navbar";
import PageWrapper from "@/components/wrappers/PageWrapper";
import WebAppWrapper from "@/components/wrappers/WebAppWrapper";
import { Snippet } from "@/typings/types";
import { nanoid } from "nanoid";
import React, { createContext, useState } from "react";

export const SnippetContext = createContext<any>(null);

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    const [snippets, setSnippets] = useState<Snippet[]>([
        {
            id: nanoid(8),
            title: "Snippet Title",
            data: "Some Snippet Data",
            anonymous: false,
            expires: new Date(),
        } as Snippet,
    ]);

    return (
        <SnippetContext.Provider value={{ snippets, setSnippets }}>
            <WebAppWrapper>
                <Navbar />
                <PageWrapper>{children}</PageWrapper>
            </WebAppWrapper>
        </SnippetContext.Provider>
    );
};

export default ProtectedLayout;
