import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
    RiAddLine,
    RiDashboardLine,
    RiInformationLine,
    RiMenu4Line,
} from "react-icons/ri";

const Navbar = () => {
    const pathname = usePathname();

    return (
        <div className="navbar bg-base-100 border-b border-b-base-content border-opacity-20">
            <div className="navbar-start">
                <a
                    href="#"
                    className="pl-4 normal-case text-xl font-bold transition hover:scale-105 hover:text-primary"
                >
                    ShareSnip
                </a>
            </div>

            <div
                className={`navbar-center hidden ${
                    !pathname.includes("/public/") && "lg:flex"
                }`}
            >
                <ul className="menu menu-horizontal px-1 gap-4">
                    <li className="">
                        <Link href="/create" className="hover:text-secondary">
                            <RiAddLine />
                            Create
                        </Link>
                    </li>
                    <li className="">
                        <Link href="/view" className="hover:text-secondary">
                            <RiDashboardLine />
                            View
                        </Link>
                    </li>
                    <li className="">
                        <Link href="/view" className="hover:text-secondary">
                            <RiInformationLine />
                            About
                        </Link>
                    </li>
                </ul>
            </div>

            <div
                className={`navbar-end ${
                    pathname.includes("/public/") && "hidden"
                }`}
            >
                <div className="flex gap-2 items-center justify-center pr-4">
                    <div className="grid place-items-center grid-flow-col gap-4 h-[32px] w-[32px] relative">
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
