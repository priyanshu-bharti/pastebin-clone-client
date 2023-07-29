"use client";

import QRCode from "react-qr-code";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { SnippetContext } from "../../layout";
import Snippet from "@/typings/types";

const ViewPastePage = ({ params }: { params: { slug: string } }) => {
    const { snippets } = useContext(SnippetContext);
    const [snippet, setSnippet] = useState<Snippet | null>(null);

    useEffect(() => {
        const data = snippets.find(
            (snip: Snippet) => snip.pasteId === params.slug
        );
        setSnippet(data);
        console.log(snippet);
    }, [snippet]);

    function diffDate(after: number, before: number): number {
        const time = after - before;
        const days = time / (1000 * 3600 * 24);
        return Math.round(days);
    }

    return (
        <>
            {
                <div className="md:grid md:grid-cols-3 flex flex-col-reverse gap-4">
                    <textarea
                        name="snippet"
                        id="snippet"
                        cols={30}
                        rows={10}
                        // onChange={handleDataChange}
                        placeholder="Enter Snippet Here..."
                        className="border flex-1 col-span-2"
                        value={snippet?.data}
                        readOnly
                    ></textarea>
                    <div className="flex flex-col gap-4">
                        <div className="">Snippet Information</div>
                        <div className="">
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Enter Title"
                                // onChange={handleTitleChange}
                                className="border w-full"
                                value={snippet?.title}
                                readOnly
                            />
                        </div>

                        {/* Share information */}

                        <div className="pt-4">Share Snippet</div>
                        <div className="">
                            <input
                                type="text"
                                name="share-url"
                                id="share-url"
                                placeholder={`http://localhost:3000/public/${params.slug}`}
                                // onChange={handleTitleChange}
                                className="border w-full"
                                value={`http://localhost:3000/public/${params.slug}`}
                                readOnly
                            />
                        </div>
                        <QRCode
                            value={`http://localhost:3000/public/${params.slug}`}
                        />
                    </div>
                </div>
            }
        </>
    );
};

export default ViewPastePage;
