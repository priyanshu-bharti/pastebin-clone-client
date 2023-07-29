"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
    const [pasteUrl, setPasteUrl] = useState<string>("");

    return (
        <main className="grid min-h-screen">
            <Link href="/create">Take me to the app</Link>
            <div className="flex gap-4">
                <input
                    type="text"
                    name=""
                    id=""
                    onChange={(e) => setPasteUrl(e.target.value)}
                    value={pasteUrl}
                    className="border bg-slate-100 flex-1"
                />
                <button>Open Paste with Paste URL</button>
            </div>
        </main>
    );
}
