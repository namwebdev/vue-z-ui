import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dotenv from "dotenv";

dotenv.config();

const PORT = parseInt(process.env.VITE_APP_PORT) || 3000;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: PORT,
  },
});
