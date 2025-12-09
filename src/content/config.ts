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
    excerpt: z.string().nullable().optional(), // short excerpt/description for the embed and social tags (e.g. Google, Discord)
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
    mikumod_support: z.enum(["True", "False", "Planned"]).nullable().optional(),
    automatically_fixed: z.enum(["True", "False", "Partially"]).nullable().optional(),
    complete_validation: z.enum(["True", "False"]).nullable().optional(),
  })
});

export const ruleDataKeyDictionary: Record<string, string> = {
  id: "ID",
  date_created: "Date created",
  date_modified: "Date modified",
  name: "Name",
  entry_type: "Entry type",
  entry_status: "Entry status",
  rule_context: "Rule context",
  relevant_tag_id: "Relevant tag",
  mikumod_support: "MikuMod support",
  occurance: "Occurrence",
  date_checked: "Date checked",
  edit_list: "Edit list",
  status: "Status",
  fe_validations: "Frontend validations",
  be_validations: "Backend validations",
  rationale: "Rationale",
  automatically_fixed: "Automatically fixed",
  complete_validation: "Complete",
  excerpt: "Excerpt",
  detection_script: "Detection script",
  _date: "Date"
}

export const ruleDataKeyDetailsDictionary: Record<string, string> = {
  id: "Rule ID",
  name: "Rule name",
  entry_status: "Relevant entry status",
  occurance: "Number of invalid entries",
  date_checked: "Date last checked",
  edit_list: "Relevant edit list of invalid entries",
  automatically_fixed: "Rule violations get automatically fixed",
  complete_validation: "Rule check is complete/exhaustive",
  detection_script: "Detection script",
  _date: "Date modified or created",
}

export type RuleFields = keyof CollectionEntry<"rules">["data"];

export const collections = {
  docs: docsCollection,
  rules: ruleCollection
};