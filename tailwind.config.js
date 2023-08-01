/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
module.exports = {
    daisyui: {
        themes: [
            {
                dark: {
                    primary: "#eb6f92",
                    secondary: "#f6c177",
                    accent: "#c4a7e7",
                    neutral: "#21202e",
                    "base-100": "#191724",
                    info: "#31748f",
                    success: "#9ccfd8",
                    warning: "#f6c177",
                    error: "#eb6f92",
                    "--btn-text-case": "titlecase",
                },
            },
        ],
    },
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {},
        },
    },
    plugins: [daisyui],
};
