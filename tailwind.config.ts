// import { nextui } from "@nextui-org/react";
import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        desktop: "1440px",
      },
      colors: {
        "purple-gem": "#611DBA",
        "lavender-orchid": "#A060F2",
        "turquoise-foam": "#60F2BE",
        "charcoal-gray": "#161616",
        gunmetal: "#202020",
        "emerald-greend": "#00A130",
        "sunset-orange": "#FF9900",
      },
      margin: { "screen-margin": "56px" },
      padding: {
        "screen-gutter": "24px",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
