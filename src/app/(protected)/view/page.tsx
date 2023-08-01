"use client";

import DashboardCard from "@/components/dashboardCard/DashboardCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/nextjs";

const ViewPage = () => {
    const { getToken } = useAuth();
    const [pastes, setPastes] = useState<any>([]);
    const [searchToken, setSearchToken] = useState<string>("");
    const { user } = useUser();

    useEffect(() => {
        getUserSnippetsFromDb().then((data) => setPastes(data));
    }, []);

    async function getUserSnippetsFromDb() {
        if (user) {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/v1/api/paste/user/${user.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${await getToken()}`,
                    },
                }
            );
            const snippets = await response.data;
            return await snippets.success[0].pastes;
        }
        return [];
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex gap-4">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Search for Snippets</span>
                    </label>
                    <input
                        type="search"
                        name="search"
                        id="search"
                        className="input input-bordered w-full"
                        value={searchToken}
                        onChange={(e) => setSearchToken(e.target.value)}
                    />
                </div>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
                {pastes.length ? (
                    pastes
                        .filter((paste: any) =>
                            paste.title.toLowerCase().includes(searchToken)
                        )
                        .map((paste: any) => (
                            <DashboardCard
                                id={paste.pasteId}
                                data={paste.data}
                                key={paste.pasteId}
                                title={paste.title}
                            />
                        ))
                ) : (
                    <p className="col-span-4 text-center">
                        You don't seem to have any pastes, try refreshing your
                        browser, OR create a new paste from the link above.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ViewPage;
