import { type CollectionEntry, defineCollection, z } from "astro:content";

export const EntryType = ["Songs", "Albums", "Artists", "Events", "Tags", "Songlists"] as const

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
    entry_type: z
      .union([
        z.literal("All"),
        z.array(
          z.enum(EntryType)
        )
      ])
      .default("All"),
    entry_status: z
      .enum(["Draft", "Finished", "Approved", "Locked"])
      .default("Draft"),
    fe_validations: z.string().nullable().optional(),
    be_validations: z.boolean().nullable().optional(),
    occurance: z.number().nullable().optional(),
    detection_script: z.string().nullable().optional(),
    edit_list: z.string().nullable().optional(),
    date_checked: z.date().nullable().optional(),
    date_created: z.date().nullable().optional(),
    date_modified: z.date().nullable().optional(),
    rationale: z.string().nullable().optional(),
    rule_context: z.enum(["Names", "Content policy", "Description", "External links", "Romanization"]).nullable().optional(),
    status: z.enum(["Active", "Deprecated"]).default("Active")
  })
});

export type RuleFields = keyof CollectionEntry<"rules">["data"];

export const collections = {
  docs: docsCollection,
  rules: ruleCollection
};