import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config();

const PORT = parseInt(process.env.VITE_APP_PORT) || 3000;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: PORT,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      // Add more aliases as needed
    },
  },
});
