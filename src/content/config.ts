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
    id: z.number(), // rule id
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
    fe_validations: z.string().nullable().optional(), // frontend
    be_validations: z.boolean().nullable().optional(), // backend
    occurance: z.number().nullable().optional(), // amount of edit mistakes, based on edit list
    detection_script: z.string().nullable().optional(), // xyz.py, see mods repo
    edit_list: z.string().nullable().optional(), // sheet link
    date_checked: z.date().nullable().optional(), // date sheet last generated
    date_created: z.date().nullable().optional(), // rule creation date
    date_modified: z.date().nullable().optional(), // date of rule modification (excluding wording changes)
    rationale: z.string().nullable().optional(), // Short explanation why the rule is necessary
    rule_context: z.enum(["Names", "Content policy", "External links", "Romanization"]).nullable().optional(), // Context which is not limited to just one entry type
    status: z.enum(["Active", "Deprecated"]).default("Active"),
    relevant_tag_id: z.number().nullable().optional(),
    validation_strategy: z.number().default(0),
    automatically_fixed: z.enum(["True", "False", "Partially"]).nullable().optional(),
    complete_validation: z.boolean().nullable().optional(),
    
    /*
    Validation strategy
    0) Not realistic
    1) Based on direct API calls --> Edit list or automatically fixed
    2) Based on recent edits (simple version-based) --> Entry report or automatically fixed
    3) Based on recent edits (version-based, multiple entries/tags) --> Entry report or automatically fixed
    4) Based on recent edits (diff-based) --> Entry report or automatically fixed
    5) Based on datadump
    6) Backend validation exists
    */
  })
});

export type RuleFields = keyof CollectionEntry<"rules">["data"];

export const collections = {
  docs: docsCollection,
  rules: ruleCollection
};