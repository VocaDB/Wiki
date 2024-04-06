# VocaDB Wiki

This repository hosts the content and the code for the [VocaDB Wiki](https://wiki.vocadb.net).

## Running the project

First install the necessary dependencies using `npm install` and the run the project using the dev script:

```shell
npm run dev
```

After a short startup period, you should be able to access the project at [https://localhost:4321](https://localhost:4321).

## Adding content

All of the wiki pages are written in markdown and available at `src/content/docs`. Changes to this repo are automatically deployed.

* Sidebar categories are configured at 'src/components/navigationConfig.ts'
* Page redirects are configured at 'astro.config.mjs'