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
    // Đảm bảo chỉ có 1 instance React duy nhất trong toàn bộ bundle
    dedupe: ["react", "react-dom"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            // React phải được check TRƯỚC MUI vì MUI phụ thuộc React
            if (id.includes("react") || id.includes("react-dom") || id.includes("scheduler")) {
              return "vendor-react";
            }
            if (id.includes("@mui") || id.includes("@emotion")) {
              return "vendor-mui";
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