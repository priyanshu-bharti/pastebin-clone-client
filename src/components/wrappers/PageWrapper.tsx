import React from "react";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex-1 p-4 grid mb-16 lg:mb-0">{children}</div>;
};

export default PageWrapper;
