import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), visualizer()],
  base: './',
  resolve: {
    alias: [{ find: "~", replacement: "/src" }],
    dedupe: ["react", "react-dom"],
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
});