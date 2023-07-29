"use client";

import QRCode from "react-qr-code";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { SnippetContext } from "../../layout";
import Snippet from "@/typings/types";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

const ViewPastePage = ({ params }: { params: { slug: string } }) => {
    const { snippets } = useContext(SnippetContext);
    const [snippet, setSnippet] = useState<Snippet | null>(null);

    const { getToken } = useAuth();

    useEffect(() => {
        const data = snippets.find(
            (snip: Snippet) => snip.pasteId === params.slug
        );
        setSnippet(data);
    }, []);

    function diffDate(after: number, before: number): number {
        const time = after - before;
        const days = time / (1000 * 3600 * 24);
        return Math.round(days);
    }

    async function savePasteToDb(newSnippet: Snippet) {
        const response = await axios.put(
            "http://localhost:5002/v1/api/paste",
            newSnippet,
            {
                headers: {
                    Authorization: `Bearer ${await getToken()}`,
                },
            }
        );
        const data = await response.data;
        return await data?.success;
    }

    function handleSubmit() {
        console.log(snippet);
        if (snippet) {
            try {
                savePasteToDb(snippet).then((data) => {
                    console.log("success", data);
                });
            } catch (error) {
                console.log(error);
            }
        }

        async function printToken() {
            const token = await getToken();
            console.log("Update : 🦄 : " + token);
        }

        printToken();
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
                        onChange={(e) => {
                            setSnippet((prevState) => {
                                return {
                                    ...prevState,
                                    data: e.target.value,
                                } as Snippet;
                            });
                        }}
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
                                    snippet?.expiresOn ?? Date.now(),
                                    Date.now()
                                )}
                                readOnly
                            />
                        </div>
                        <div className="flex gap-4">
                            <input
                                type="checkbox"
                                name="anonymous"
                                id="anonymous"
                                checked={snippet?.isAnonymous}
                                // onChange={handleVisibilityChange}
                            />
                            Publish as Anonymous
                        </div>

                        <Link
                            type="submit"
                            href="/view"
                            onClick={handleSubmit}
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
