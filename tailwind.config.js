/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: (theme) => ({
        ...theme("colors"),
        primary: "#F9F9F9",
        secondary: "#ffed4a",
        danger: "#e3342f",
      }),
    },
  },
  plugins: [],
};
