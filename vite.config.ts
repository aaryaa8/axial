import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// Two static pages, no client router: "/" is the company site and "/read/" is
// the reading tutor. Both build to plain HTML, which keeps GitHub Pages simple.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || "/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        read: resolve(__dirname, "read/index.html"),
      },
    },
  },
});
