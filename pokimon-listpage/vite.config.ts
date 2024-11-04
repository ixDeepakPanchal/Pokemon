import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5001,
    cors: true,
  },
  plugins: [
    react(),
    federation({
      name: "remoteApp",
      filename: "remoteEntry.js",
      exposes: { "/PokemonList": "./src/components/PokemonList.tsx" },
      shared: ["react", "react-dom", "tailwindcss"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
