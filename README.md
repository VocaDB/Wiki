# VocaDB Wiki

This repository hosts the content and the code for the [VocaDB Wiki](https://wiki.vocadb.net).

## Adding content

All of the wiki pages are written in markdown and available at `src/content/docs`.

- Sidebar categories are configured at `src/components/navigationConfig.ts`
- Page redirects are configured at `astro.config.mjs`
- Rule fields are documented at `src/content/config.ts`

## Setup

- `git clone https://github.com/VocaDB/Wiki`
- `cd wiki`
- `npm ci`
- `npm run dev`