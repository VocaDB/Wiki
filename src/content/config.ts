import { defineCollection, z } from "astro:content";

const docsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    parent: z.string().nullable().optional(),
    tags: z.array(z.string()).default([])
  })
});

const ruleCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    id: z.number(),
    description: z.string(),
    entry_type: z.union([
      z.literal("All"),
      z.array(z.enum(["Songs", "Albums", "Artists", "Events", "Tags", "Songlists"]))
    ]).default("All"),
    entry_status: z.enum(["Draft", "Finished", "Approved", "Locked"]).default("Draft"),
    fe_validations: z.string().nullable().optional(),
    be_validations: z.boolean().nullable().optional(),
    occurance: z.number().nullable().optional(),
    detection_script: z.string().nullable().optional(),
    edit_list: z.string().nullable().optional(),
    date_checked: z.string().nullable().optional(),
    date_created: z.string().nullable().optional(),
    date_modified: z.string().nullable().optional(),
    parent_rule: z.string().nullable().optional(),
    rationale: z.string().nullable().optional(),
    status: z.enum(["Active", "Deprecated"]).default("Active"),
  })
});

export const collections = {
  docs: docsCollection,
  rules: ruleCollection
};
