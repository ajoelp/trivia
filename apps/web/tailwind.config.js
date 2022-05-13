module.exports = {
  content: ["./*.html", "./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EFEEFC",
          100: "#E0DDF9",
          200: "#C4BEF3",
          300: "#A59CED",
          400: "#8A7EE7",
          500: "#6A5BE1",
          600: "#3C27D8",
          700: "#2C1DA0",
          800: "#1E146C",
          900: "#0E0934",
        },
        secondary: {
          50: "#FFF6F0",
          100: "#FEEDE1",
          200: "#FED7BE",
          300: "#FDC5A0",
          400: "#FDB07D",
          500: "#FC9C5C",
          600: "#FB7319",
          700: "#CD5404",
          800: "#873802",
          900: "#461D01",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
