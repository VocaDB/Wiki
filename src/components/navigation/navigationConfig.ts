import { groupBy } from "@/lib/utils";
import { getCollection } from "astro:content";

export const navbarParents = [
  {
    title: "Guidelines",
    subcategories: [
      "Pinned",
      "Songs",
      "Albums",
      "Artists",
      "Secondary-entry-types",
      "Other-guidelines",
    ],
  },
  { title: "Documentation" },
  { title: "Development" },
  { title: "Other" },
  { title: "UtaiteDB" },
  { title: "TouhouDB" },
  { title: "Japanese" },
  { title: "Chinese" },
];

export const headerNavItems = [
  { name: "VocaDB", href: "//vocadb.net" },
  { name: "Blog", href: "//blog.vocadb.net" },
  { name: "Patreon", href: "//patreon.com/vocadb" },
  { name: "GitHub", href: "//github.com/VocaDB/Wiki" },
];

const docsCollection = await getCollection("docs");

export const pages = docsCollection.map((entry) => ({
  slug: entry.slug,
  title: entry.data.title,
  parent: entry.data.parent,
}));

export const getParent = (p: (typeof pages)[number]) => p.parent;

export const groupedNavbarParents = groupBy(
  pages.filter((p) => getParent(p) !== undefined),
  (pages) => getParent(pages)!,
);
