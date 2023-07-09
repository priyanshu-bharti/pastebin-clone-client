import React from "react";

const WebAppWrapper = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex flex-col min-h-screen">{children}</div>;
};

export default WebAppWrapper;
