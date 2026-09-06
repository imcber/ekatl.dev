import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

const basePath = "/ektl.dev/";
const defaultLocale = "es";
const defaultLocalePath = `${basePath}${defaultLocale}/`;
const redirectEntryPaths = new Set(["/", basePath.slice(0, -1)]);

function redirectToDefaultLocale() {
  const redirect = (req, res, next) => {
    const pathname = new URL(req.url ?? "/", "http://localhost").pathname;

    if (!redirectEntryPaths.has(pathname)) {
      next();
      return;
    }

    res.statusCode = 302;
    res.setHeader("Location", defaultLocalePath);
    res.end();
  };

  return {
    name: "redirect-to-default-locale",
    configureServer(server) {
      return () => {
        // Run before Astro strips the configured base path from the request.
        server.middlewares.stack.unshift({ route: "", handle: redirect });
      };
    },
  };
}

export default defineConfig({
  i18n: {
    locales: ["es", "en"],
    defaultLocale,
    routing: {
      prefixDefaultLocale: true,
    },
  },

  vite: {
    plugins: [redirectToDefaultLocale(), tailwindcss()],
  },

  base: basePath,
  site: "https://imcber.github.io",
  trailingSlash: "always",
});
