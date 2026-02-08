import { getCollection } from "astro:content";

export async function getDocPaths() {
  const blogEntries = await getCollection("docs");
  return blogEntries.map((entry) => ({
    params: { slug: entry.slug },
    props: {
      entry: {
        slug: entry.slug,
        title: entry.data.title,
        parent: entry.data.parent
      },
    },
  }));
}
