import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@views": path.resolve(__dirname, "src/views"),
      "@api": path.resolve(__dirname, "src/api"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@": path.resolve(__dirname, "src")
    }
  }
});
