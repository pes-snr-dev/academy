import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react()],
    server: {
      port: 3000,
      host: true,
      proxy: {
        "/api": {
          target: `http://127.0.0.1:${parseInt(process.env.PORT)}/`,
          changeOrigin: true,
        },
      },
    },
  });
};
