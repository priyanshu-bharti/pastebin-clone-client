"use client";

import QRCode from "react-qr-code";
import React, { useEffect, useState } from "react";
import Snippet from "@/typings/types";
import axios from "axios";
import TextArea from "@/components/inputs/TextArea";
import { RiEmotionSadLine } from "react-icons/ri";

const ViewPublicPastePage = ({ params }: { params: { slug: string } }) => {
    const [snippet, setSnippet] = useState<Snippet | null>(null);

    useEffect(() => {
        async function getSnippetById() {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/v1/api/paste/public/${params.slug}`
            );

            if (response.data.success._doc) {
                const snippetDOA: Snippet = {
                    title: response.data.success._doc.title,
                    data: response.data.success._doc.data,
                    expiresOn: response.data.success._doc.expiresOn,
                    isAnonymous: response.data.success._doc.isAnonymous,
                    pasteId: response.data.success._doc.pasteId,
                    userName: response.data.success.userName,
                };

                console.log(response.data.success);
                return snippetDOA;
            }

            return null;
        }

        getSnippetById().then((data) => {
            setSnippet(data);
        });
    }, []);

    function diffDate(after: number, before: number): number {
        const time = after - before;
        const days = time / (1000 * 3600 * 24);
        return Math.round(days);
    }

    return (
        <>
            {snippet ? (
                <div className="md:grid md:grid-cols-3 flex flex-col-reverse gap-4">
                    <TextArea
                        handleDataChange={(e: any) => {}}
                        data={snippet.data}
                    />
                    <div className="flex flex-col gap-4">
                        <h2 className="text-lg font-bold">
                            Snippet Information
                        </h2>
                        <div className="">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        Snippet Title:
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Enter Title"
                                    className="input input-bordered w-full"
                                    value={snippet?.title}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        Created By:
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder={
                                        snippet.isAnonymous
                                            ? "Anonymous"
                                            : snippet?.userName
                                    }
                                    className="input input-bordered w-full"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        Expires after (days):
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    name="expires"
                                    id="expires"
                                    placeholder="Expires after (days)"
                                    min={0}
                                    max={30}
                                    className="input input-bordered w-full"
                                    readOnly
                                    value={diffDate(
                                        snippet?.expiresOn ?? Date.now(),
                                        Date.now()
                                    )}
                                />
                            </div>
                        </div>

                        {/* Share information */}
                        <h2 className="pt-4 text-lg font-bold">
                            Share Snippet
                        </h2>
                        <div className="">
                            <input
                                type="text"
                                name="share-url"
                                id="share-url"
                                placeholder={`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}public/${params.slug}`}
                                className="input input-bordered w-full"
                                value={`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}public/${params.slug}`}
                                readOnly
                            />
                        </div>
                        <div className="flex items-center justify-center pb-4">
                            <QRCode
                                bgColor="#191724"
                                fgColor="#ffffff"
                                value={`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/public/${params.slug}`}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid place-items-center">
                    <div className="flex flex-col items-center justify-center text-secondary gap-4">
                        <RiEmotionSadLine className="text-9xl" />
                        <span className="text-xl font-bold">
                            This snippet doesn't exist!
                        </span>
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewPublicPastePage;
