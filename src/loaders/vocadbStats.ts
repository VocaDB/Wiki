import type { Loader } from "astro/loaders";

const STAT_TYPES = ["songs", "artists", "albums"] as const;
export type StatType = (typeof STAT_TYPES)[number];

const API_URL = "https://vocadb.net/api";
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

async function fetchCount(type: StatType): Promise<number> {
  const response = await fetch(
    `${API_URL}/${type}?maxResults=1&getTotalCount=true`,
    {
      headers: { "User-Agent": "VocaDB-Wiki (https://wiki.vocadb.net)" },
    },
  );
  if (!response.ok)
    throw new Error(`${response.status} ${response.statusText}`);
  const { totalCount } = (await response.json()) as { totalCount: number };
  return totalCount;
}

export function vocadbStatsLoader(): Loader {
  return {
    name: "vocadb-stats",
    load: async ({ store, meta, logger, parseData }) => {
      const fetchedAt = Number(meta.get("fetchedAt"));
      if (store.keys().length > 0 && Date.now() - fetchedAt < MAX_AGE_MS) {
        return;
      }

      try {
        const counts = await Promise.all(
          STAT_TYPES.map((type) => fetchCount(type)),
        );
        const date = new Date();
        const entries = await Promise.all(
          STAT_TYPES.map(async (type, index) => ({
            id: type,
            data: await parseData({
              id: type,
              data: { count: counts[index], date },
            }),
          })),
        );
        store.clear();
        for (const entry of entries) store.set(entry);
        meta.set("fetchedAt", String(date.getTime()));
      } catch (error) {
        logger.warn(
          `Could not fetch entry counts from VocaDB: ${String(error)}`,
        );
      }
    },
  };
}
