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
  integrations: [react(), tailwind(), sitemap(), mdx(), pagefind()],
});
