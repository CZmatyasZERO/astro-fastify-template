import { defineConfig } from 'astro/config';
import node from "@astrojs/node";

export default defineConfig({
  output: "hybrid",
  adapter: node({
    mode: "middleware"
  }),
  build: {
    assetsInlineLimit: 1024,
  }
});