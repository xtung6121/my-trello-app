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
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("@mui")) {
              return "vendor-mui";
            }
            if (id.includes("react")) {
              return "vendor-react";
            }
            if (id.includes("lodash")) {
              return "vendor-lodash";
            }
            return "vendor";
          }
        },
      },
    },
  },
});