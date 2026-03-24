import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/e-a-s-garden-catalog/",

  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // GitHub Pages has no server rewrite; copy index.html so deep links load the SPA.
    {
      name: "github-pages-spa-fallback",
      closeBundle() {
        const index = path.resolve(__dirname, "dist/index.html");
        const fallback = path.resolve(__dirname, "dist/404.html");
        if (fs.existsSync(index)) {
          fs.copyFileSync(index, fallback);
        }
      },
    },
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));