import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
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
                    <Link href="/paste/display">Public View</Link>
                </li>
            </ul>

            <div className="grid place-items-center grid-flow-col gap-4 min-h-[32px] min-w-[32px] relative">
                <div className="absolute h-full w-full bg-gray-400 rounded-full"></div>
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    );
};

export default Navbar;
