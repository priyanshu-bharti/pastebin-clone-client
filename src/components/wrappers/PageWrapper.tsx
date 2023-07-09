import React from "react";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex-1 p-4 grid">{children}</div>;
};

export default PageWrapper;
