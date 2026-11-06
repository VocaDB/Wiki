import { slug } from "github-slugger";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { MdastPluginDefinition } from "satteri";
import { EntryTypeList } from "../utils/entryTypes";

/*
 Resolves [[wikilinks]] to site URLs:
 
 [[Song entry editing]]                  -> /docs/song-entry-editing
 [[song entry editing]]                  -> /docs/song-entry-editing
 [[Song entry editing|label]]            -> /docs/song-entry-editing
 [[Song entry editing#tab-1-basic-info]] -> /docs/song-entry-editing#tab-1-basic-info
 [[rules/faint-vocals]]                  -> /rules/faint-vocals
 [[#heading]]                            -> #heading on the same page
 
 Unknown targets fail the build.
*/

const CONTENT_DIR = "src/content";

function entrySlugs(collection: string): string[] {
  return fs
    .readdirSync(path.join(CONTENT_DIR, collection))
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => slug(file.replace(/\.mdx?$/, "")));
}

// Built once (restart the dev server after adding or renaming pages).
const targets: Map<string, string> = (() => {
  const map = new Map<string, string>();
  for (const id of entrySlugs("docs")) map.set(id, `/docs/${id}`);
  for (const id of entrySlugs("rules")) map.set(`rules/${id}`, `/rules/${id}`);
  const embedPages = EntryTypeList.map((type) => type.toLowerCase());
  for (const page of [...embedPages, "table"]) {
    map.set(`rules/${page}`, `/rules/${page}`);
  }
  map.set("rules", "/rules");
  return map;
})();

function normalizeTarget(page: string): string {
  return page
    .split("/")
    .map((segment) => slug(segment.trim()))
    .join("/");
}

function normalizeHash(hash: string): string {
  return /[\sA-Z]/.test(hash) ? slug(hash) : hash;
}

function resolveWikilink(target: string): string | undefined {
  const hashIndex = target.indexOf("#");
  const page = hashIndex === -1 ? target : target.slice(0, hashIndex);
  const hash =
    hashIndex === -1 ? "" : "#" + normalizeHash(target.slice(hashIndex + 1));
  if (!page.trim()) return hash || undefined;
  const href = targets.get(normalizeTarget(page));
  return href && href + hash;
}

export function wikilinksToText(markdown: string): string {
  return markdown.replaceAll(
    /(?<!!)\[\[(?<target>[^\]|]*)(?:\|(?<label>[^\]]*))?\]\]/g,
    (...args) => {
      const { target, label } = args.at(-1) as {
        target: string;
        label?: string;
      };
      return label ?? target;
    },
  );
}

export function wikilinks(): (ctx: { fileURL?: URL }) => MdastPluginDefinition {
  return ({ fileURL }) => {
    return {
      name: "wikilinks",
      options: { position: true },
      link(node, ctx) {
        const start = node.position?.start.offset;
        const end = node.position?.end.offset;
        if (
          start === undefined ||
          end === undefined ||
          !ctx.source.startsWith("[[", start)
        ) {
          return;
        }

        const target = node.url.replace(/\\$/, "");
        const href = resolveWikilink(target);
        if (!href) {
          const file = fileURL
            ? path.relative(process.cwd(), fileURLToPath(fileURL))
            : "markdown";
          throw new Error(`Unknown wikilink target "[[${target}]]" in ${file}`);
        }
        ctx.setProperty(node, "url", href);

        const inner = ctx.source.slice(start + 2, end - 2);
        const [label] = node.children;
        if (
          !/(?<!\\)\|/.test(inner) &&
          label?.type === "text" &&
          label.value.includes("'")
        ) {
          ctx.setProperty(
            label,
            "value",
            label.value.replaceAll(/(?<=\w)'(?=\w)/g, "’"),
          );
        }
      },
    };
  };
}
