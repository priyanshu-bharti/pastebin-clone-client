"use client";

import QRCode from "react-qr-code";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { SnippetContext } from "../../layout";
import { Snippet } from "@/typings/types";

const ViewPastePage = ({ params }: { params: { slug: string } }) => {
    const { snippets } = useContext(SnippetContext);
    const [snippet, setSnippet] = useState<Snippet | null>(null);

    useEffect(() => {
        const data = snippets.find((snip: Snippet) => snip.id === params.slug);
        setSnippet(data);
        console.log(snippet);
    }, [snippet]);

    function diffDate(after: Date, before: Date): number {
        const time = after.getTime() - before.getTime();
        const days = time / (1000 * 3600 * 24);
        return Math.round(days);
    }

    return (
        <>
            {snippet ? (
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
                        <div className="">Publish Snippet</div>
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
                        <div className="">
                            <input
                                type="number"
                                name="expires"
                                id="expires"
                                placeholder="Expires after (days)"
                                min={0}
                                max={30}
                                // onChange={handleExpiryChange}
                                className="border w-full"
                                value={diffDate(
                                    snippet?.expires ?? new Date(),
                                    new Date()
                                )}
                                readOnly
                            />
                        </div>
                        <div className="flex gap-4">
                            <input
                                type="checkbox"
                                name="anonymous"
                                id="anonymous"
                                // onChange={handleVisibilityChange}
                            />
                            Publish as Anonymous
                        </div>

                        <Link
                            type="submit"
                            href="/view"
                            // onClick={handleSubmit}
                            className="bg-neutral-300 grid place-items-center px-4 py-2"
                        >
                            Update Snippet
                        </Link>
                        <Link
                            type="submit"
                            href="/view"
                            // onClick={handleSubmit}
                            className="bg-neutral-300 grid place-items-center px-4 py-2"
                        >
                            Delete Snippet
                        </Link>

                        {/* Share information */}

                        <div className="pt-4">Share Snippet</div>
                        <div className="">
                            <input
                                type="text"
                                name="share-url"
                                id="share-url"
                                placeholder={`http://localhost:3001/paste/${params.slug}`}
                                // onChange={handleTitleChange}
                                className="border w-full"
                                value={`http://localhost:3001/paste/${params.slug}`}
                                readOnly
                            />
                        </div>
                        <QRCode
                            value={`http://localhost:3001/paste/${params.slug}`}
                        />
                    </div>
                </div>
            ) : (
                <div className="grid place-items-center">
                    {" "}
                    You don't have any snippets saved right now.
                </div>
            )}
        </>
    );
};

export default ViewPastePage;
