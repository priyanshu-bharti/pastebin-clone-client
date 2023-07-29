"use client";

import DashboardCard from "@/components/dashboardCard/DashboardCard";
import React, { useEffect } from "react";
import axios from "axios";

const ViewPage = () => {
    useEffect(() => {
        getUserSnippetsFromDb();
    }, []);

    async function getUserSnippetsFromDb() {
        axios.get("http://localhost:5002/v1/api/")
    }

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
                
            </div>
        </div>
    );
};

export default ViewPage;
