"use client";

import Snippet from "@/typings/types";
import React, { useContext, useState } from "react";
import { SnippetContext } from "../layout";
import Link from "next/link";
import { nanoid } from "nanoid";

const CreatePage = () => {
    const { snippets, setSnippets } = useContext(SnippetContext);

    const [title, setTitle] = useState("");
    const [data, setData] = useState("");
    const [visible, setVisible] = useState(false);
    const [expiry, setExpiry] = useState(new Date());

    function addDaysToDate(days = 1) {
        const date = new Date();
        days = days > 30 ? 30 : days;
        date.setDate(date.getDate() + days);
        return date;
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

    function handleSubmit() {
        const newSnippet = {
            id: nanoid(8),
            title: title,
            anonymous: visible,
            data: data,
            expires: expiry,
        } as Snippet;

        setSnippets((prevState: Snippet[]) => [...prevState, newSnippet]);
    }

    return (
        <div className="md:grid md:grid-cols-3 flex flex-col-reverse gap-4">
            <textarea
                name="snippet"
                id="snippet"
                cols={30}
                rows={10}
                onChange={handleDataChange}
                placeholder="Enter Snippet Here..."
                className="border flex-1 col-span-2"
            ></textarea>
            <div className="flex flex-col gap-4">
                <div className="">Publish Snippet</div>
                <div className="">
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Enter Title"
                        onChange={handleTitleChange}
                        className="border w-full"
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
                        onChange={handleExpiryChange}
                        className="border w-full"
                    />
                </div>
                <div className="flex gap-4">
                    <input
                        type="checkbox"
                        name="anonymous"
                        id="anonymous"
                        onChange={handleVisibilityChange}
                    />
                    Publish as Anonymous
                </div>

                <Link
                    type="submit"
                    href="/view"
                    onClick={handleSubmit}
                    className="bg-neutral-300 grid place-items-center px-4 py-2"
                >
                    Publish Snippet
                </Link>
            </div>
        </div>
    );
};

export default CreatePage;
