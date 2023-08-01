"use client";

import Navbar from "@/components/navbar/Navbar";
import PageWrapper from "@/components/wrappers/PageWrapper";
import WebAppWrapper from "@/components/wrappers/WebAppWrapper";
import Snippet from "@/typings/types";
import { nanoid } from "nanoid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { createContext, useState } from "react";
import { RiAddLine, RiDashboardLine, RiInformationLine } from "react-icons/ri";

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

    return (
        <SnippetContext.Provider value={{ snippets, setSnippets }}>
            <WebAppWrapper>
                <Navbar />
                <PageWrapper>{children}</PageWrapper>
                <BottomNavigation />
            </WebAppWrapper>
        </SnippetContext.Provider>
    );
};

export const BottomNavigation = () => {
    const pathname = usePathname();

    return (
        <div className="btm-nav lg:hidden">
            <Link
                href="/create"
                className={`hover:text-secondary ${
                    pathname.includes("/create") && "active"
                }`}
            >
                <RiAddLine className="text-lg" />
                <span className="text-xs">Create</span>
            </Link>

            <Link
                href="/view"
                className={`hover:text-secondary ${
                    pathname.includes("/view") && "active"
                }`}
            >
                <RiDashboardLine className="text-lg" />
                <span className="text-xs">View</span>
            </Link>

            <Link
                href="/about"
                className={`hover:text-secondary  ${
                    pathname.includes("/about") && "active"
                }`}
            >
                <RiInformationLine className="text-lg" />
                <span className="text-xs">About</span>
            </Link>
        </div>
    );
};

export default ProtectedLayout;
