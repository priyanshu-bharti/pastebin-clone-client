"use client";

import DashboardCard from "@/components/dashboardCard/DashboardCard";
import React, { useContext } from "react";
import { SnippetContext } from "../layout";
import Snippet from "@/typings/types";

const ViewPage = () => {
    const { snippets } = useContext(SnippetContext);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex">
                <input
                    type="search"
                    name="search"
                    id="search"
                    className="border w-full"
                />
                <button className="bg-neutral-100 px-4 py-2">Search</button>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
                {snippets.map((snippet: Snippet) => (
                    <DashboardCard
                        title={snippet.title}
                        data={snippet.data}
                        id={snippet.pasteId}
                        key={snippet.pasteId}
                    />
                ))}
            </div>
        </div>
    );
};

export default ViewPage;
