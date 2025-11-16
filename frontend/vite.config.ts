//import { defineConfig } from "vitest/config"; //
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/api": {
        target: "http://backend:3001",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // test: {
  //   globals: true,
  //   environment: "jsdom",
  //   include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  // },
});
