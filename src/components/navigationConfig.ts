import { groupBy } from "@/lib/utils";
import { getDocPaths } from "@/utils/get_paths";

export const navbarParents = [
  { title: "Starting" },
  { title: "Guidelines", subcategories: ["Songs", "Albums", "Artists"] },
  { title: "Documentation" },
  { title: "Other" },
  { title: "UtaiteDB" },
  { title: "TouhouDB" },
  { title: "Japanese" },
  { title: "Chinese" },
];

export const headerNavItems = [
  {
    name: "Guidelines",
    href: "/docs/guidelines",
  },
  {
    name: "Documentation",
    href: "/docs/documentation",
  },
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
