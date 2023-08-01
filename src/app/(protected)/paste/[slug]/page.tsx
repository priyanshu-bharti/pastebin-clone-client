"use client";

import QRCode from "react-qr-code";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Snippet from "@/typings/types";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import TextArea from "@/components/inputs/TextArea";

const ViewPastePage = ({ params }: { params: { slug: string } }) => {
    const [snippet, setSnippet] = useState<Snippet | null>(null);
    const { getToken } = useAuth();

    useEffect(() => {
        async function getSnippetById() {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/v1/api/paste/public/${params.slug}`,
                {
                    headers: {
                        Authorization: `Bearer ${await getToken()}}`,
                    },
                }
            );

            const snippetDOA: Snippet = {
                title: response.data.success._doc.title,
                data: response.data.success._doc.data,
                expiresOn: response.data.success._doc.expiresOn,
                isAnonymous: response.data.success._doc.isAnonymous,
                pasteId: response.data.success._doc.pasteId,
                userName: response.data.success.userName,
            };
            return snippetDOA;
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

    async function savePasteToDb(newSnippet: Snippet) {
        const { userName, ...snippetWithoutUserName } = newSnippet;
        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/v1/api/paste`,
            snippetWithoutUserName,
            {
                headers: {
                    Authorization: `Bearer ${await getToken()}`,
                },
            }
        );
        const data = await response.data;
        return await data?.success;
    }

    async function deletePasteFromDb(pasteId: string) {
        const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/v1/api/paste/${pasteId}`,
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
        if (snippet) {
            try {
                savePasteToDb(snippet).then((data) => {
                    console.log("success", data);
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

    function handleDelete() {
        const deleteDecision = confirm(
            "Are you sure you want to delete this paste?"
        );

        if (deleteDecision && snippet) {
            try {
                deletePasteFromDb(snippet.pasteId).then((data) => {
                    alert(`Paste Deleted Successfully`);
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

    function handleDataChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setSnippet((prevState) => {
            return {
                ...prevState,
                data: e.target.value,
            } as Snippet;
        });
    }

    return (
        <>
            {snippet ? (
                <div className="md:grid md:grid-cols-3 flex flex-col-reverse gap-4">
                    <TextArea
                        handleDataChange={handleDataChange}
                        data={snippet?.data}
                    />
                    <div className="flex flex-col gap-4">
                        <h2 className="text-lg font-bold">Update Snippet</h2>
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
                                    onChange={(e) => {
                                        setSnippet((prevState) => {
                                            return {
                                                ...prevState,
                                                title: e.target.value,
                                            } as Snippet;
                                        });
                                    }}
                                    className="input input-bordered w-full"
                                    value={snippet?.title}
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
                                    defaultValue={diffDate(
                                        snippet?.expiresOn ?? Date.now(),
                                        Date.now()
                                    )}
                                    onChange={(e) => {
                                        setSnippet((prevState) => {
                                            return {
                                                ...prevState,
                                                expiresOn:
                                                    parseInt(e.target.value) *
                                                    86400000,
                                            } as Snippet;
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex gap-4 py-2 items-center">
                            <input
                                type="checkbox"
                                name="anonymous"
                                id="anonymous"
                                className="checkbox checkbox-sm checkbox-primary"
                                checked={snippet?.isAnonymous}
                                onChange={(e) => {
                                    setSnippet((prevState) => {
                                        return {
                                            ...prevState,
                                            isAnonymous: e.target.checked,
                                        } as Snippet;
                                    });
                                }}
                            />
                            Publish as Anonymous
                        </div>

                        <Link
                            type="submit"
                            href="/view"
                            onClick={handleSubmit}
                            className="btn btn-primary"
                        >
                            Update Snippet
                        </Link>
                        <Link
                            type="submit"
                            href="/view"
                            onClick={handleDelete}
                            className="btn btn-secondary"
                        >
                            Delete Snippet
                        </Link>

                        {/* Share information */}
                        <h2 className="text-lg font-bold py-2">
                            Share Snippet
                        </h2>
                        <div className="">
                            <input
                                type="text"
                                name="share-url"
                                id="share-url"
                                placeholder={`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/public/${params.slug}`}
                                className="input input-bordered w-full"
                                value={`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/public/${params.slug}`}
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
                    You don't have any snippets saved right now.
                </div>
            )}
        </>
    );
};

export default ViewPastePage;
