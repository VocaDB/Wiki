import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://wiki.vocadb.net/",
  build: {
    format: "file",
  },
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
    mdx(),
    pagefind(),
  ],
  redirects: {
    "/wiki/40": "/docs/starting/artist_verification",
    "/wiki/40/artist-verification": "/docs/starting/artist_verification",
    "/wiki/6": "/docs/starting/song-entry-editing",
    // TODO add links with url slugs
    "/wiki/62": "/docs/guidelines/merging-entries",
    "/wiki/62/merging-entries": "/docs/guidelines/merging-entries",
    "/wiki/55": "/docs/starting/albums",
    "/wiki/56": "/docs/starting/artist-entry-page",
    "/wiki/57": "/docs/starting/song-entry-page",
    "/wiki/47": "/docs/starting/song-entry-editing",
    "/wiki/32": "/docs/starting/song-entry-editing",
    "/wiki/21": "/docs/starting/song-entry-editing",
  },
});
