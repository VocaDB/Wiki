import { groupBy } from "@/lib/utils";
import { getDocPaths } from "@/utils/get_paths";

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
  { name: "GitHub", href: "//github.com/VocaDB/Wiki" },
];

export const posts = await getDocPaths();

export const getParent = (p: { params?: { slug: string; }; props: any; }) =>
  p.props.entry.data.parent;

export const groupedNavbarParents = groupBy(
  posts.filter((p) => getParent(p) !== undefined),
  (post) => getParent(post)!
);
