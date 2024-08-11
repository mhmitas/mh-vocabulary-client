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
          "base-content": "#efecec"
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

/* 
// light
"primary": "#1f6feb", // 3b82f6
"secondary": "#a3e635",
"accent": "#f43f5e",
"info": "#38bdf8",
"success": "#22c55e",
"warning": "#fbbf24",
"neutral": "#2a323c",
"neutral-content": "#ffffff",
"error": "#ef4444",
"base-100": "#f0f2f5",
"base-200": "#ffffff",
"base-300": "#f0f2f5",
'base-content': 'black',
*/