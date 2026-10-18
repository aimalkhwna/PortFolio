import { defineConfig } from "vite";
import { rename } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [{
    name: "aimvex-homepage",
    configureServer(server) {
      server.middlewares.use((request, _response, next) => {
        if (request.url === "/" || (request.url && request.url.startsWith("/?"))) {
          request.url = "/AIMVEX_website.html";
        }
        next();
      });
    },
    async writeBundle(options) {
      const outputDir = resolve(options.dir || resolve(projectRoot, "dist"));
      await rename(
        resolve(outputDir, "AIMVEX_website.html"),
        resolve(outputDir, "index.html"),
      );
    },
  }],
  build: {
    rollupOptions: {
      input: {
        index: resolve(projectRoot, "AIMVEX_website.html"),
      },
    },
  },
});
