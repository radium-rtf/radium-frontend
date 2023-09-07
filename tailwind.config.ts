import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          secondary: {
            100: "#D8F5D8",
            200: "#D3F3D3",
            300: "#CEF2CE",
            400: "#B9DAB9",
            500: "#ADC4AD",
            600: "#A5C2A5",
            700: "#94AE94",
            800: "#879B88",
            900: "#788B7A",
            1000: "#606F62",
            1100: "#364036",
          },
          destructive: {
            100: "#F5A7A7",
            200: "#DA8282",
            300: "#F29191",
            400: "#DA8282",
            500: "#C48686",
            600: "#C27474",
            700: "#AE6868",
            800: "#8A5B5B",
            900: "#6E4949",
            1000: "#402626",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
