/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/{*.jsx,js}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        "open-sans-semibold": "open-sans-semibold",
        "open-sans-bold": "open-sans-bold",
        "open-sans-regular": "open-sans-regular",
      },
    },
  },
  plugins: [],
};
