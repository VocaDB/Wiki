# VocaDB Wiki

This repository hosts the content and the code for the [VocaDB Wiki](https://wiki.vocadb.net).

## Adding content

All of the wiki pages are written in markdown and available at `src/content/docs`.

- Sidebar categories are configured at `src/components/navigationConfig.ts`
- Rule fields are documented at `src/content/config.ts`
- Page redirects are configured at `astro.config.mjs`

## Renaming files

For `/src/content/docs` & `/src/content/rules`

1. Rename file
2. Rename `title: {rulename}` inside the frontmatter (must match the file name except for dashes (-) and case)
3. Create a new (or replace the old) redirect for the URL in `astro.config.mjs`
4. Extra: Rename old links in all the wiki files
5. Extra: Rename old links on relevant VocaDB (tag) entries
6. If renaming rules, rename the corresponding MikuMod rule module as well.

## Setup

- `git clone https://github.com/VocaDB/Wiki`
- `cd wiki`
- `npm ci`
- `npm run dev`
