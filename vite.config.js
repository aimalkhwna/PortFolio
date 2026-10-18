
import { defineConfig } from "vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const projectRoot = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    {
      name: "aimvex-homepage",
      configureServer(server) {
        server.middlewares.use((request, response, next) => {
          if (request.url === "/" || request.url?.startsWith("/?")) {
            request.url = "/AIMVEX_website.html";
          }
          next();
        });
      },
    },
  ],
  appType: "spa",
  build: {
    rollupOptions: {
      input: resolve(projectRoot, "AIMVEX_website.html"),
    },
  },
});
