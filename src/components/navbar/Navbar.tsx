import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

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

            <div className="flex gap-8 item-center">
                <UserButton afterSignOutUrl="/" />
                <button className="bg-white px-4 py-2">Log Out</button>
            </div>
        </div>
    );
};

export default Navbar;
