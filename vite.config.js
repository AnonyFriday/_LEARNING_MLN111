import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
    host: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "src/scss/abstracts" as *;`,
      },
    },
  },
});
