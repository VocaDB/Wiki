import { z, defineCollection } from "astro:content";

const docsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    parent: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  docs: docsCollection,
};
