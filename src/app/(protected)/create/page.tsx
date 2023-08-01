"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import Snippet from "@/typings/types";
import React, { useContext, useState } from "react";
import { SnippetContext } from "../layout";
import { nanoid } from "nanoid";
import axios from "axios";
import TextArea from "@/components/inputs/TextArea";
import { useRouter } from "next/navigation";

const CreatePage = () => {
    const [data, setData] = useState("");
    const [expiry, setExpiry] = useState(Date.now());
    const [title, setTitle] = useState("");
    const [visible, setVisible] = useState(false);
    const { snippets, setSnippets } = useContext(SnippetContext);
    const { user } = useUser();
    const { getToken } = useAuth();
    const { push } = useRouter();

    function addDaysToDate(days = 1) {
        const date = new Date();
        days = days > 30 ? 30 : days;
        date.setDate(date.getDate() + days);
        return date.getTime();
    }

    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value);
    }

    function handleDataChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setData(e.target.value);
    }

    function handleVisibilityChange(e: React.ChangeEvent<HTMLInputElement>) {
        setVisible(e.target.checked);
    }

    function handleExpiryChange(e: React.ChangeEvent<HTMLInputElement>) {
        let days: number = e.target.valueAsNumber;
        if (0 > days) {
            days = 1;
        } else if (days > 30) {
            days = 30;
        }
        setExpiry(addDaysToDate(days));
    }

    async function savePasteToDb(newSnippet: Snippet) {
        const token = await getToken();
        if (user) {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/v1/api/paste/${user.id}`,
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
    }

    function handleSubmit() {
        const newSnippet = {
            pasteId: nanoid(8),
            title: title,
            isAnonymous: visible,
            data: data,
            expiresOn: expiry,
        } as Snippet;

        savePasteToDb(newSnippet).then((data) => {
            setSnippets((prevState: Snippet[]) => [
                ...prevState,
                {
                    title: data.title,
                    data: data.data,
                    expiresOn: data.expiresOn,
                    isAnonymous: data.isAnonymous,
                    pasteId: data.pasteId,
                } as Snippet,
            ]);
        });
        alert("Paste created successfully");
        push("/view");
    }

    return (
        <div className="md:grid md:grid-cols-3 flex flex-col-reverse gap-4">
            <TextArea handleDataChange={handleDataChange} data={data} />
            <div className="flex flex-col gap-4">
                <h2 className="text-lg font-bold">Publish Snippet</h2>
                <div className="">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">
                                Enter Snippet Title:
                            </span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Enter Title"
                            onChange={handleTitleChange}
                            required
                            className="input input-bordered w-full"
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
                            onChange={handleExpiryChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                </div>
                <div className="flex gap-4 py-4 items-center">
                    <input
                        type="checkbox"
                        name="anonymous"
                        id="anonymous"
                        onChange={handleVisibilityChange}
                        className="checkbox checkbox-primary checkbox-sm"
                    />
                    <label htmlFor="anonymous" className="cursor-pointer">
                        Publish as Anonymous
                    </label>
                </div>
                <button onClick={handleSubmit} className="btn btn-primary">
                    Publish Snippet
                </button>
            </div>
        </div>
    );
};

export default CreatePage;
