import { getIconCollections, iconsPlugin } from "@egoist/tailwindcss-icons";
import daisyui from "daisyui";
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            screens: {
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
                "2xl": "1536px",
            },
        },
    },
    plugins: [
        daisyui,
        iconsPlugin({
            collections: getIconCollections(["mdi"]),
        }),
    ],
    daisyui: {
        themes: ["emerald", "night"],
    },
};
export default config;
