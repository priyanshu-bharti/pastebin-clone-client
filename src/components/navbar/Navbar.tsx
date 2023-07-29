import { UserButton, useAuth } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import React from "react";

const Navbar = () => {
    const { getToken } = useAuth();
    function testAuth() {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5002/v1/api/paste/public/7214146262",
                    {
                        /* headers: {
                            Authorization: `Bearer ${await getToken()}`,
                        }, */
                    }
                );

                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        console.log("Connecting to the server...");
        fetchData();
    }

    return (
        <div className="p-4 bg-neutral-200 flex justify-between items-center">
            {/* Branding */}
            <div className="">ShareSnip</div>

            {/* Nav Links */}
            <ul className="flex gap-8 items-center">
                <li className="">
                    <Link href="/create">Create</Link>
                </li>
                <li className="">
                    <Link href="/view">View</Link>
                </li>
                <li className="">
                    <Link href="/view">About</Link>
                </li>
                <li className="bg-slate-500 text-white px-4">
                    <button onClick={testAuth}>Special Button</button>
                </li>
            </ul>

            <div className="flex gap-4 items-center justify-center">
                <div className="grid place-items-center grid-flow-col gap-4 min-h-[32px] min-w-[32px] relative">
                    <div className="absolute h-full w-full bg-gray-400 rounded-full"></div>
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
