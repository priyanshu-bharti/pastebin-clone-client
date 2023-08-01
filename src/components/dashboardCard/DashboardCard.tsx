import Link from "next/link";
import React from "react";

const DashboardCard = ({
    id,
    title,
    data,
}: {
    id?: string;
    title?: string;
    data?: string;
}) => {
    return (
        <>
            <div className="card max-h-60 bg-neutral text-base-content">
                <div className="card-body">
                    <h2 className="card-title line-clamp-1 ">{title}</h2>
                    <pre className="line-clamp-6 text-xs">{data}</pre>
                    <div className="card-actions justify-end pt-4">
                        <Link href={`/paste/${id}`} className="btn btn-primary">
                            View/Edit
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardCard;
