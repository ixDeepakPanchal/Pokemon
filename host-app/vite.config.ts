import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 3000, cors: true },
  plugins: [
    react(),
    federation({
      name: "hostApp",
      filename: "hostEntry.js",
      exposes: {
        "./Store": "./src/store/store.ts",
        "./SelectModel": "./src/models/SelectModel.tsx",
        "./LoadingPage": "./src/components/LoadingPage.tsx",
      },
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
