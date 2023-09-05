import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

export default ({ mode }) => {
  // process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  // const port = parseInt(process.env.PORT);
  const port = 8500;
  return defineConfig({
    plugins: [react()],
    server: {
      port: 3000,
      host: true,

      root: "src",
      // publicDir: "../uploads",
      // origin: "http://localhost:3000",
      proxy: {
        "/api": {
          target: `http://127.0.0.1:${port}/`,
          changeOrigin: true,
        },
      },
    },
  });
};
