const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust paths for your project structure
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".customdisplay": {
          display: "flex",
        },
      };
      addUtilities(newUtilities, { variants: ["responsive"] }); // Enables responsive classes like md:customdisplay
    }),
  ],
};
