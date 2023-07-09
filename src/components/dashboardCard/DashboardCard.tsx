import Link from "next/link";
import React from "react";

const DashboardCard = ({
    id = "test",
    title = "Test Card Title",
    data = "Some Random Card Data that goes like this: lorem ipsum sit amet dolor consectetur. I don't even know what I am trying to do with this project.",
}: {
    id?: string;
    title?: string;
    data?: string;
}) => {
    return (
        <div className="p-4 max-h-60 bg-neutral-100 flex flex-col gap-4">
            <h4 className="">{title}</h4>
            <p className="line-clamp-3">{data}</p>
            <Link
                href={`/paste/${id}`}
                className="bg-neutral-300 px-4 py-2 self-end"
            >
                View/Edit
            </Link>
        </div>
    );
};

export default DashboardCard;
