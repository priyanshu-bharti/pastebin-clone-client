"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RedirectionPage = () => {
    const { replace } = useRouter();
    useEffect(() => {
        replace(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/create`);
    }, []);
};

export default RedirectionPage;
