import { defineConfig } from "vite";
import { contentPlugin } from "./scripts/vite-content-plugin.mjs";

export default defineConfig({
  root: "./",
  base: "/",
  publicDir: "public",
  plugins: [contentPlugin()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    minify: "esbuild",
    target: "es2020",
    sourcemap: false,
  },
  server: {
    port: 3000,
    open: false,
  },
});
