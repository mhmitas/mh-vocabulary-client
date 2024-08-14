/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "primary": "#f43f5e",
          "primary-focus": "#8462f4",
          "primary-content": "#ffffff",
          "secondary": "#fff",
          "secondary-focus": "#fff",
          "secondary-content": "#000",
          "accent": "#37cdbe",
          "accent-focus": "#2daaa3",
          "accent-content": "#ffffff",
          "neutral": "#1e293b",
          "neutral-focus": "#111c39",
          "neutral-content": "#ffffff",
          "info": "#2094f3",
          "info-focus": "#1e87f0",
          "info-content": "#ffffff",
          "success": "#009485",
          "success-focus": "#007965",
          "success-content": "#ffffff",
          "error": "#ff0000",
          "error-focus": "#ff0000",
          "error-content": "#ffffff",
          "warning": "#ff9900",
          "warning-focus": "#e67e00",
          "warning-content": "#ffffff",
          "base-100": "#0f172a",
          "base-200": "#1e293b",
          // "base-300": "#ebebeb",
          "base-content": "#ffffff",
        },
      }
    ]
  },
  plugins: [require("daisyui")],
}


// previous primary color #e11d48
