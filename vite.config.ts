import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Base is set for GitHub Pages fallback deploys via VITE_BASE; Vercel uses "/".
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || "/",
});
