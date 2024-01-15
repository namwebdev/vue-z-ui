import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
        fuchsia: colors.fuchsia,
        lime: colors.lime,
        orange: colors.orange,
        "light-blue": colors.lightBlue,
        "litepie-primary": colors.emerald,
        "litepie-secondary": colors.coolGray,
      },
    },
  },
  plugins: [],
};
