import { JetBrains_Mono } from "next/font/google";
import React from "react";

const monoFont = JetBrains_Mono({ subsets: ["latin"] });

const TextArea = ({
    handleDataChange,
    data,
}: {
    handleDataChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    data: string;
}) => {
    return (
        <>
            <div className="form-control flex-1 col-span-2">
                <label className="label">
                    <span className="label-text text-lg font-bold">Paste Your Code Here:</span>
                </label>
                <textarea
                    name="snippet"
                    id="snippet"
                    cols={30}
                    rows={10}
                    onChange={handleDataChange}
                    placeholder="Enter Snippet Here..."
                    value={data}
                    className={`textarea textarea-bordered h-full w-full ${monoFont.className}`}
                ></textarea>
            </div>
        </>
    );
};

export default TextArea;
