import { groupBy } from "@/lib/utils";
import { getDocPaths } from "@/utils/get_paths";

export const navbarParents = [
  {
    title: "Guidelines",
    slug: "guidelines",
    subcategories: [
      "Pinned",
      "Songs",
      "Albums",
      "Artists",
      "Secondary entry types",
      "Other guidelines",
    ],
  },
  {
    title: "Documentation",
    slug: "documentation",
  },
  {
    title: "Development",
    slug: "development",
  },
  {
    title: "Other",
    slug: "other",
  },
  {
    title: "UtaiteDB",
    slug: "utaitedb",
  },
  {
    title: "TouhouDB",
    slug: "touhoudb",
  },
  {
    title: "Japanese",
    slug: "japanese",
  },
  {
    title: "Chinese",
    slug: "chinese",
  },
];

export const headerNavItems = [
  { name: "VocaDB", href: "//vocadb.net" },
  { name: "GitHub", href: "//github.com/VocaDB/Wiki" },
];

export const posts = await getDocPaths();

export const getParent = (p: { params?: { slug: string }; props: any }) =>
  p.props.entry.data.parent;

export const groupedNavbarParents = groupBy(
  posts.filter((p) => getParent(p) !== undefined),
  (post) => getParent(post)!
);
