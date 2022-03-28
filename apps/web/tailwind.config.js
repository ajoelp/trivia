module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,tsx}"],
  theme: {
    extend: {
      borderColor: ({ theme }) => ({
        DEFAULT: theme("colors.zinc.600"),
      }),
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
