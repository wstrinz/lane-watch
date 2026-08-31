import { resolve } from "node:path";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [svelte()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    outDir: "public",
    emptyOutDir: false,
    cssCodeSplit: false,
    lib: {
      entry: resolve(import.meta.dirname, "src/ui/main.ts"),
      formats: ["es"],
      fileName: () => "ui.js",
    },
    rollupOptions: {
      output: {
        codeSplitting: false,
        assetFileNames: (asset) => asset.names.some((name) => name.endsWith(".css")) ? "ui.css" : "ui-[name]-[hash][extname]",
      },
    },
  },
});
