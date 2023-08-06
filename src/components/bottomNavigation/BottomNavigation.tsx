import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiAddLine, RiDashboardLine, RiInformationLine } from "react-icons/ri";

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
